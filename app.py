from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

from config import Config

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


@app.route("/")
def home():
    return "Day 3 Service Layer Running!"


if __name__ == "__main__":
    app.run(debug=True)