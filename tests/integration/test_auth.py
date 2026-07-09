import requests

BASE_URL = "http://127.0.0.1:5000"


def test_login(access_token):

    assert access_token is not None


def test_profile(access_token):

    response = requests.get(
        f"{BASE_URL}/profile",
        headers={
            "Authorization": f"Bearer {access_token}"
        }
    )

    print(response.status_code)
    print(response.text)

    assert response.status_code == 200

    data = response.json()

    assert "username" in data
    assert "email" in data