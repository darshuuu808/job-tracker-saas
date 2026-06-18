from app import app
from services.application_service import (
    ApplicationService
)

from models.job_application import Status


def test_list_applications():

    with app.app_context():

        apps = ApplicationService.list_applications()

        assert isinstance(apps, list)


def test_get_application():

    with app.app_context():

        application = ApplicationService.get_application(1)

        assert application is not None
        assert application.id == 1


def test_create_application():

    with app.app_context():

        application = ApplicationService.create_application(
            company="Tesla_Test_1",
            role="Software Engineer Intern",
            status=Status.APPLIED
        )

        assert application.company == "Tesla_Test_1"

def test_update_application():

    with app.app_context():

        application = ApplicationService.create_application(
            company="Adobe_Test_1",
            role="Backend Intern",
            status=Status.APPLIED
        )

        updated = ApplicationService.update_application(
            application.id,
            status=Status.INTERVIEW
        )

        assert updated.status == Status.INTERVIEW

def test_delete_application():

    with app.app_context():

        application = ApplicationService.create_application(
            company="Oracle",
            role="Java Intern",
            status=Status.APPLIED
        )

        application_id = application.id

        ApplicationService.delete_application(
            application_id
        )

        applications = (
            ApplicationService.list_applications()
        )

        ids = [app.id for app in applications]

        assert application_id not in ids