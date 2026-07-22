import { Link } from "react-router-dom";
import { Home, SearchX } from "lucide-react";

export default function NotFound() {

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">

            <div className="text-center max-w-lg">

                <SearchX
                    className="mx-auto mb-6 text-blue-600"
                    size={80}
                />

                <h1 className="text-6xl font-bold text-slate-800 dark:text-white">

                    404

                </h1>

                <h2 className="mt-4 text-2xl font-semibold text-slate-700 dark:text-slate-200">

                    Page Not Found

                </h2>

                <p className="mt-3 text-slate-500 dark:text-slate-400">

                    The page you're looking for doesn't exist or has been moved.

                </p>

                <Link
                    to="/"
                    className="inline-flex items-center gap-2 mt-8 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition"
                >

                    <Home size={18} />

                    Back to Dashboard

                </Link>

            </div>

        </div>

    );

}