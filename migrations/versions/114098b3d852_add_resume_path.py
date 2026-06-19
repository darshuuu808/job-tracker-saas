"""Add resume path

Revision ID: 114098b3d852
Revises: 7fa81c6d6abb
Create Date: 2026-06-19 16:14:02.092416

"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "114098b3d852"
down_revision = "7fa81c6d6abb"
branch_labels = None
depends_on = None


def upgrade():

    op.add_column(
        "job_applications",
        sa.Column(
            "resume_path",
            sa.String(length=255),
            nullable=True
        )
    )


def downgrade():

    op.drop_column(
        "job_applications",
        "resume_path"
    )