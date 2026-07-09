import pytest
import requests
import uuid

BASE_URL = "http://127.0.0.1:5000"


@pytest.fixture(scope="session")
def access_token():

    username = f"testuser_{uuid.uuid4().hex[:8]}"
    email = f"{username}@example.com"
    password = "Test@123"

    # -----------------------------
    # Register Test User
    # -----------------------------
    register = requests.post(
        f"{BASE_URL}/register",
        json={
            "username": username,
            "email": email,
            "password": password
        }
    )

    print("\nREGISTER:", register.status_code)
    print(register.text)

    assert register.status_code in (200, 201)

    # -----------------------------
    # Login
    # -----------------------------
    login = requests.post(
        f"{BASE_URL}/login",
        json={
            "email": email,
            "password": password
        }
    )

    print("\nLOGIN:", login.status_code)
    print(login.text)

    assert login.status_code == 200

    response = login.json()

    assert "access_token" in response

    return response["access_token"]