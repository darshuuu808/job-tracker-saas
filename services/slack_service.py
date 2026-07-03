import requests

from flask import (
    current_app
)

from services.logger import (
    logger
)


class SlackService:

    @staticmethod
    def send_offer_notification(
            application):

        webhook_url = current_app.config.get(
            "SLACK_WEBHOOK_URL"
        )

        if not webhook_url:

            logger.warning(
                "Slack webhook URL not configured."
            )

            return

        payload = {

            "text":

            (
                "🎉 *New Job Offer Received!*\n\n"

                f"*Company:* {application.company}\n"

                f"*Role:* {application.role}\n"

                f"*Status:* {application.status.value}"

            )

        }

        try:

            response = requests.post(

                webhook_url,

                json=payload,

                timeout=10

            )

            response.raise_for_status()

            logger.info(
                "Slack notification sent successfully."
            )

        except Exception as e:

            logger.error(
                f"Slack notification failed: {e}"
            )