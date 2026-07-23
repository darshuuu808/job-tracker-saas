import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

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
import { memo } from "react";
function ApplicationTable({

    data = []

}) {

    const { t } = useTranslation();

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

                header: t("company")

            },

            {

                accessorKey: "role",

                header: t("role")

            },

            {

                accessorKey: "status",

                header: t("status"),

                cell: ({ getValue }) =>

                    t(`status_${getValue()}`)

            },

            {

                accessorKey: "notes",

                header: t("notes"),

                cell: ({ getValue }) =>

                    getValue() || "-"

            }

        ],

        [t]

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

                    placeholder={t("searchTablePlaceholder")}

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

                                    {t("noApplicationsFound")}

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

                    {t("previous")}

                </button>

                <span>

                    {t("page")}{" "}

                    {

                        table.getState().pagination.pageIndex + 1

                    }

                    {" "}{t("of")}{" "}

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

                    {t("next")}

                </button>

            </div>

        </div>

    );

}

export default memo(ApplicationTable);