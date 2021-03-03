from chalice import Chalice
import json
from pydrive.auth import GoogleAuth
from pydrive.drive import GoogleDrive
import base64

app = Chalice(app_name="maktabti")

gauth = GoogleAuth()
drive = GoogleDrive(gauth)


def auth():
    creds = '{"access_token": "ya29.A0AfH6SMDxSsd6eK4SwE_pTAhwMvfaLty-0c5d57HeeUHBOhcyiBHjp40VKcPRy4MRRYuAWWesHFtpR9XiNI_eWOenmpRbgGdheaAQfWcRzgZ_rlUUAyvevjZRQCPw1pg8Fp-29g4z6-k4Ux7oMKXtNBxxDPlY", "client_id": "610154174935-s27f9qj78falqilamo05mh5i8llqfae6.apps.googleusercontent.com", "client_secret": "AvQXvT5K_9FvHynME3W6HeMH", "refresh_token": "1//0dknjs1I_v7faCgYIARAAGA0SNwF-L9Ir61NugRYYTN4zs8vrvN20i59b3jBMsYfD7MhlrOTiuglnxCMpqac9p7t0Dm0nbpddFi8", "token_expiry": "2021-02-28T23:59:35Z", "token_uri": "https://accounts.google.com/o/oauth2/token", "user_agent": null, "revoke_uri": "https://oauth2.googleapis.com/revoke", "id_token": null, "id_token_jwt": null, "token_response": {"access_token": "ya29.A0AfH6SMDxSsd6eK4SwE_pTAhwMvfaLty-0c5d57HeeUHBOhcyiBHjp40VKcPRy4MRRYuAWWesHFtpR9XiNI_eWOenmpRbgGdheaAQfWcRzgZ_rlUUAyvevjZRQCPw1pg8Fp-29g4z6-k4Ux7oMKXtNBxxDPlY", "expires_in": 3599, "scope": "https://www.googleapis.com/auth/drive.file", "token_type": "Bearer"}, "scopes": ["https://www.googleapis.com/auth/drive.file"], "token_info_uri": "https://oauth2.googleapis.com/tokeninfo", "invalid": false, "_class": "OAuth2Credentials", "_module": "oauth2client.client"}'
    with open("/tmp/credentials.json", "w") as f:
        f.write(creds)


auth()


@app.route(
    "/upload_file", methods=["POST"], content_types=["application/pdf"], cors=True
)
def upload_file():
    request = app.current_request
    print(request)
    content = base64.b64decode(request["content"])
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
