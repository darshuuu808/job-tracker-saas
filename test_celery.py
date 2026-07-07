from tasks.resume_tasks import parse_resume

result = parse_resume.delay(
    "test_files/Dheeraj_resume.pdf"
)

print("Task ID:", result.id)
print("Waiting for result...")
print(result.get(timeout=30))