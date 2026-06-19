from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from config import Config

from services.error_handlers import register_error_handlers
from api.application_routes import application_bp

# Initialize extensions
db = SQLAlchemy()
migrate = Migrate()

# Create Flask app
app = Flask(__name__)

# Load configuration
app.config.from_object(Config)

# Initialize extensions with app
db.init_app(app)
migrate.init_app(app, db)

register_error_handlers(app)

app.register_blueprint(application_bp)

@app.route("/")
def home():
    return "Day 4 Validation Running!"

if __name__ == "__main__":
    app.run(debug=True)