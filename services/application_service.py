import os

import bleach

from sqlalchemy import func

from services.notification_service import create_notification

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

from services.webhook_service import (
    WebhookService
)

from services.slack_service import (
    SlackService
)


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

        company = bleach.clean(
            company,
            tags=[],
            attributes={},
            strip=True
        )

        role = bleach.clean(
            role,
            tags=[],
            attributes={},
            strip=True
        )

        if notes:

            notes = bleach.clean(
                notes,
                tags=[],
                attributes={},
                strip=True
            )

        print("Sanitized company:", company)
        print("Sanitized role:", role)
        print("Sanitized notes:", notes)

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
        
        create_notification(
            title="Application Added",
            message=f"{application.role} at {application.company}",
            notification_type="success"
        )

        logger.info(
            f"Created application for {company}"
        )

        payload = {

            "event": "application_created",

            "application_id": application.id,

            "company": application.company,

            "role": application.role,

            "status": application.status.value

        }

        WebhookService.send_webhook(
            payload
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

        old_status = application.status

        for key, value in kwargs.items():

            if key == "status":

                if isinstance(
                    value,
                    str
                ):

                    value = Status[
                        value.upper()
                    ]

            elif key in [
                "company",
                "role",
                "notes"
            ]:

                if value:

                    value = bleach.clean(
                        value,
                        tags=[],
                        attributes={},
                        strip=True
                    )

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

        create_notification(
            title="Application Updated",
            message=f"{application.company} → {application.status.value}",
            notification_type="info"
        )
        if old_status != application.status:

            payload = {

                "event": "status_updated",

                "application_id": application.id,

                "company": application.company,

                "role": application.role,

                "old_status": old_status.value,

                "new_status": application.status.value

            }

            WebhookService.send_webhook(
                payload
            )

            if application.status == Status.OFFER:

                SlackService.send_offer_notification(
                    application
                )

        logger.info(
            f"Updated application {application.id}"
        )

        return application

    @staticmethod
    def delete_application(
            application_id):

        application = (
            ApplicationService.get_application(
                application_id
            )
        )

        company = application.company 

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
        
        create_notification(
            title="Application Deleted",
            message=company,
            notification_type="warning"
        )


        logger.info(
            f"Deleted application {application.id}"
        )

    @staticmethod
    def get_stats():

        print("🔥 NEW get_stats() EXECUTED")

        total = JobApplication.query.count()

        applied = JobApplication.query.filter_by(
            status=Status.APPLIED
        ).count()

        phone_screen = JobApplication.query.filter_by(
            status=Status.PHONE_SCREEN
        ).count()

        interview = JobApplication.query.filter_by(
            status=Status.INTERVIEW
        ).count()

        offer = JobApplication.query.filter_by(
            status=Status.OFFER
        ).count()

        rejected = JobApplication.query.filter_by(
            status=Status.REJECTED
        ).count()

        weekly = (
            db.session.query(
                func.date_trunc(
                    "week",
                    JobApplication.applied_date
                ).label("week"),
                func.count(
                    JobApplication.id
                ).label("count")
            )
            .group_by("week")
            .order_by("week")
            .all()
        )

        applications_per_week = [
            {
                "week": row.week.strftime("%d %b"),
                "count": row.count
            }
            for row in weekly
        ]

        status_distribution = [
            {
                "status": "Applied",
                "count": applied
            },
            {
                "status": "Phone Screen",
                "count": phone_screen
            },
            {
                "status": "Interview",
                "count": interview
            },
            {
                "status": "Offer",
                "count": offer
            },
            {
                "status": "Rejected",
                "count": rejected
            }
        ]

        return {
            "total": total,
            "applied": applied,
            "phone_screen": phone_screen,
            "interview": interview,
            "offer": offer,
            "rejected": rejected,
            "status_distribution": status_distribution,
            "applications_per_week": applications_per_week
        }