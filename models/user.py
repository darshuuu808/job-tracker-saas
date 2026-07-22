from enum import Enum

from extensions import db

from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)


class Role(Enum):

    USER = "USER"

    ADMIN = "ADMIN"


class User(db.Model):

    __tablename__ = "users"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    username = db.Column(
        db.String(100),
        unique=True,
        nullable=False
    )

    email = db.Column(
        db.String(120),
        unique=True,
        nullable=False
    )

    password_hash = db.Column(
        db.String(255),
        nullable=False
    )

    role = db.Column(
        db.Enum(Role),
        nullable=False,
        default=Role.USER
    )

    # ==========================
    # Day 33 - User Settings
    # ==========================

    timezone = db.Column(
        db.String(100),
        nullable=False,
        default="Asia/Kolkata"
    )

    webhook_url = db.Column(
        db.String(500),
        nullable=True
    )

    # ==========================

    applications = db.relationship(
        "JobApplication",
        backref="user",
        cascade="all, delete-orphan",
        lazy=True
    )

    def set_password(
            self,
            password):

        self.password_hash = (
            generate_password_hash(
                password
            )
        )

    def check_password(
            self,
            password):

        return (
            check_password_hash(
                self.password_hash,
                password
            )
        )

    def to_dict(self):

        return {

            "id": self.id,

            "username": self.username,

            "email": self.email,

            "role": self.role.value,

            "timezone": self.timezone,

            "webhook_url": self.webhook_url

        }

    def __repr__(self):

        return (
            f"<User {self.username}>"
        )