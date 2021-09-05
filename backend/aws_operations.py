from pathlib import Path
import boto3

boto3.setup_default_session(profile_name="maktabti")

s3 = boto3.client("s3")

maktabti_s3_bucket = "maktabti-backups"
maktabti_s3_prefix = "data"


def backup_file_to_s3(input_path, output_name):
    upload_file(input_path, maktabti_s3_bucket, Path(maktabti_s3_prefix) / output_name)


def upload_file(filepath, bucket, key):
    print(f"Uploading {filepath} to {bucket}/{key}")
    with open(filepath, "rb") as f:
        s3.put_object(Body=f, Bucket=bucket, Key=str(key))


def get_s3path(file_name):
    return "s3://{}/{}/{}".format(maktabti_s3_bucket, maktabti_s3_prefix, file_name)


def get_bucket_key_from_s3path(s3path):
    parts = s3path.split("/")
    bucket = parts[2]
    key = "/".join(parts[3:])
    return bucket, key


def create_presigned_url(s3path):
    bucket, key = get_bucket_key_from_s3path(s3path)
    return s3.generate_presigned_url(
        ClientMethod="get_object",
        Params={"Bucket": bucket, "Key": key},
        ExpiresIn=3600,
    )
