import requests

BASE_URL = "http://127.0.0.1:5000"


def test_analytics(access_token):

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    response = requests.get(
        f"{BASE_URL}/api/analytics",
        headers=headers
    )

    print("\nANALYTICS:", response.status_code)
    print(response.text)

    assert response.status_code == 200

    data = response.json()

    assert "total_applications" in data
    assert "applications_per_status" in data
    assert "response_rate" in data
    assert "best_day_to_apply" in data
    assert "average_days_per_status" in data