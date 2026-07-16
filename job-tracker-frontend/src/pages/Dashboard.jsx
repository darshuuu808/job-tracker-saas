import useApplications from "../hooks/useApplications";

import ApplicationTable from "../components/ApplicationTable/ApplicationTable";

function Dashboard() {

    const {

        applications,

        loading,

        error

    } = useApplications();

    if (loading)

        return <h2>Loading...</h2>;

    if (error)

        return <h2>{error}</h2>;

    return (

        <div>

            <h1>

                Job Applications

            </h1>

            <ApplicationTable

                applications={applications}

            />

        </div>

    );

}

export default Dashboard;