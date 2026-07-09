import requests
import uuid

BASE_URL = "http://127.0.0.1:5000"


def test_application_crud(access_token):

    headers = {
        "Authorization": f"Bearer {access_token}"
    }

    # -----------------------------
    # Create
    # -----------------------------

    company = f"OpenAI_{uuid.uuid4().hex[:6]}"

    create = requests.post(
        f"{BASE_URL}/api/v2/applications",
        headers=headers,
        json={
            "company": company,
            "role": "Backend Engineer Intern",
            "notes": "Integration Test"
        }
    )

    print("\nCREATE:", create.status_code)
    print(create.text)

    assert create.status_code == 201

    application_id = create.json()["id"]

    # -----------------------------
    # Read
    # -----------------------------

    read = requests.get(
        f"{BASE_URL}/api/v2/applications/{application_id}",
        headers=headers
    )

    print("\nREAD:", read.status_code)
    print(read.text)

    assert read.status_code == 200

    assert read.json()["company"] == company

    # -----------------------------
    # Update
    # -----------------------------

    update = requests.patch(
        f"{BASE_URL}/api/v2/applications/{application_id}",
        headers=headers,
        json={
            "status": "Interview"
        }
    )

    print("\nUPDATE:", update.status_code)
    print(update.text)

    assert update.status_code == 200

    # -----------------------------
    # Verify Update
    # -----------------------------

    verify = requests.get(
        f"{BASE_URL}/api/v2/applications/{application_id}",
        headers=headers
    )

    assert verify.json()["status"] == "Interview"

    # -----------------------------
    # Delete
    # -----------------------------

    delete = requests.delete(
        f"{BASE_URL}/api/v2/applications/{application_id}",
        headers=headers
    )

    print("\nDELETE:", delete.status_code)
    print(delete.text)

    assert delete.status_code == 200

    # -----------------------------
    # Verify Delete
    # -----------------------------

    deleted = requests.get(
        f"{BASE_URL}/api/v2/applications/{application_id}",
        headers=headers
    )

    assert deleted.status_code == 404