from collections import Counter
from datetime import datetime

from models.job_application import (
    JobApplication,
    Status
)


class AnalyticsService:

    @staticmethod
    def get_analytics():

        applications = JobApplication.query.all()

        total_applications = len(applications)

        # -----------------------------
        # Applications Per Status
        # -----------------------------

        status_counter = Counter()

        for application in applications:
            status_counter[application.status.value] += 1

        # -----------------------------
        # Response Rate
        # -----------------------------

        interviews = status_counter.get(
            Status.INTERVIEW.value,
            0
        )

        offers = status_counter.get(
            Status.OFFER.value,
            0
        )

        response_rate = (
            0
            if total_applications == 0
            else round(
                ((interviews + offers) / total_applications) * 100,
                2
            )
        )

        # -----------------------------
        # Best Day To Apply
        # -----------------------------

        weekday_counter = Counter()

        for application in applications:

            if application.applied_date:
                weekday_counter[
                    application.applied_date.strftime("%A")
                ] += 1

        best_day = (
            weekday_counter.most_common(1)[0][0]
            if weekday_counter
            else "No Data"
        )

        # -----------------------------
        # Average Days Per Status
        # -----------------------------

        today = datetime.now()

        status_days = {}

        for application in applications:

            if application.applied_date:

                days = (
                    today - application.applied_date
                ).days

                status = application.status.value

                status_days.setdefault(
                    status,
                    []
                ).append(days)

        average_days = {

            status: round(
                sum(values) / len(values),
                2
            )

            for status, values in status_days.items()

        }

        # -----------------------------
        # Status Distribution
        # -----------------------------

        status_distribution = []

        for status, count in status_counter.items():

            status_distribution.append({

                "status": status,

                "count": count

            })

        # -----------------------------
        # Applications Per Week
        # -----------------------------

        weekly_counter = Counter()

        for application in applications:

            if application.applied_date:

                year, week, _ = application.applied_date.isocalendar()

                weekly_counter[f"{year}-W{week:02d}"] += 1

        applications_per_week = []

        for week, count in sorted(weekly_counter.items()):

            applications_per_week.append({

                "week": week,

                "count": count

            })

        # -----------------------------
        # Final Response
        # -----------------------------

        return {

            "total_applications": total_applications,

            "applications_per_status": dict(status_counter),

            "status_distribution": status_distribution,

            "applications_per_week": applications_per_week,

            "response_rate": response_rate,

            "best_day_to_apply": best_day,

            "average_days_per_status": average_days

        }