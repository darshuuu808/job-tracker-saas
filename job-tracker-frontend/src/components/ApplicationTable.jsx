import { useMemo, useState } from "react";

import {

    flexRender,

    getCoreRowModel,

    getFilteredRowModel,

    getPaginationRowModel,

    getSortedRowModel,

    useReactTable

} from "@tanstack/react-table";

import {

    Table,

    TableBody,

    TableCell,

    TableHead,

    TableHeader,

    TableRow

} from "../ui/table";

import ExportButton from "../ExportButton";

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

    return (

        <div>

            <div className="flex justify-between items-center mb-4">

                <ExportButton

                    data={

                        table

                            .getFilteredRowModel()

                            .rows

                            .map(

                                row => row.original

                            )

                    }

                />

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

                        table.getHeaderGroups().map(

                            headerGroup => (

                                <TableRow key={headerGroup.id}>

                                    {

                                        headerGroup.headers.map(

                                            header => (

                                                <TableHead

                                                    key={header.id}

                                                    className="cursor-pointer"

                                                    onClick={

                                                        header.column.getToggleSortingHandler()

                                                    }

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

                        table.getRowModel().rows.length === 0 ?

                        (

                            <TableRow>

                                <TableCell

                                    colSpan={4}

                                    className="text-center py-5"

                                >

                                    No applications found

                                </TableCell>

                            </TableRow>

                        )

                        :

                        (

                            table.getRowModel().rows.map(

                                row => (

                                    <TableRow key={row.id}>

                                        {

                                            row.getVisibleCells().map(

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

            <div className="flex justify-between items-center mt-5">

                <button

                    onClick={() =>

                        table.previousPage()

                    }

                    disabled={

                        !table.getCanPreviousPage()

                    }

                    className="border rounded px-4 py-2 disabled:opacity-50"

                >

                    Previous

                </button>

                <span>

                    Page{" "}

                    {

                        table.getState().pagination.pageIndex + 1

                    }

                    {" "}of{" "}

                    {

                        table.getPageCount()

                    }

                </span>

                <button

                    onClick={() =>

                        table.nextPage()

                    }

                    disabled={

                        !table.getCanNextPage()

                    }

                    className="border rounded px-4 py-2 disabled:opacity-50"

                >

                    Next

                </button>

            </div>

        </div>

    );

}