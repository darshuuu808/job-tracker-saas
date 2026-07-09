from datetime import datetime
import enum

from extensions import db


class Status(enum.Enum):

    APPLIED = "Applied"

    PHONE_SCREEN = "Phone Screen"

    INTERVIEW = "Interview"

    OFFER = "Offer"

    REJECTED = "Rejected"


class JobApplication(db.Model):

    __tablename__ = "job_applications"

    __table_args__ = (

        db.Index(
            "idx_user_status_date",
            "user_id",
            "status",
            "applied_date"
        ),

        db.Index(
            "idx_status",
            "status"
        ),

        db.Index(
            "idx_applied_date",
            "applied_date"
        ),

    )

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    company = db.Column(
        db.String(100),
        nullable=False
    )

    role = db.Column(
        db.String(100),
        nullable=False
    )

    status = db.Column(
        db.Enum(Status),
        nullable=False,
        default=Status.APPLIED
    )

    applied_date = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    notes = db.Column(
        db.Text
    )

    resume_path = db.Column(
        db.String(255)
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id"),
        nullable=True
    )