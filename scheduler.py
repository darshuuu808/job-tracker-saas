from apscheduler.schedulers.background import (
    BackgroundScheduler
)

from models.job_application import (
    JobApplication,
    Status
)

from services.email_service import (
    EmailService
)


scheduler = BackgroundScheduler()

flask_app = None


def send_weekly_digest():

    with flask_app.app_context():

        print(
            "Running Weekly Digest..."
        )

        applications = (
            JobApplication.query.all()
        )

        EmailService.send_weekly_digest(

            recipient="YOUR_MAILTRAP_EMAIL",

            applications=applications
        )


def send_interview_reminders():

    with flask_app.app_context():

        print(
            "Checking Interview Applications..."
        )

        applications = (
            JobApplication.query.filter_by(
                status=Status.INTERVIEW
            ).all()
        )

        for application in applications:

            EmailService.send_interview_reminder(

                recipient="YOUR_MAILTRAP_EMAIL",

                application=application
            )


def start_scheduler(app):

    global flask_app

    flask_app = app

    if scheduler.running:

        return

    scheduler.add_job(

        func=send_weekly_digest,

        trigger="interval",

        minutes=2,

        id="weekly_digest",

        replace_existing=True
    )

    scheduler.add_job(

        func=send_interview_reminders,

        trigger="interval",

        minutes=1,

        id="interview_reminder",

        replace_existing=True
    )

    scheduler.start()

    print(
        "Scheduler Started Successfully"
    )