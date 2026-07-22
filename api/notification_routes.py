from flask import Blueprint, jsonify, Response
import json

from services.notification_service import (
    get_notifications,
    stream_notifications,
    mark_as_read,
    mark_all_read,
)

notification_bp = Blueprint(
    "notification",
    __name__,
    url_prefix="/api/notifications"
)


@notification_bp.get("/")
def list_notifications():
    return jsonify(
        [n.to_dict() for n in get_notifications()]
    )


@notification_bp.get("/stream")
def notification_stream():

    q = stream_notifications()

    def event_stream():
        while True:
            data = q.get()
            yield f"data: {json.dumps(data)}\n\n"

    return Response(
        event_stream(),
        mimetype="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        },
    )


@notification_bp.patch("/<int:notification_id>/read")
def read_notification(notification_id):

    notification = mark_as_read(notification_id)

    if not notification:
        return jsonify({"error": "Notification not found"}), 404

    return jsonify(notification.to_dict())


@notification_bp.patch("/read-all")
def read_all():

    mark_all_read()

    return jsonify(
        {"message": "All notifications marked as read"}
    )


@notification_bp.get("/test")
def test():

    return jsonify(
        {"message": "Notification API Working"}
    )