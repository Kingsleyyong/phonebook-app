import json
from .utils import get_data_file_path

def get_data():
    with open(get_data_file_path(), 'r') as file:
        return json.load(file)

def write_data(data):
    with open(get_data_file_path(), 'w') as file:
        json.dump(data, file, indent=4)

def get_next_id(data):
    if not data:
        return 1
    return max(item['id'] for item in data) + 1

def find_contact_by_id(data, contact_id):
    return next((item for item in data if item['id'] == contact_id), None)
