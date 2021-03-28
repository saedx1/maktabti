from pathlib import Path
import boto3

boto3.setup_default_session(profile_name="maktabti")

s3 = boto3.client("s3")


def backup_file_to_s3(input_path, output_name):
    upload_file(input_path, "maktabti-backups", Path("files") / output_name)


def upload_file(filepath, bucket, key):
    s3.put_object(Body=filepath, Bucket=bucket, Key=str(key))