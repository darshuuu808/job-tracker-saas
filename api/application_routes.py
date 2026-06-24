from flask import (
    Blueprint,
    request,
    jsonify
)

from models.job_application import (
    Status
)

from services.application_service import (
    ApplicationService
)

from services.exceptions import (
    ApplicationNotFound,
    DuplicateApplication
)

application_bp = Blueprint(
    "applications",
    __name__
)


@application_bp.route(
    "/api/applications",
    methods=["GET"]
)
def list_applications():

    page = int(
        request.args.get(
            "page",
            1
        )
    )

    per_page = int(
        request.args.get(
            "per_page",
            10
        )
    )

    applications = (
        ApplicationService.list_applications(
            page,
            per_page
        )
    )

    return jsonify(
        {
            "total":
            applications.total,

            "page":
            applications.page,

            "pages":
            applications.pages,

            "applications":
            [
                {
                    "id":
                    app.id,

                    "company":
                    app.company,

                    "role":
                    app.role,

                    "status":
                    app.status.value,

                    "notes":
                    app.notes
                }

                for app in applications.items
            ]
        }
    )


@application_bp.route(
    "/api/applications/<int:application_id>",
    methods=["GET"]
)
def get_application(
        application_id):

    try:

        app = (
            ApplicationService.get_application(
                application_id
            )
        )

        return jsonify(
            {
                "id":
                app.id,

                "company":
                app.company,

                "role":
                app.role,

                "status":
                app.status.value,

                "notes":
                app.notes,

                "resume_path":
                app.resume_path
            }
        )

    except ApplicationNotFound as e:

        return jsonify(
            {
                "error":
                str(e)
            }
        ), 404


@application_bp.route(
    "/api/applications",
    methods=["POST"]
)
def create_application():

    data = request.get_json()

    try:

        app = (
            ApplicationService.create_application(
                company=data["company"],
                role=data["role"],
                status=Status.APPLIED,
                notes=data.get(
                    "notes"
                )
            )
        )

        return jsonify(
            {
                "message":
                "Application created",

                "id":
                app.id
            }
        ), 201

    except DuplicateApplication as e:

        return jsonify(
            {
                "error":
                str(e)
            }
        ), 400


@application_bp.route(
    "/api/applications/<int:application_id>",
    methods=["PATCH"]
)
def update_application(
        application_id):

    data = request.get_json()

    app = (
        ApplicationService.update_application(
            application_id,
            **data
        )
    )

    return jsonify(
        {
            "message":
            "Application updated",

            "id":
            app.id
        }
    )


@application_bp.route(
    "/api/applications/<int:application_id>",
    methods=["DELETE"]
)
def delete_application(
        application_id):

    ApplicationService.delete_application(
        application_id
    )

    return jsonify(
        {
            "message":
            "Application deleted"
        }
    )


@application_bp.route(
    "/api/applications/stats",
    methods=["GET"]
)
def application_stats():

    return jsonify(
        ApplicationService.get_stats()
    )