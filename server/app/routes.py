from flask import Blueprint, jsonify, request, make_response
from flask_cors import CORS

from .services import get_data, write_data, get_next_id, find_contact_by_id

main_bp = Blueprint('main', __name__)

# CORS headers to be added to all responses
cors_headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
}

def add_cors_headers(response):
    for key, value in cors_headers.items():
        response.headers[key] = value
    return response

@main_bp.route('/contacts', methods=['GET', 'OPTIONS'])
def get_contacts():
    if request.method == 'OPTIONS':
        response = make_response()
        return add_cors_headers(response)

    data = get_data()
    response = jsonify(data)
    return add_cors_headers(response)

@main_bp.route('/contacts', methods=['POST', 'OPTIONS'])
def add_contact():
    if request.method == 'OPTIONS':
        response = make_response()
        return add_cors_headers(response)

    data = get_data()
    new_contact = request.json
    new_contact['id'] = get_next_id(data)
    data.append(new_contact)
    write_data(data)
    response = jsonify(new_contact)
    return add_cors_headers(response), 201

@main_bp.route('/contacts/<int:contact_id>', methods=['PUT', 'OPTIONS'])
def edit_contact(contact_id):
    if request.method == 'OPTIONS':
        response = make_response()
        return add_cors_headers(response)

    data = get_data()
    contact = find_contact_by_id(data, contact_id)
    if not contact:
        response = jsonify({"error": "Contact not found"})
        response.status_code = 404
        return add_cors_headers(response)

    contact_update = request.json
    contact.update(contact_update)
    write_data(data)
    response = jsonify(contact)
    return add_cors_headers(response)

@main_bp.route('/contacts/<int:contact_id>', methods=['DELETE', 'OPTIONS'])
def delete_contact(contact_id):
    if request.method == 'OPTIONS':
        response = make_response()
        return add_cors_headers(response)

    data = get_data()
    contact = find_contact_by_id(data, contact_id)
    if not contact:
        response = jsonify({"error": "Contact not found"})
        response.status_code = 404
        return add_cors_headers(response)

    data.remove(contact)
    write_data(data)
    response = jsonify({"message": "Contact deleted"})
    return add_cors_headers(response), 200
