from flask import Blueprint, jsonify, request
from .services import get_data, write_data, get_next_id

main_bp = Blueprint('main', __name__)

@main_bp.route('/contacts', methods=['GET'])
def get_contacts():
    data = get_data()
    return jsonify(data)

@main_bp.route('/contacts', methods=['POST'])
def add_contact():
    data = get_data()
    new_contact = request.json
    new_contact['id'] = get_next_id(data)
    data.append(new_contact)
    write_data(data)
    return jsonify(new_contact), 201
