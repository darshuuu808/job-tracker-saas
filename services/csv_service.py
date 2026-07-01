import csv

from extensions import db

from models.job_application import (
    JobApplication,
    Status
)


class CSVService:

    @staticmethod
    def export_applications(filepath):

        applications = (
            JobApplication.query.all()
        )

        with open(
            filepath,
            mode="w",
            newline="",
            encoding="utf-8"
        ) as file:

            writer = csv.writer(file)

            writer.writerow(
                [
                    "company",
                    "role",
                    "status",
                    "notes"
                ]
            )

            for application in applications:

                writer.writerow(
                    [
                        application.company,
                        application.role,
                        application.status.value,
                        application.notes
                    ]
                )

        return filepath

    @staticmethod
    def import_applications(filepath):

        imported = 0

        updated = 0

        failed = 0

        errors = []

        required_headers = [

            "company",

            "role",

            "status",

            "notes"

        ]

        with open(

            filepath,

            mode="r",

            encoding="utf-8"

        ) as file:

            reader = csv.DictReader(
                file
            )

            if reader.fieldnames != required_headers:

                raise ValueError(
                    "Invalid CSV headers"
                )

            for row_number, row in enumerate(

                reader,

                start=2

            ):

                try:

                    application = (
                        JobApplication.query.filter_by(

                            company=row["company"],

                            role=row["role"]

                        ).first()
                    )

                    if application:

                        application.status = Status(
                            row["status"]
                        )

                        application.notes = row["notes"]

                        updated += 1

                    else:

                        application = JobApplication(

                            company=row["company"],

                            role=row["role"],

                            status=Status(
                                row["status"]
                            ),

                            notes=row["notes"]

                        )

                        db.session.add(
                            application
                        )

                        imported += 1

                except Exception as e:

                    failed += 1

                    errors.append(
                        [
                            row_number,
                            str(e)
                        ]
                    )

            db.session.commit()

        if errors:

            with open(

                "errors.csv",

                mode="w",

                newline="",

                encoding="utf-8"

            ) as file:

                writer = csv.writer(
                    file
                )

                writer.writerow(
                    [
                        "Row",
                        "Error"
                    ]
                )

                writer.writerows(
                    errors
                )

        return {

            "imported": imported,

            "updated": updated,

            "failed": failed

        }