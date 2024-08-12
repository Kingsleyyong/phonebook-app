from os import abort
from flask import Blueprint, jsonify, request
from .services import get_data, write_data, get_next_id, find_contact_by_id

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

@main_bp.route('/contacts/<int:contact_id>', methods=['PUT'])
def edit_contact(contact_id):
    data = get_data()
    contact = find_contact_by_id(data, contact_id)
    if not contact:
        abort(404, description="Contact not found")

    contact_update = request.json
    contact.update(contact_update)
    write_data(data)
    return jsonify(contact)

@main_bp.route('/contacts/<int:contact_id>', methods=['DELETE'])
def delete_contact(contact_id):
    data = get_data()
    contact = find_contact_by_id(data, contact_id)
    if not contact:
        abort(404, description="Contact not found")

    data.remove(contact)
    write_data(data)
    return jsonify({"message": "Contact deleted"}), 200
