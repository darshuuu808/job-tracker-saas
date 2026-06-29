from flask import (
    Blueprint,
    jsonify
)

from models.job_application import (
    JobApplication,
    Status
)

from services.email_service import (
    EmailService
)

email_bp = Blueprint(
    "email",
    __name__
)


@email_bp.route(
    "/email/test",
    methods=["GET"]
)
def send_test_email():

    EmailService.send_email(

        recipient="darshan160406@gmail.com",

        subject="Job Tracker SaaS Test",

        body="Congratulations! Gmail SMTP is working successfully."
    )

    return jsonify(
        {
            "message":
            "Plain text email sent."
        }
    )


@email_bp.route(
    "/email/test-weekly",
    methods=["GET"]
)
def test_weekly_digest():

    applications = (
        JobApplication.query.all()
    )

    EmailService.send_weekly_digest(

        recipient="darshan160406@gmail.com",

        applications=applications
    )

    return jsonify(
        {
            "message":
            "Weekly Digest sent."
        }
    )


@email_bp.route(
    "/email/test-interview",
    methods=["GET"]
)
def test_interview():

    application = (

        JobApplication.query.filter_by(

            status=Status.INTERVIEW

        ).first()

    )

    if application is None:

        return jsonify(
            {
                "error":
                "No interview applications found."
            }
        ), 404

    EmailService.send_interview_reminder(

        recipient="darshan160406@gmail.com",

        application=application
    )

    return jsonify(
        {
            "message":
            "Interview Reminder sent."
        }
    )