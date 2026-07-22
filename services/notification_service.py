from queue import Queue

from extensions import db
from models.notification import Notification

# Connected SSE clients
listeners = []


def create_notification(
    title,
    message,
    notification_type="info"
):
    """
    Save notification to DB
    and broadcast to all clients.
    """

    notification = Notification(
        title=title,
        message=message,
        type=notification_type
    )

    db.session.add(notification)
    db.session.commit()

    data = notification.to_dict()

    dead = []

    for listener in listeners:
        try:
            listener.put(data)
        except Exception:
            dead.append(listener)

    for listener in dead:
        listeners.remove(listener)

    return data


def stream_notifications():
    """
    Register a new SSE listener.
    """

    q = Queue()

    listeners.append(q)

    return q


def get_notifications():

    return Notification.query.order_by(
        Notification.created_at.desc()
    ).all()


def mark_as_read(notification_id):

    notification = Notification.query.get(
        notification_id
    )

    if notification:

        notification.is_read = True

        db.session.commit()

    return notification


def mark_all_read():

    Notification.query.update(
        {
            Notification.is_read: True
        }
    )

    db.session.commit()