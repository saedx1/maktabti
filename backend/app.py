import json
import base64
import os
from shutil import copyfile
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
from flask import Flask, jsonify, request
from flask_cors import CORS

APP = Flask("maktabti")
APP.secret_key = b'_5#y2L"F4Q8z\n\xec]/'
CORS(APP)

GAUTH = GoogleAuth()
DRIVE = GoogleDrive(GAUTH)

UPLOAD_FOLDER = "/path/to/the/uploads"
ALLOWED_EXTENSIONS = set(["pdf"])


@APP.route("/upload_file", methods=["POST"])
def upload_file():

    print(request.__dict__)
    content = request.environ["wsgi.input"].read1()
    with open("/tmp/upload_me.pdf", "wb") as f:
        f.write(content)
        print(content)

    upload_file_list = ["/tmp/upload_me.pdf"]
    for upload_file in upload_file_list:
        gfile = DRIVE.CreateFile({"title": upload_file, "shared": True})
        # # Read file and set it as the content of this instance.
        gfile.SetContentFile(upload_file)
        gfile.Upload()  # Upload the file.
        _ = gfile.InsertPermission(
            {"type": "anyone", "value": "anyone", "role": "reader"}
        )

    return {
        "statusCode": 200,
        "body": json.dumps(gfile["webContentLink"]),
    }
