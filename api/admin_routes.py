from flask import (
    Blueprint,
    jsonify
)

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from decorators import (
    admin_required
)

from services.admin_service import (
    AdminService
)


admin_bp = Blueprint(

    "admin",

    __name__

)


@admin_bp.route(

    "/admin/users",

    methods=["GET"]

)
@jwt_required()
@admin_required
def list_users():

    users = AdminService.list_users()

    return jsonify(
        users
    )


@admin_bp.route(

    "/admin/users/<int:user_id>",

    methods=["DELETE"]

)
@jwt_required()
@admin_required
def delete_user(user_id):

    admin_id = int(
        get_jwt_identity()
    )

    result = AdminService.delete_user(

        admin_id,

        user_id

    )

    if result is None:

        return jsonify(

            {

                "error":
                "User not found"

            }

        ), 404

    return jsonify(
        result
    )