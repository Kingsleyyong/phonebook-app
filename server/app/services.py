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
