import json
import base64
import os
import time
import io
import requests
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
from flask import Flask, jsonify, request, flash
from werkzeug.utils import secure_filename
from flask_cors import CORS
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address

from .security import verify_token


APP = Flask("maktabti")
CORS(APP)
APP.config["CORS_HEADERS"] = "Content-Type"
limiter = Limiter(APP, key_func=get_remote_address, default_limits=["10000 per minute"])

GAUTH = GoogleAuth()
DRIVE = GoogleDrive(GAUTH)

# UPLOAD_FOLDER = "/root/maktabti-data/"
UPLOAD_FOLDER = "/home/saedx1/projects/maktabti-data/"
ALLOWED_EXTENSIONS = set(["pdf"])
GRAPHQL_ENDPOINT = "http://maktabti.xyz:8080/v1/graphql"


@APP.route("/upload_file", methods=["POST"])
def upload_file():
    data = dict(request.form)

    id_token = data["token"]

    claims = verify_token(id_token)
    if claims is None:
        return "f", 401

    data["created_by"] = claims["sub"]
    data["username"] = claims["name"]

    query = """
    mutation MyMutation {
        insert_files_one(
            object: {
                    university: %(university)s,
                    college: %(college)s,
                    major: %(major)s,
                    courseByCourse: {data: {major: %(major)s, name: "%(course)s"}},
                    created_by: "%(created_by)s",
                    username: "%(username)s",
                    kind: %(kind)s,
                    year: %(year)s
            }
        )
        {
            id
        }
    }
    """ % (
        data
    )

    res = execute_graphql_query(query)

    if "data" not in res.keys():
        return res, 400

    id_ = res["data"]["insert_files_one"]["id"]
    file_name = f"{id_}.pdf"
    full_path = os.path.join(UPLOAD_FOLDER, file_name)
    file = request.files["file"]
    file.save(full_path)

    gfile = DRIVE.CreateFile(
        {
            "name": file_name,
            "title": file_name,
            "shared": True,
            "mimeType": "application/pdf",
        }
    )
    gfile.SetContentFile(full_path)
    gfile.Upload()
    gfile.InsertPermission({"type": "anyone", "value": "anyone", "role": "reader"})

    link = gfile["webContentLink"]

    query = """
    mutation MyMutation {
        update_files_by_pk(pk_columns: {id: %s}, _set: {link: "%s"}) {
            link
        }
    }


    """ % (
        id_,
        link,
    )

    res = execute_graphql_query(query)

    if "data" not in res.keys():
        return res, 400

    return "s", 200


@APP.route("/get_filter_data", methods=["GET"])
def get_filter_data():
    query = """
    query MyQuery {
        universities {
            id
            name
            colleges {
                id
                name
                majors {
                    id
                    name
                    courses {
                        id
                        name
                    }
                }
            }
        }
        kinds {
            id
            name
        }
    }
    """

    res = execute_graphql_query(query)
    if "data" in res.keys():
        return res["data"]
    else:
        return res, 400


@APP.route("/get_search_results/<major>/<kind>", methods=["GET"])
def get_search_results(major, kind):
    query = """
    query MyQuery {
        files(where: {majorByMajor: {id: {_eq: %s}}, kindByKind: {id: {_eq: %s}}}) {
            id
            name
            courseByCourse {
                name
            }
            kindByKind {
                name
            }
            link
            username
        }
    }
    """ % (
        major,
        kind,
    )

    res = execute_graphql_query(query)
    if "data" in res.keys():
        return res["data"]
    else:
        return res, 400


@APP.route("/get_stats", methods=["GET"])
def get_stats():
    query = """
        query MyQuery {
            files_aggregate {
                aggregate {
                count
                }
            }
            courses_aggregate {
                aggregate {
                count
                }
            }
        }
    """

    res = execute_graphql_query(query)

    if "data" in res.keys():
        return {
            "file_count": res["data"]["files_aggregate"]["aggregate"]["count"],
            "course_count": res["data"]["courses_aggregate"]["aggregate"]["count"],
        }, 200
    else:
        return "f", 400


@APP.route("/set_download", methods=["POST"])
def set_download():
    data = dict(request.form)
    file_id = data["file_id"]

    id_token = data["token"]

    if id_token:
        claims = verify_token(id_token)
        if claims is None:
            return "f", 401
        user = claims["sub"]
        name = claims["name"]
    else:
        user = request.remote_addr

    query = """
        mutation MyMutation {
            insert_downloads_one(object: {file: %s, user: "%s"}){
                id
            }
        }
    """ % (
        file_id,
        user,
    )

    res = execute_graphql_query(query)

    if "data" in res.keys():
        return "s", 200
    else:
        return "f", 400


def execute_graphql_query(query):
    response = requests.post(GRAPHQL_ENDPOINT, data=json.dumps({"query": query}))
    if response.text is None:
        return response.text
    else:
        return json.loads(response.text)
