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

APP = Flask("maktabti")
CORS(APP)
APP.config["CORS_HEADERS"] = "Content-Type"

GAUTH = GoogleAuth()
DRIVE = GoogleDrive(GAUTH)

UPLOAD_FOLDER = "/root/maktabti-data/"
ALLOWED_EXTENSIONS = set(["pdf"])
GRAPHQL_ENDPOINT = "http://localhost:8080/v1/graphql"


@APP.route("/upload_file", methods=["POST"])
def upload_file():
    data = dict(request.form)
    fname = os.path.join(UPLOAD_FOLDER, f"{'_'.join([data[i] for i in data])}.pdf")

    file = request.files["file"]
    file.save(fname)

    gfile = DRIVE.CreateFile(
        {
            "name": "file.pdf",
            "title": "file.pdf",
            "shared": True,
            "mimeType": "application/pdf",
        }
    )
    gfile.SetContentFile(fname)
    gfile.Upload()
    gfile.InsertPermission({"type": "anyone", "value": "anyone", "role": "reader"})

    link = gfile["webContentLink"]

    data["created_by"] = data["token"]
    data["link"] = link

    query = """
    mutation MyMutation {
        insert_files_one(
            object: {
                    university: %(university)s,
                    college: %(college)s,
                    major: %(major)s,
                    courseByCourse: {data: {major: %(major)s, name: "%(course)s"}},
                    created_by: "%(created_by)s",
                    link: "%(link)s",
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
    if "data" in res.keys():
        return jsonify(link)
    else:
        return res, 400


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
            universityByUniversity {
                name
            }
            collegeByCollege {
                name
            }
            majorByMajor {
                name
            }
            courseByCourse {
                name
            }
            kindByKind {
                name
            }
            link
            created_by
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
    print(res)
    if "data" in res.keys():
        return {
            "file_count": res["data"]["files_aggregate"]["aggregate"]["count"],
            "course_count": res["data"]["courses_aggregate"]["aggregate"]["count"],
        }
    else:
        return res, 400


def execute_graphql_query(query):
    response = requests.post(GRAPHQL_ENDPOINT, data=json.dumps({"query": query}))
    if response.text is None:
        return response.text
    else:
        return json.loads(response.text)
