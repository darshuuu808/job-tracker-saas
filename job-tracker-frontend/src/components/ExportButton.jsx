import { useTranslation } from "react-i18next";
import { saveAs } from "file-saver";

export default function ExportButton({

    data = []

}) {

    const { t } = useTranslation();

    const exportCSV = () => {

        if (data.length === 0) {

            alert(t("noApplicationsToExport"));

            return;

        }

        const headers = [

            t("company"),

            t("role"),

            t("status"),

            t("notes")

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

            data-testid="export-button"

            onClick={exportCSV}

            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"

        >

            {t("exportCSV")}

        </button>

    );

}