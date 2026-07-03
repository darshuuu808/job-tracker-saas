"""Fix status enum values

Revision ID: xxxxxxxxxxxx
Revises: <previous_revision_id>
Create Date: 2026-07-03
"""

from alembic import op


# revision identifiers
revision = "4f8c9c4e0f21"
down_revision = "79f70c78f9b4"
branch_labels = None
depends_on = None


def upgrade():

    op.execute("""

        ALTER TYPE status RENAME TO status_old;

    """)

    op.execute("""

        CREATE TYPE status AS ENUM (

            'Applied',

            'Phone Screen',

            'Interview',

            'Offer',

            'Rejected'

        );

    """)

    op.execute("""

        ALTER TABLE job_applications

        ALTER COLUMN status

        TYPE status

        USING (

            CASE status::text

                WHEN 'APPLIED'
                    THEN 'Applied'

                WHEN 'PHONE_SCREEN'
                    THEN 'Phone Screen'

                WHEN 'INTERVIEW'
                    THEN 'Interview'

                WHEN 'OFFER'
                    THEN 'Offer'

                WHEN 'REJECTED'
                    THEN 'Rejected'

            END

        )::status;

    """)

    op.execute("""

        DROP TYPE status_old;

    """)


def downgrade():

    op.execute("""

        ALTER TYPE status RENAME TO status_new;

    """)

    op.execute("""

        CREATE TYPE status AS ENUM (

            'APPLIED',

            'PHONE_SCREEN',

            'INTERVIEW',

            'OFFER',

            'REJECTED'

        );

    """)

    op.execute("""

        ALTER TABLE job_applications

        ALTER COLUMN status

        TYPE status

        USING (

            CASE status::text

                WHEN 'Applied'
                    THEN 'APPLIED'

                WHEN 'Phone Screen'
                    THEN 'PHONE_SCREEN'

                WHEN 'Interview'
                    THEN 'INTERVIEW'

                WHEN 'Offer'
                    THEN 'OFFER'

                WHEN 'Rejected'
                    THEN 'REJECTED'

            END

        )::status;

    """)

    op.execute("""

        DROP TYPE status_new;

    """)