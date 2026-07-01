from functools import wraps

from flask import (
    jsonify
)

from flask_jwt_extended import (
    get_jwt_identity
)

from models.user import (
    User,
    Role
)


def admin_required(func):

    @wraps(func)
    def wrapper(*args, **kwargs):

        current_user_id = int(
            get_jwt_identity()
        )

        user = User.query.get(
            current_user_id
        )

        if user is None:

            return jsonify(

                {
                    "error":
                    "User not found"
                }

            ), 404

        if user.role != Role.ADMIN:

            return jsonify(

                {
                    "error":
                    "Admin access required"
                }

            ), 403

        return func(
            *args,
            **kwargs
        )

    return wrapper