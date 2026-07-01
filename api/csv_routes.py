from flask import (
    Blueprint,
    send_file,
    request,
    jsonify
)

from services.csv_service import (
    CSVService
)

csv_bp = Blueprint(
    "csv",
    __name__
)


@csv_bp.route(
    "/api/applications/export",
    methods=["GET"]
)
def export_csv():

    filepath = "applications.csv"

    CSVService.export_applications(
        filepath
    )

    return send_file(
        filepath,
        as_attachment=True,
        download_name="applications.csv",
        mimetype="text/csv"
    )


@csv_bp.route(
    "/api/applications/import",
    methods=["POST"]
)
def import_csv():

    if "file" not in request.files:

        return jsonify(
            {
                "error":
                "CSV file required"
            }
        ), 400

    file = request.files["file"]

    if file.filename == "":

        return jsonify(
            {
                "error":
                "No file selected"
            }
        ), 400

    filepath = "uploaded_applications.csv"

    file.save(
        filepath
    )

    try:

        result = CSVService.import_applications(
            filepath
        )

        return jsonify(
            result
        )

    except ValueError as e:

        return jsonify(
            {
                "error": str(e)
            }
        ), 400

    except Exception as e:

        return jsonify(
            {
                "error": str(e)
            }
        ), 500done