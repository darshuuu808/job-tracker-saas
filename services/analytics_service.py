from collections import Counter

from datetime import datetime

from models.job_application import (
    JobApplication,
    Status
)


class AnalyticsService:

    @staticmethod
    def get_analytics():

        applications = (
            JobApplication.query.all()
        )

        total_applications = len(
            applications
        )

        # -----------------------------
        # Applications Per Status
        # -----------------------------

        status_counter = Counter()

        for application in applications:

            status_counter[
                application.status.value
            ] += 1

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

        if total_applications == 0:

            response_rate = 0

        else:

            response_rate = round(

                (
                    interviews +
                    offers
                )

                /

                total_applications

                *

                100,

                2

            )

        # -----------------------------
        # Best Day To Apply
        # -----------------------------

        weekday_counter = Counter()

        for application in applications:

            if application.applied_date:

                weekday = (
                    application.applied_date.strftime(
                        "%A"
                    )
                )

                weekday_counter[
                    weekday
                ] += 1

        if weekday_counter:

            best_day = weekday_counter.most_common(
                1
            )[0][0]

        else:

            best_day = "No Data"

        # -----------------------------
        # Average Days Per Status
        # -----------------------------

        today = datetime.now()

        status_days = {}

        for application in applications:

            if application.applied_date:

                days = (

                    today -

                    application.applied_date

                ).days

                status = (
                    application.status.value
                )

                if status not in status_days:

                    status_days[
                        status
                    ] = []

                status_days[
                    status
                ].append(
                    days
                )

        average_days = {}

        for status, values in status_days.items():

            average_days[
                status
            ] = round(

                sum(values)

                /

                len(values),

                2

            )

        return {

            "total_applications":
            total_applications,

            "applications_per_status":
            dict(
                status_counter
            ),

            "response_rate":
            response_rate,

            "best_day_to_apply":
            best_day,

            "average_days_per_status":
            average_days

        }