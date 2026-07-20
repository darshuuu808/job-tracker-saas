from flask import Blueprint, request, jsonify

job_search_bp = Blueprint(
    "job_search",
    __name__,
    url_prefix="/api/jobs"
)

@job_search_bp.route("/search")
def search_jobs():

    keyword = request.args.get("q", "")

    page = int(request.args.get("page", 1))

    return jsonify({
        "query": keyword,
        "page": page,
        "results": []
    })