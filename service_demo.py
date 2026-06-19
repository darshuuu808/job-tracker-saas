from app import app
from services.application_service import ApplicationService

with app.app_context():
    applications = ApplicationService.list_applications()
    print(applications)