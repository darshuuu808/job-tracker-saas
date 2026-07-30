import {
    ArrowRight,
    PlayCircle,
    Briefcase,
    Globe,
    BarChart3,
    CheckCircle2
} from "lucide-react";

import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";

function Hero() {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">

            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
            </div>

            <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 py-24 lg:flex-row lg:justify-between lg:px-8">

                <div className="max-w-2xl">

                    <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300">
                        🚀 AI Powered Job Search Platform
                    </span>

                    <h1 className="mt-8 text-5xl font-extrabold leading-tight tracking-tight text-slate-900 dark:text-white lg:text-6xl">
                        Track Every Job.
                        <br />
                        <span className="text-blue-600">
                            Land Every Opportunity.
                        </span>
                    </h1>

                    <p className="mt-8 text-lg leading-8 text-slate-600 dark:text-slate-300">
                        Organize job applications, upload resumes,
                        analyze your interview pipeline,
                        receive reminders,
                        and instantly save LinkedIn jobs using our browser extension.
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">

                        <Button asChild size="lg" className="h-12 px-8">
                            <Link to="/login">
                                Get Started
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>

                        <Button variant="outline" size="lg" className="h-12 px-8">
                            <PlayCircle className="mr-2 h-5 w-5" />
                            Live Demo
                        </Button>

                    </div>

                    <div className="mt-14 grid grid-cols-3 gap-6">

                        <div>
                            <h2 className="text-3xl font-bold">AI</h2>
                            <p className="text-sm text-slate-500">
                                Powered Search
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold">100%</h2>
                            <p className="text-sm text-slate-500">
                                Free Forever
                            </p>
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold">Browser</h2>
                            <p className="text-sm text-slate-500">
                                Extension
                            </p>
                        </div>

                    </div>

                </div>

                <div className="w-full max-w-xl">

                    <div className="rounded-3xl border bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">

                        <div className="mb-6 flex items-center justify-between">

                            <div>

                                <h3 className="font-semibold">
                                    Job Tracker Dashboard
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Smart Application Management
                                </p>

                            </div>

                            <div className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                                Live
                            </div>

                        </div>

                        <div className="space-y-4">

                            <div className="rounded-xl border p-4">

                                <div className="flex items-center gap-3">

                                    <Briefcase className="h-8 w-8 text-blue-600" />

                                    <div>

                                        <h4 className="font-semibold">
                                            Artificial Intelligence Intern
                                        </h4>

                                        <p className="text-sm text-slate-500">
                                            Nexal IIT
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="rounded-xl border p-4">

                                <div className="flex items-center gap-3">

                                    <Globe className="h-8 w-8 text-green-600" />

                                    <div>

                                        <h4 className="font-semibold">
                                            Browser Extension
                                        </h4>

                                        <p className="text-sm text-slate-500">
                                            One-click Job Capture
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="rounded-xl border p-4">

                                <div className="flex items-center gap-3">

                                    <BarChart3 className="h-8 w-8 text-purple-600" />

                                    <div>

                                        <h4 className="font-semibold">
                                            Analytics Dashboard
                                        </h4>

                                        <p className="text-sm text-slate-500">
                                            Interview Insights
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="rounded-xl bg-blue-600 p-5 text-white">

                                <div className="flex items-center gap-3">

                                    <CheckCircle2 />

                                    <div>

                                        <h4 className="font-semibold">
                                            Ready to Apply
                                        </h4>

                                        <p className="text-sm text-blue-100">
                                            Company and role automatically filled from LinkedIn.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default Hero;