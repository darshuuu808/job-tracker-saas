import { Link } from "react-router-dom";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function ServerError() {

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">

            <div className="text-center max-w-lg">

                <AlertTriangle
                    className="mx-auto mb-6 text-red-500"
                    size={80}
                />

                <h1 className="text-6xl font-bold text-red-600">

                    500

                </h1>

                <h2 className="mt-4 text-2xl font-semibold text-slate-800 dark:text-white">

                    Internal Server Error

                </h2>

                <p className="mt-3 text-slate-500 dark:text-slate-400">

                    Something went wrong on our server. Please try again later.

                </p>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 mt-8 px-5 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white transition"
                >

                    <RefreshCw size={18} />

                    Go Home

                </Link>

            </div>

        </div>

    );

}