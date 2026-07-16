import { saveAs } from "file-saver";

export default function ExportButton({

    data = []

}) {

    const exportCSV = () => {

        if (data.length === 0) {

            alert("No applications to export.");

            return;

        }

        const headers = [

            "Company",

            "Role",

            "Status",

            "Notes"

        ];

        const rows = data.map(

            app => [

                app.company,

                app.role,

                app.status,

                app.notes || ""

            ]

        );

        const csv = [

            headers,

            ...rows

        ]

            .map(

                row =>

                    row.join(",")

            )

            .join("\n");

        const blob = new Blob(

            [

                csv

            ],

            {

                type: "text/csv;charset=utf-8"

            }

        );

        saveAs(

            blob,

            "applications.csv"

        );

    };

    return (

        <button

            onClick={exportCSV}

            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"

        >

            Export CSV

        </button>

    );

}