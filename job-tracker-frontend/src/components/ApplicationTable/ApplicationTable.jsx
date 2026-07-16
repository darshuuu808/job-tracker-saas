import "./ApplicationTable.css";

function ApplicationTable({

    applications

}) {

    if (

        applications.length === 0

    ) {

        return (

            <div className="empty-state">

                <h3>

                    No Applications Found

                </h3>

            </div>

        );

    }

    return (

        <table className="application-table">

            <thead>

                <tr>

                    <th>ID</th>

                    <th>Company</th>

                    <th>Role</th>

                    <th>Status</th>

                    <th>Notes</th>

                </tr>

            </thead>

            <tbody>

                {

                    applications.map(

                        (application) => (

                            <tr

                                key={

                                    application.id

                                }

                            >

                                <td>

                                    {

                                        application.id

                                    }

                                </td>

                                <td>

                                    {

                                        application.company

                                    }

                                </td>

                                <td>

                                    {

                                        application.role

                                    }

                                </td>

                                <td>

                                    <span

                                        className={`status ${application.status

                                            .replaceAll(

                                                " ",

                                                "-"

                                            )

                                            .toLowerCase()}`}

                                    >

                                        {

                                            application.status

                                        }

                                    </span>

                                </td>

                                <td>

                                    {

                                        application.notes ||

                                        "-"

                                    }

                                </td>

                            </tr>

                        )

                    )

                }

            </tbody>

        </table>

    );

}

export default ApplicationTable;