from flask import (
    Blueprint,
    request,
    jsonify
)

from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    get_jwt
)
from models.user import User

from models.token_blocklist import (
    TokenBlocklist
)

from extensions import db


def get_current_user():

    current_user_id = get_jwt_identity()

    user = User.query.get(int(current_user_id))

    if not user:
        return None

    return user

auth_bp = Blueprint(
    "auth",
    __name__
)


@auth_bp.route(
    "/register",
    methods=["POST"]
)
def register():

    data = request.get_json()

    username = data.get(
        "username"
    )

    email = data.get(
        "email"
    )

    password = data.get(
        "password"
    )

    if (
        not username
        or
        not email
        or
        not password
    ):

        return jsonify(
            {
                "error":
                "username, email and password are required"
            }
        ), 400

    existing = User.query.filter(
        (
            User.username
            ==
            username
        )
        |
        (
            User.email
            ==
            email
        )
    ).first()

    if existing:

        return jsonify(
            {
                "error":
                "User already exists"
            }
        ), 400

    user = User(
        username=username,
        email=email
    )

    user.set_password(
        password
    )

    db.session.add(
        user
    )

    db.session.commit()

    return jsonify(
        {
            "message":
            "User registered successfully"
        }
    ), 201


@auth_bp.route(
    "/login",
    methods=["POST"]
)
def login():

    data = request.get_json()

    email = data.get(
        "email"
    )

    password = data.get(
        "password"
    )

    user = User.query.filter_by(
        email=email
    ).first()

    if (
        not user
        or
        not user.check_password(
            password
        )
    ):

        return jsonify(
            {
                "error":
                "Invalid credentials"
            }
        ), 401

    access_token = (
        create_access_token(
            identity=str(user.id)
        )
    )

    refresh_token = (
        create_refresh_token(
            identity=str(user.id)
        )
    )

    return jsonify(
        {
            "access_token":
            access_token,
            "refresh_token":
            refresh_token
        }
    )

@auth_bp.route(
    "/profile",
    methods=["GET"]
)
@jwt_required()
def profile():

    user = get_current_user()

    if not user:

        return jsonify(
            {"error": "User not found"}
        ), 404

    return jsonify({

        "id": user.id,

        "username": user.username,

        "email": user.email,

        "role": user.role.value,

        "timezone": user.timezone,

        "webhook_url": user.webhook_url

    })

@auth_bp.route(
    "/profile",
    methods=["PUT"]
)
@jwt_required()
def update_profile():

    user = get_current_user()

    if not user:

        return jsonify(
            {
                "error": "User not found"
            }
        ), 404

    data = request.get_json()

    if "username" in data:

        existing = User.query.filter(
            User.username == data["username"],
            User.id != user.id
        ).first()

        if existing:

            return jsonify(
                {
                    "error": "Username already exists"
                }
            ), 400

        user.username = data["username"]

    if "email" in data:

        existing = User.query.filter(
            User.email == data["email"],
            User.id != user.id
        ).first()

        if existing:

            return jsonify(
                {
                    "error": "Email already exists"
                }
            ), 400

        user.email = data["email"]

    if "timezone" in data:

        user.timezone = data["timezone"]

    db.session.commit()

    return jsonify(
        {
            "message": "Profile updated successfully"
        }
    )

@auth_bp.route(
    "/profile/password",
    methods=["PUT"]
)
@jwt_required()
def change_password():

    user = get_current_user()

    if not user:

        return jsonify(
            {"error": "User not found"}
        ), 404

    data = request.get_json()

    current_password = data.get("current_password")
    new_password = data.get("new_password")

    if not current_password or not new_password:
        return jsonify({
            "error": "Current password and new password are required"
        }), 400

    if not user.check_password(current_password):
        return jsonify({
            "error": "Current password is incorrect"
        }), 400

    user.set_password(new_password)

    db.session.commit()

    return jsonify({
        "message": "Password updated successfully"
    })

@auth_bp.route(
    "/profile/webhook",
    methods=["PUT"]
)
@jwt_required()
def update_webhook():

    user = get_current_user()

    if not user:

        return jsonify(
            {"error": "User not found"}
        ), 404

    data = request.get_json()

    user.webhook_url = data.get(
        "webhook_url"
    )

    db.session.commit()

    return jsonify({
        "message": "Webhook updated successfully"
    })

@auth_bp.route(
    "/profile",
    methods=["DELETE"]
)
@jwt_required()
def delete_account():

    user = get_current_user()

    if not user:

        return jsonify(
            {"error": "User not found"}
        ), 404

    db.session.delete(user)

    db.session.commit()

    return jsonify({
        "message": "Account deleted successfully"
    })

@auth_bp.route(
    "/refresh",
    methods=["POST"]
)
@jwt_required(refresh=True)
def refresh():

    current_user = (
        get_jwt_identity()
    )

    access_token = (
        create_access_token(
            identity=current_user
        )
    )

    return jsonify(
        {
            "access_token":
            access_token
        }
    )

@auth_bp.route(
    "/logout",
    methods=["POST"]
)
@jwt_required()
def logout():

    jti = get_jwt()["jti"]

    token = TokenBlocklist(
        jti=jti
    )

    db.session.add(
        token
    )

    db.session.commit()

    return jsonify(
        {
            "message":
            "Logout successful"
        }
    )