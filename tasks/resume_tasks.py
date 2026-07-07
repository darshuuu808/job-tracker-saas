import pdfplumber

from celery_app import celery

from extensions import db

from models.resume import Resume


@celery.task(
    name="tasks.resume_tasks.parse_resume"
)
def parse_resume(
        filepath):

    text = ""

    with pdfplumber.open(
        filepath
    ) as pdf:

        for page in pdf.pages:

            page_text = page.extract_text()

            if page_text:

                text += (
                    page_text + "\n"
                )

    resume = Resume(

        filename=filepath,

        parsed_text=text

    )

    db.session.add(
        resume
    )

    db.session.commit()

    return {

        "status": "success",

        "filename": filepath,

        "text": text

    }