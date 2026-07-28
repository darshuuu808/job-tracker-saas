"""add is_active to user

Revision ID: 16eea9f4c2d4
Revises: 2e79b5859acc
Create Date: 2026-07-28 12:28:38.121790

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '16eea9f4c2d4'
down_revision = '2e79b5859acc'
branch_labels = None
depends_on = None


def upgrade():
    with op.batch_alter_table("users") as batch_op:
        batch_op.add_column(
            sa.Column(
                "is_active",
                sa.Boolean(),
                nullable=True
            )
        )

    op.execute(
        "UPDATE users SET is_active = TRUE"
    )

    with op.batch_alter_table("users") as batch_op:
        batch_op.alter_column(
            "is_active",
            existing_type=sa.Boolean(),
            nullable=False
        )


def downgrade():
    with op.batch_alter_table("users") as batch_op:
        batch_op.drop_column("is_active")