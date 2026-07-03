import json
import hmac
import hashlib

import requests

from flask import current_app


class WebhookService:

    @staticmethod
    def generate_signature(payload):

        secret = current_app.config[
            "WEBHOOK_SECRET"
        ].encode()

        body = json.dumps(

            payload,

            sort_keys=True

        ).encode()

        signature = hmac.new(

            secret,

            body,

            hashlib.sha256

        ).hexdigest()

        return signature

    @staticmethod
    def send_webhook(payload):

        webhook_url = current_app.config[
            "WEBHOOK_URL"
        ]

        signature = (
            WebhookService.generate_signature(
                payload
            )
        )

        headers = {

            "Content-Type":
            "application/json",

            "X-Webhook-Signature":
            signature

        }

        try:

            response = requests.post(

                webhook_url,

                json=payload,

                headers=headers,

                timeout=10

            )

            response.raise_for_status()

            print(
                "Webhook sent successfully."
            )

            return True

        except requests.RequestException as e:

            print(
                f"Webhook failed: {e}"
            )

            return False