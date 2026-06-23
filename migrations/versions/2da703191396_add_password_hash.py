"""add password hash

Revision ID: 2da703191396
Revises: 114098b3d852
Create Date: 2026-06-23 12:04:14.245676
"""

from alembic import op
import sqlalchemy as sa


revision = '2da703191396'
down_revision = '114098b3d852'
branch_labels = None
depends_on = None


def upgrade():

    with op.batch_alter_table(
        'users',
        schema=None
    ) as batch_op:

        batch_op.add_column(
            sa.Column(
                'password_hash',
                sa.String(length=255),
                nullable=True
            )
        )


def downgrade():

    with op.batch_alter_table(
        'users',
        schema=None
    ) as batch_op:

        batch_op.drop_column(
            'password_hash'
        )