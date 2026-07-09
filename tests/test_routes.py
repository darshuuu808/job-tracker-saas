import uuid

import pytest

from app import app


@pytest.fixture
def client():

    app.config["TESTING"] = True

    with app.test_client() as client:
        yield client


def test_create_application(client):

    company = f"Google_{uuid.uuid4().hex[:8]}"

    response = client.post(
        "/api/v2/applications",
        json={
            "company": company,
            "role": "Software Engineer Intern"
        }
    )

    print("\nSTATUS:", response.status_code)
    print(response.get_json())

    assert response.status_code == 201

    data = response.get_json()

    assert data["message"] == "Application created"

    assert "id" in data


def test_missing_company(client):

    response = client.post(
        "/api/v2/applications",
        json={
            "role": "Software Engineer Intern"
        }
    )

    assert response.status_code == 400

    data = response.get_json()

    assert "error" in data


def test_missing_role(client):

    response = client.post(
        "/api/v2/applications",
        json={
            "company": "Google"
        }
    )

    assert response.status_code == 400

    data = response.get_json()

    assert "error" in data


def test_empty_company(client):

    response = client.post(
        "/api/v2/applications",
        json={
            "company": "",
            "role": "Software Engineer Intern"
        }
    )

    assert response.status_code == 400

    data = response.get_json()

    assert "error" in data


def test_empty_role(client):

    response = client.post(
        "/api/v2/applications",
        json={
            "company": "Google",
            "role": ""
        }
    )

    assert response.status_code == 400

    data = response.get_json()

    assert "error" in data