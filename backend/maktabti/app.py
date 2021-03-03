import json
import base64
import os
from shutil import copyfile
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
from chalice import Chalice

app = Chalice(app_name="maktabti")

os.chdir("chalicelib")
gauth = GoogleAuth()
drive = GoogleDrive(gauth)
copyfile("credentials.json", "/tmp/credentials.json")


@app.route(
    "/upload_file", methods=["POST"], content_types=["application/pdf"], cors=True
)
def upload_file():

    request = app.current_request
    content = request._body
    with open("/tmp/upload_me.pdf", "wb") as f:
        f.write(content)

    upload_file_list = ["/tmp/upload_me.pdf"]
    for upload_file in upload_file_list:
        gfile = drive.CreateFile({"title": upload_file, "shared": True})
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
