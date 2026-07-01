from extensions import (
    db
)

from models.user import (
    User
)

from models.audit_log import (
    AuditLog
)


class AdminService:

    @staticmethod
    def create_audit_log(
            admin_id,
            action,
            target):

        log = AuditLog(

            admin_id=admin_id,

            action=action,

            target=target

        )

        db.session.add(
            log
        )

    @staticmethod
    def list_users():

        users = User.query.all()

        return [

            {

                "id": user.id,

                "username": user.username,

                "email": user.email,

                "role": user.role.value

            }

            for user in users

        ]

    @staticmethod
    def delete_user(
            admin_id,
            user_id):

        user = User.query.get(
            user_id
        )

        if user is None:

            return None

        AdminService.create_audit_log(

            admin_id,

            "DELETE_USER",

            f"User ID {user.id}"

        )

        db.session.delete(
            user
        )

        db.session.commit()

        return {

            "message":
            "User deleted successfully"

        }