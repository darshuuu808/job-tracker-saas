from flask_mail import (
    Message
)

from flask import (
    render_template,
    current_app
)

from extensions import (
    mail
)


class EmailService:

    @staticmethod
    def send_email(
            recipient,
            subject,
            body):

        message = Message(

            subject=subject,

            sender=current_app.config[
                "MAIL_DEFAULT_SENDER"
            ],

            recipients=[
                recipient
            ]
        )

        message.body = body

        mail.send(
            message
        )

    @staticmethod
    def send_weekly_digest(
            recipient,
            applications):

        message = Message(

            subject="Weekly Job Applications",

            sender=current_app.config[
                "MAIL_DEFAULT_SENDER"
            ],

            recipients=[
                recipient
            ]
        )

        message.html = render_template(

            "emails/weekly_digest.html",

            applications=applications
        )

        mail.send(
            message
        )

    @staticmethod
    def send_interview_reminder(
            recipient,
            application):

        message = Message(

            subject="Interview Reminder",

            sender=current_app.config[
                "MAIL_DEFAULT_SENDER"
            ],

            recipients=[
                recipient
            ]
        )

        message.html = render_template(

            "emails/interview_reminder.html",

            application=application
        )

        mail.send(
            message
        )