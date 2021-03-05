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
    fname = f"{'_'.join([request.form[i] for i in request.form])}.pdf"

    file = request.files["file"]
    file.save(fname)

    gfile = DRIVE.CreateFile(
        {
            "name": fname,
            "title": fname,
            "shared": True,
            "mimeType": "application/pdf",
        }
    )
    gfile.SetContentFile(fname)
    gfile.Upload()
    gfile.InsertPermission({"type": "anyone", "value": "anyone", "role": "reader"})

    return jsonify(gfile["webContentLink"])
