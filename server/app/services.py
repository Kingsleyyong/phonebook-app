import boto3
import json
import os
from botocore.exceptions import ClientError

s3 = boto3.client(
    's3',
    aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'),
    region_name=os.getenv('AWS_REGION')
)

BUCKET_NAME = os.getenv('S3_BUCKET_NAME')
FILE_NAME = 'data.json'

def get_data():
    try:
        obj = s3.get_object(Bucket=BUCKET_NAME, Key=FILE_NAME)
        return json.loads(obj['Body'].read())
    except ClientError as e:
        if e.response['Error']['Code'] == 'NoSuchKey':
            return []  
        else:
            raise e

def write_data(data):
    try:
        s3.put_object(Bucket=BUCKET_NAME, Key=FILE_NAME, Body=json.dumps(data, indent=4))
    except ClientError as e:
        raise e

def get_next_id(data):
    if not data:
        return 1
    return max(item['id'] for item in data) + 1

def find_contact_by_id(data, contact_id):
    return next((item for item in data if item['id'] == contact_id), None)
