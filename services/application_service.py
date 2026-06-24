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
    def list_applications(
            page=1,
            per_page=10):

        return JobApplication.query.paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )

    @staticmethod
    def get_application(
            application_id):

        application = db.session.get(
            JobApplication,
            application_id
        )

        if not application:

            raise ApplicationNotFound(
                f"Application {application_id} not found"
            )

        return application

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

        application = JobApplication(
            company=company,
            role=role,
            status=status,
            notes=notes,
            resume_path=resume_path
        )

        db.session.add(
            application
        )

        db.session.commit()

        logger.info(
            f"Created application for {company}"
        )

        return application

    @staticmethod
    def update_application(
            application_id,
            **kwargs):

        application = (
            ApplicationService.get_application(
                application_id
            )
        )

        for key, value in kwargs.items():

            if hasattr(
                application,
                key
            ):
                setattr(
                    application,
                    key,
                    value
                )

        db.session.commit()

        return application

    @staticmethod
    def delete_application(
            application_id):

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

    @staticmethod
    def get_stats():

        stats = {}

        for status in Status:

            stats[
                status.value
            ] = (
                JobApplication.query.filter_by(
                    status=status
                ).count()
            )

        return stats