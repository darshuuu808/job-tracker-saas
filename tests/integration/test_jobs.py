import requests

BASE_URL = "http://127.0.0.1:5000"


def test_job_search():

    response = requests.get(
        f"{BASE_URL}/api/jobs/search",
        params={
            "q": "Python Developer",
            "location": "Chennai"
        }
    )

    print("\nJOBS:", response.status_code)
    print(response.text)

    assert response.status_code == 200

    data = response.json()

    assert data is not None