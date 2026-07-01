"""token blacklist

Revision ID: 81c06288e26a
Revises: 2da703191396
Create Date: 2026-06-24 11:09:38.156257

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "81c06288e26a"
down_revision = "2da703191396"
branch_labels = None
depends_on = None


def upgrade():

    op.create_table(
        "token_blocklist",

        sa.Column(
            "id",
            sa.Integer(),
            nullable=False
        ),

        sa.Column(
            "jti",
            sa.String(length=255),
            nullable=False
        ),

        sa.PrimaryKeyConstraint(
            "id"
        ),

        sa.UniqueConstraint(
            "jti"
        )
    )


def downgrade():

    op.drop_table(
        "token_blocklist"
    )