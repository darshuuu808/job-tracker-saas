from extensions import db

from models.user import User
from models.audit_log import AuditLog


class AdminService:

    @staticmethod
    def create_audit_log(admin_id, action, target):
        log = AuditLog(
            admin_id=admin_id,
            action=action,
            target=target
        )

        db.session.add(log)

    @staticmethod
    def list_users():
        users = User.query.order_by(User.id).all()

        return [
            {
                "id": user.id,
                "username": user.username,
                "email": user.email,
                "role": user.role.value,
                "is_active": user.is_active
            }
            for user in users
        ]

    @staticmethod
    def deactivate_user(admin_id, user_id):
        user = User.query.get(user_id)

        if user is None:
            return None

        if not user.is_active:
            return {
                "message": "User already deactivated"
            }

        user.is_active = False

        AdminService.create_audit_log(
            admin_id,
            "DEACTIVATE_USER",
            f"User ID {user.id}"
        )

        db.session.commit()

        return {
            "message": "User deactivated successfully"
        }

    @staticmethod
    def activate_user(admin_id, user_id):
        user = User.query.get(user_id)

        if user is None:
            return None

        if user.is_active:
            return {
                "message": "User already active"
            }

        user.is_active = True

        AdminService.create_audit_log(
            admin_id,
            "ACTIVATE_USER",
            f"User ID {user.id}"
        )

        db.session.commit()

        return {
            "message": "User activated successfully"
        }

    @staticmethod
    def get_stats():
        return {
            "total_users": User.query.count(),
            "active_users": User.query.filter_by(
                is_active=True
            ).count(),
            "inactive_users": User.query.filter_by(
                is_active=False
            ).count(),
            "admin_users": User.query.filter_by(
                role="ADMIN"
            ).count()
        }