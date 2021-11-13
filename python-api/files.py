from pathlib import Path


def get_upload_dir():
    home = Path.home()
    upload_dir = home / "maktabti-data"
    upload_dir.mkdir(exist_ok=True)
    return upload_dir
