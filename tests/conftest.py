import pytest

from flask import Flask

from extensions import (
    db,
    migrate
)

from config import Config


class TestConfig(Config):

    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    TESTING = True


@pytest.fixture
def app():

    app = Flask(__name__)

    app.config.from_object(TestConfig)

    db.init_app(app)

    with app.app_context():

        db.create_all()

        yield app

        db.session.remove()

        db.drop_all()


@pytest.fixture
def client(app):

    return app.test_client()