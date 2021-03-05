import json
import base64
import os
import io
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


@APP.route("/upload_file", methods=["POST"])
def upload_file():
    buff = io.BytesIO()
    file = request.files["file"]
    file.save(buff)

    upload_file_list = ["upload_me.pdf"]
    for upload_file in upload_file_list:
        gfile = DRIVE.CreateFile(
            {
                "name": upload_file,
                "title": upload_file,
                "shared": True,
                "mimeType": "text/plain",
            }
        )
        # # Read file and set it as the content of this instance.
        gfile.SetContentString(buff.getvalue().decode("latin-1"), encoding="latin-1")
        gfile.SetContentFile(upload_file)
        gfile.Upload()  # Upload the file.
        _ = gfile.InsertPermission(
            {"type": "anyone", "value": "anyone", "role": "reader"}
        )

    return {
        "statusCode": 200,
        "body": json.dumps(gfile["webContentLink"]),
    }
