import { useEffect } from "react";

import useApplicationStore from "../store/applicationStore";

import AddApplicationForm from "../forms/AddApplicationForm";

import ApplicationTable from "../components/ApplicationTable/ApplicationTable";

function Dashboard() {

    const applications = useApplicationStore(

        (state) => state.applications

    );

    const loading = useApplicationStore(

        (state) => state.loading

    );

    const error = useApplicationStore(

        (state) => state.error

    );

    const filter = useApplicationStore(

        (state) => state.filter

    );

    const page = useApplicationStore(

        (state) => state.page

    );

    const perPage = useApplicationStore(

        (state) => state.perPage

    );

    const fetchApplications = useApplicationStore(

        (state) => state.fetchApplications

    );

    const setFilter = useApplicationStore(

        (state) => state.setFilter

    );

    const setPage = useApplicationStore(

        (state) => state.setPage

    );

    useEffect(() => {

        fetchApplications();

    }, []);

    // -----------------------------
    // Derived State
    // -----------------------------

    const filteredApplications =

        filter === "All"

            ? applications

            : applications.filter(

                (app) =>

                    app.status === filter

            );

    const totalPages = Math.max(

        1,

        Math.ceil(

            filteredApplications.length /

            perPage

        )

    );

    const paginatedApplications =

        filteredApplications.slice(

            (page - 1) * perPage,

            page * perPage

        );

    if (loading) {

        return (

            <h2>

                Loading applications...

            </h2>

        );

    }

    if (error) {

        return (

            <h2>

                {error}

            </h2>

        );

    }

    return (

        <div

            style={{

                maxWidth: "1200px",

                margin: "0 auto",

                padding: "30px"

            }}

        >

            <h1>

                Job Tracker Dashboard

            </h1>

            <AddApplicationForm />

            <div

                style={{

                    marginTop: "30px",

                    marginBottom: "20px"

                }}

            >

                <label>

                    Filter by Status

                </label>

                <br />

                <select

                    value={filter}

                    onChange={(e) =>

                        setFilter(

                            e.target.value

                        )

                    }

                    style={{

                        width: "250px",

                        padding: "8px",

                        marginTop: "8px"

                    }}

                >

                    <option value="All">

                        All

                    </option>

                    <option value="Applied">

                        Applied

                    </option>

                    <option value="Phone Screen">

                        Phone Screen

                    </option>

                    <option value="Interview">

                        Interview

                    </option>

                    <option value="Offer">

                        Offer

                    </option>

                    <option value="Rejected">

                        Rejected

                    </option>

                </select>

            </div>

            <ApplicationTable

                applications={

                    paginatedApplications

                }

            />

            <div

                style={{

                    display: "flex",

                    justifyContent: "center",

                    alignItems: "center",

                    gap: "20px",

                    marginTop: "30px"

                }}

            >

                <button

                    onClick={() =>

                        setPage(

                            Math.max(

                                1,

                                page - 1

                            )

                        )

                    }

                    disabled={

                        page === 1

                    }

                >

                    Previous

                </button>

                <h3>

                    Page {page} of {totalPages}

                </h3>

                <button

                    onClick={() =>

                        setPage(

                            Math.min(

                                totalPages,

                                page + 1

                            )

                        )

                    }

                    disabled={

                        page === totalPages

                    }

                >

                    Next

                </button>

            </div>

        </div>

    );

}

export default Dashboard;