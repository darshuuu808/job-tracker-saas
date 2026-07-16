import "./ApplicationTable.css";

function ApplicationTable({

    applications

}) {

    return (

        <table className="application-table">

            <thead>

                <tr>

                    <th>Company</th>

                    <th>Role</th>

                    <th>Status</th>

                    <th>Notes</th>

                </tr>

            </thead>

            <tbody>

                {

                    applications.map(

                        (app) => (

                            <tr key={app.id}>

                                <td>{app.company}</td>

                                <td>{app.role}</td>

                                <td>{app.status}</td>

                                <td>{app.notes}</td>

                            </tr>

                        )

                    )

                }

            </tbody>

        </table>

    );

}

export default ApplicationTable;