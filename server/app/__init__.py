from flask import Flask
from flask_cors import CORS  # Import CORS

def create_app():
    app = Flask(__name__)
    
    # Apply CORS configuration
    CORS(app, resources={r"/*": {"origins": "*"}})  # Adjust the origin as needed

    # Register Blueprints
    from .routes import main_bp
    app.register_blueprint(main_bp)

    return app
