from flask import (
    Blueprint,
    jsonify
)

from services.analytics_service import (
    AnalyticsService
)

analytics_bp = Blueprint(
    "analytics",
    __name__
)


@analytics_bp.route(
    "/api/analytics",
    methods=["GET"]
)
def get_analytics():

    analytics = (
        AnalyticsService.get_analytics()
    )

    return jsonify(
        analytics
    )