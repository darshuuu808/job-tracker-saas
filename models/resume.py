from extensions import db


class Resume(db.Model):

    __tablename__ = "resumes"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    filename = db.Column(
        db.String(255),
        nullable=False
    )

    parsed_text = db.Column(
        db.Text,
        nullable=False
    )