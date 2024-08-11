import os

def get_data_file_path():
    return os.path.join(os.path.dirname(__file__), '..', 'data.json')
