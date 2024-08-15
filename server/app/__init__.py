from flask import Flask
from dotenv import load_dotenv
import os
from flask_cors import CORS  

load_dotenv()

def create_app():
    app = Flask(__name__)
    
    # Apply CORS configuration
    CORS(app, resources={r"/*": {"origins": "*"}})  

    # Register Blueprints
    from .routes import main_bp
    app.register_blueprint(main_bp)

    return app
