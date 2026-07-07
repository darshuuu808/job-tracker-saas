from datetime import datetime, timedelta

from celery_app import celery

from models.job_application import JobApplication


@celery.task(
    name="tasks.stale_tasks.stale_application_check"
)
def stale_application_check():

    stale_apps = JobApplication.query.filter(

        JobApplication.applied_date <

        datetime.utcnow() - timedelta(days=14)

    ).all()

    print(f"Found {len(stale_apps)} stale applications")

    for app in stale_apps:

        print(
            f"{app.company} - {app.role}"
        )

    return len(stale_apps)