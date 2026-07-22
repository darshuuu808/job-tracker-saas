import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";

function ErrorFallback({ error, resetErrorBoundary }) {

    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100 dark:bg-slate-900">

            <div className="bg-white dark:bg-slate-800 shadow-xl rounded-xl p-8 max-w-lg text-center">

                <h1 className="text-3xl font-bold text-red-600 mb-4">

                    Oops! Something went wrong.

                </h1>

                <p className="text-slate-600 dark:text-slate-300 mb-4">

                    The application encountered an unexpected error.

                </p>

                <pre className="bg-slate-100 dark:bg-slate-900 rounded p-3 text-left overflow-auto text-sm mb-6">

                    {error.message}

                </pre>

                <button
                    onClick={resetErrorBoundary}
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >

                    Try Again

                </button>

            </div>

        </div>

    );

}

export default function ErrorBoundary({ children }) {

    return (

        <ReactErrorBoundary
            FallbackComponent={ErrorFallback}
            onReset={() => window.location.reload()}
        >

            {children}

        </ReactErrorBoundary>

    );

}