import { useMemo, useState } from "react";

import {
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable
} from "@tanstack/react-table";

import { saveAs } from "file-saver";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "../ui/table";

export default function ApplicationTable({

    data = []

}) {

    const [

        sorting,

        setSorting

    ] = useState([]);

    const [

        globalFilter,

        setGlobalFilter

    ] = useState("");

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

                header: "Notes",

                cell: ({ getValue }) =>

                    getValue() || "-"

            }

        ],

        []

    );

    const table = useReactTable({

        data,

        columns,

        state: {

            sorting,

            globalFilter

        },

        onSortingChange: setSorting,

        onGlobalFilterChange: setGlobalFilter,

        getCoreRowModel: getCoreRowModel(),

        getSortedRowModel: getSortedRowModel(),

        getFilteredRowModel: getFilteredRowModel(),

        getPaginationRowModel: getPaginationRowModel(),

        initialState: {

            pagination: {

                pageSize: 10

            }

        }

    });

    const exportCSV = () => {

        const rows = table

            .getFilteredRowModel()

            .rows

            .map(

                row => row.original

            );

        if (rows.length === 0) {

            alert(

                "No applications to export."

            );

            return;

        }

        const headers = [

            "Company",

            "Role",

            "Status",

            "Notes"

        ];

        const csvRows = rows.map(

            app => [

                app.company,

                app.role,

                app.status,

                app.notes || ""

            ]

        );

        const csv = [

            headers,

            ...csvRows

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

        <div>

            <div className="flex justify-between items-center mb-5 gap-4">

                <button

                    onClick={exportCSV}

                    className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"

                >

                    Export CSV

                </button>

                <input

                    type="text"

                    placeholder="Search company, role or status..."

                    value={globalFilter}

                    onChange={(e) =>

                        setGlobalFilter(

                            e.target.value

                        )

                    }

                    className="border rounded-md px-3 py-2 w-80"

                />

            </div>

            <Table>

                <TableHeader>

                    {

                        table

                            .getHeaderGroups()

                            .map(

                                headerGroup => (

                                    <TableRow key={headerGroup.id}>

                                        {

                                            headerGroup.headers.map(

                                                header => (

                                                    <TableHead

                                                        key={header.id}

                                                        onClick={

                                                            header.column.getToggleSortingHandler()

                                                        }

                                                        className="cursor-pointer select-none"

                                                    >

                                                        {

                                                            flexRender(

                                                                header.column.columnDef.header,

                                                                header.getContext()

                                                            )

                                                        }

                                                        {{

                                                            asc: " ↑",

                                                            desc: " ↓"

                                                        }[

                                                            header.column.getIsSorted()

                                                        ] ?? ""}

                                                    </TableHead>

                                                )

                                            )

                                        }

                                    </TableRow>

                                )

                            )

                    }

                </TableHeader>

                <TableBody>

                    {

                        table

                            .getRowModel()

                            .rows

                            .length === 0 ?

                            (

                                <TableRow>

                                    <TableCell

                                        colSpan={4}

                                        className="text-center py-6"

                                    >

                                        No applications found.

                                    </TableCell>

                                </TableRow>

                            )

                            :

                            (

                                table

                                    .getRowModel()

                                    .rows

                                    .map(

                                        row => (

                                            <TableRow key={row.id}>

                                                {

                                                    row

                                                        .getVisibleCells()

                                                        .map(

                                                            cell => (

                                                                <TableCell key={cell.id}>

                                                                    {

                                                                        flexRender(

                                                                            cell.column.columnDef.cell,

                                                                            cell.getContext()

                                                                        )

                                                                    }

                                                                </TableCell>

                                                            )

                                                        )

                                                }

                                            </TableRow>

                                        )

                                    )

                            )

                    }

                </TableBody>

            </Table>

            <div className="flex justify-between items-center mt-6">

                <button

                    onClick={() =>

                        table.previousPage()

                    }

                    disabled={

                        !table.getCanPreviousPage()

                    }

                    className="px-4 py-2 border rounded-md disabled:opacity-40"

                >

                    Previous

                </button>

                <span>

                    Page{" "}

                    <strong>

                        {

                            table

                                .getState()

                                .pagination

                                .pageIndex + 1

                        }

                        {" "}of{" "}

                        {

                            table

                                .getPageCount()

                        }

                    </strong>

                </span>

                <button

                    onClick={() =>

                        table.nextPage()

                    }

                    disabled={

                        !table.getCanNextPage()

                    }

                    className="px-4 py-2 border rounded-md disabled:opacity-40"

                >

                    Next

                </button>

            </div>

        </div>

    );

}