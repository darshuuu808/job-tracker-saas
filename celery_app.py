from celery import Celery

from config import Config
from app import app


def make_celery(flask_app):

    celery = Celery(
        flask_app.import_name,
        broker=flask_app.config["CELERY_BROKER_URL"],
        backend=flask_app.config["CELERY_RESULT_BACKEND"],
        include=[
            "tasks.resume_tasks",
            "tasks.stale_tasks"
        ]
    )

    celery.conf.update(
        broker_url=flask_app.config["CELERY_BROKER_URL"],
        result_backend=flask_app.config["CELERY_RESULT_BACKEND"],
        task_serializer="json",
        result_serializer="json",
        accept_content=["json"],
        timezone="Asia/Kolkata",
        enable_utc=False
    )

    class ContextTask(celery.Task):

        def __call__(self, *args, **kwargs):

            with flask_app.app_context():

                return self.run(*args, **kwargs)

    celery.Task = ContextTask

    return celery


celery = make_celery(app)