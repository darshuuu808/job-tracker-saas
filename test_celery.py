import pytest

from tasks.resume_tasks import parse_resume


@pytest.mark.integration
def test_parse_resume_task():

    result = parse_resume.delay(
        "test_files/Dheeraj_resume.pdf"
    )

    print("\nTask ID:", result.id)

    output = result.get(timeout=30)

    print(output)

    assert output is not None