"""Add user roles

Revision ID: 5f86a798f118
Revises: 81c06288e26a
Create Date: 2026-07-01
"""

from alembic import op
import sqlalchemy as sa


# revision identifiers
revision = "5f86a798f118"
down_revision = "81c06288e26a"
branch_labels = None
depends_on = None


role_enum = sa.Enum(
    "USER",
    "ADMIN",
    name="role"
)


def upgrade():

    # Create PostgreSQL enum type
    role_enum.create(
        op.get_bind(),
        checkfirst=True
    )

    # Add role column
    op.add_column(
        "users",
        sa.Column(
            "role",
            role_enum,
            nullable=False,
            server_default="USER"
        )
    )

    # Remove default after existing rows are populated
    op.alter_column(
        "users",
        "role",
        server_default=None
    )


def downgrade():

    op.drop_column(
        "users",
        "role"
    )

    role_enum.drop(
        op.get_bind(),
        checkfirst=True
    )