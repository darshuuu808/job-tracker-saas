from flask import Flask

from config import Config

from extensions import (
    db,
    migrate,
    jwt
)

app = Flask(__name__)

app.config.from_object(
    Config
)

db.init_app(app)

migrate.init_app(
    app,
    db
)

jwt.init_app(app)

with app.app_context():
    import models

from services.error_handlers import (
    register_error_handlers
)

register_error_handlers(
    app
)

from api.application_routes import (
    application_bp
)

from api.auth_routes import (
    auth_bp
)

app.register_blueprint(
    application_bp
)

app.register_blueprint(
    auth_bp
)


@app.route("/")
def home():

    return (
        "Day 7 JWT Authentication Running!"
    )


if __name__ == "__main__":

    app.run(
        debug=False,
        use_reloader=False
    )