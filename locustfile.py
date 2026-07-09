from locust import HttpUser, task, between
import uuid


class JobTrackerUser(HttpUser):

    wait_time = between(1, 3)

    access_token = None

    def on_start(self):

        username = f"locust_{uuid.uuid4().hex[:8]}"
        email = f"{username}@example.com"
        password = "Test@123"

        self.client.post(
            "/register",
            json={
                "username": username,
                "email": email,
                "password": password
            }
        )

        response = self.client.post(
            "/login",
            json={
                "email": email,
                "password": password
            }
        )

        if response.status_code == 200:
            self.access_token = response.json()["access_token"]

    @task(4)
    def profile(self):

        if self.access_token:
            self.client.get(
                "/profile",
                headers={
                    "Authorization": f"Bearer {self.access_token}"
                }
            )

    @task(3)
    def jobs(self):

        self.client.get(
            "/api/jobs/search",
            params={
                "q": "Python",
                "location": "Chennai"
            }
        )

    @task(2)
    def analytics(self):

        self.client.get(
            "/api/applications/stats"
        )

    @task(5)
    def create_application(self):

        if self.access_token:

            company = f"Google_{uuid.uuid4().hex[:6]}"

            self.client.post(
                "/api/v2/applications",
                headers={
                    "Authorization": f"Bearer {self.access_token}"
                },
                json={
                    "company": company,
                    "role": "Backend Intern"
                }
            )