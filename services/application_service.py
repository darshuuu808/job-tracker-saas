import os

from extensions import db

from models.job_application import (
    JobApplication,
    Status
)

from services.exceptions import (
    ApplicationNotFound,
    DuplicateApplication
)

from services.logger import logger


class ApplicationService:

    @staticmethod
    def list_applications():
        return JobApplication.query.all()

    @staticmethod
    def get_application(application_id):

        job = JobApplication.query.get(
            application_id
        )

        if not job:
            raise ApplicationNotFound(
                f"Application {application_id} not found"
            )

        return job

    @staticmethod
    def create_application(
            company,
            role,
            status,
            notes=None,
            resume_path=None):

        existing = JobApplication.query.filter_by(
            company=company,
            role=role
        ).first()

        if existing:
            raise DuplicateApplication(
                f"Application already exists for {company} - {role}"
            )

        job = JobApplication(
            company=company,
            role=role,
            status=status,
            notes=notes,
            resume_path=resume_path
        )

        db.session.add(job)
        db.session.commit()

        logger.info(
            f"Created application for {company}"
        )

        return job

    @staticmethod
    def update_application(
            application_id,
            **kwargs):

        job = ApplicationService.get_application(
            application_id
        )

        for key, value in kwargs.items():

            if hasattr(job, key):
                setattr(job, key, value)

        db.session.commit()

        logger.info(
            f"Updated application {application_id}"
        )

        return job

    @staticmethod
    def delete_application(application_id):

        application = (
            ApplicationService.get_application(
                application_id
            )
        )

        if (
            application.resume_path
            and
            os.path.exists(
                application.resume_path
            )
        ):
            os.remove(
                application.resume_path
            )

        db.session.delete(
            application
        )

        db.session.commit()

        logger.info(
            f"Deleted application {application_id}"
        )