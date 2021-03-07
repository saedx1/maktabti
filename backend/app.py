import json
import base64
import os
import io
import requests
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
from flask import Flask, jsonify, request
from flask_cors import CORS

APP = Flask("maktabti")
APP.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
CORS(APP)
APP.config["CORS_HEADERS"] = "Content-Type"

GAUTH = GoogleAuth()
DRIVE = GoogleDrive(GAUTH)

UPLOAD_FOLDER = "/Users/saed.sayedahmed/maktabti"
ALLOWED_EXTENSIONS = set(["pdf"])
GRAPHQL_ENDPOINT = "http://localhost:8080/v1/graphql"

@APP.route("/upload_file", methods=["POST"])
def upload_file():
    fname = f"{'_'.join([request.form[i] for i in request.form])}.pdf"

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
    # query = """
    
    # """

    return jsonify(link)

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
                }
            }
        }
        kinds {
            id
            name
        }
    }
    """

    data = execute_graphql_query(query)["data"]
    return data


def execute_graphql_query(query):
    response = requests.post(GRAPHQL_ENDPOINT, data=json.dumps({"query" : query}))
    if response.text is None:
        return {}
    else:
        return json.loads(response.text)