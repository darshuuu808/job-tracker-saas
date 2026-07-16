import { useMemo, useState } from "react";

import ApplicationTable from "../components/ApplicationTable";
import useApplications from "../hooks/useApplications";

export default function Applications() {

    const {

        applications,

        loading

    } = useApplications();

    const [

        sorting,

        setSorting

    ] = useState([]);

    const columns = useMemo(

        () => [

            {

                accessorKey: "company",

                header: "Company"

            },

            {

                accessorKey: "role",

                header: "Role"

            },

            {

                accessorKey: "status",

                header: "Status"

            },

            {

                accessorKey: "notes",

                header: "Notes"

            }

        ],

        []

    );

    if (loading) {

        return <h2>Loading...</h2>;

    }

    return (

        <div
            style={{
                padding: "30px"
            }}
        >

            <h1>

                Job Applications

            </h1>

            <ApplicationTable

                data={applications}

                columns={columns}

                sorting={sorting}

                setSorting={setSorting}

            />

        </div>

    );

}