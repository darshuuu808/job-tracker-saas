import LanguageSwitcher from "../components/LanguageSwitcher/LanguageSwitcher";
import { useEffect, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { BarChart3, Settings as SettingsIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import useApplicationStore from "../store/applicationStore";

import AddApplicationForm from "../forms/AddApplicationForm";

import ApplicationTable from "../components/ApplicationTable/ApplicationTable";
import EmptyState from "../components/EmptyState";
import ThemeToggle from "../components/ThemeToggle";
import NotificationBell from "../components/NotificationBell";

import ResumeUpload from "../components/FileUpload/ResumeUpload";

import JobSearchBar from "../components/JobSearch/JobSearchBar";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";

function Dashboard() {

    const { t } = useTranslation();

    const applications = useApplicationStore(
        (state) => state.applications
    );

    const loading = useApplicationStore(
        (state) => state.loading
    );

    const error = useApplicationStore(
        (state) => state.error
    );

    const filter = useApplicationStore(
        (state) => state.filter
    );

    const fetchApplications = useApplicationStore(
        (state) => state.fetchApplications
    );

    const setFilter = useApplicationStore(
        (state) => state.setFilter
    );

    useEffect(() => {

        fetchApplications();

    }, [fetchApplications]);

    const handleFilterChange = useCallback(
        (value) => {
            setFilter(value);
        },

        [setFilter]
    );

    const filteredApplications = useMemo(() => {


        return filter === "All"
            ? applications
            : applications.filter(
                  (app) => app.status === filter
              );

    }, [applications, filter]);

    const {
        total,

        applied,

        interview,

        offer,

        rejected

    } = useMemo(() => ({

        total: applications.length,

        applied: applications.filter(
            (a) => a.status === "Applied"
        ).length,

        interview: applications.filter(
            (a) => a.status === "Interview"
        ).length,

        offer: applications.filter(
            (a) => a.status === "Offer"
        ).length,

        rejected: applications.filter(
            (a) => a.status === "Rejected"
        ).length

    }), [applications]);

    if (loading) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <h2>Loading...</h2>

            </div>

        );

    }

    if (error) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <h2 className="text-red-500">

                    {error}

                </h2>

            </div>

        );

    }

    return (

        <main
            id="main-content"
            className="min-h-screen bg-background"
        >

            <div className="max-w-7xl mx-auto p-8">

                {/* Header */}

                <header className="mb-8 flex items-center justify-between">

                    <div>

                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">

                            {t("dashboard")}

                        </h1>

                        <p className="text-muted-foreground">

                            {t("manageApplications")}

                        </p>

                    </div>

                    <nav
                        aria-label="Dashboard navigation"
                        className="flex items-center gap-5"
                    >

                        <NotificationBell />

                        <LanguageSwitcher />

                        <Link
                            to="/analytics"
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                        >

                            <BarChart3 size={18} />

                            {t("analytics")}

                        </Link>

                        <Link
                            to="/settings"
                            className="inline-flex items-center gap-2 rounded-lg bg-slate-700 px-4 py-2 text-white hover:bg-slate-800 transition"
                        >

                            <SettingsIcon size={18} />

                            {t("settings")}

                        </Link>

                        <ThemeToggle />

                    </nav>

                </header>

                {/* Stats */}

                <section
                    aria-labelledby="stats-heading"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8"
                >

                    <h2
                        id="stats-heading"
                        className="sr-only"
                    >
                        Application Statistics
                    </h2>

                    <Card>

                        <CardHeader>

                            <CardTitle>{t("total")}</CardTitle>

                        </CardHeader>

                        <CardContent>

                            <p className="text-3xl font-bold">

                                {total}

                            </p>

                        </CardContent>

                    </Card>

                    <Card>

                        <CardHeader>

                            <CardTitle>{t("applied")}</CardTitle>

                        </CardHeader>

                        <CardContent>

                            <p className="text-3xl font-bold text-blue-600">

                                {applied}

                            </p>

                        </CardContent>

                    </Card>

                    <Card>

                        <CardHeader>

                            <CardTitle>{t("interview")}</CardTitle>

                        </CardHeader>

                        <CardContent>

                            <p className="text-3xl font-bold text-orange-500">

                                {interview}

                            </p>

                        </CardContent>

                    </Card>

                    <Card>

                        <CardHeader>

                            <CardTitle>{t("offer")}</CardTitle>

                        </CardHeader>

                        <CardContent>

                            <p className="text-3xl font-bold text-green-600">

                                {offer}

                            </p>

                        </CardContent>

                    </Card>

                    <Card>

                        <CardHeader>

                            <CardTitle>{t("rejected")}</CardTitle>

                        </CardHeader>

                        <CardContent>

                            <p className="text-3xl font-bold text-red-500">

                                {rejected}

                            </p>

                        </CardContent>

                    </Card>

                </section>

                {/* Resume Upload */}

                <section
                    aria-labelledby="resume-upload-heading"
                >

                    <Card className="mb-8">

                        <CardHeader>

                            <CardTitle id="resume-upload-heading">

                                {t("resumeUpload")}

                            </CardTitle>

                        </CardHeader>

                        <CardContent>

                            <ResumeUpload />

                        </CardContent>

                    </Card>

                </section>

                {/* Job Search */}

                <section
                    aria-labelledby="job-search-heading"
                >

                    <Card className="mb-8">

                        <CardHeader>

                            <CardTitle id="job-search-heading">

                                {t("jobSearch")}

                            </CardTitle>

                        </CardHeader>

                        <CardContent>

                            <JobSearchBar />

                        </CardContent>

                    </Card>

                </section>

                {/* Main Content */}

                <section
                    aria-labelledby="applications-heading"
                    className="grid lg:grid-cols-3 gap-8"
                >

                    <aside>

                        <AddApplicationForm />

                    </aside>

                    <div className="lg:col-span-2">

                        <Card>

                            <CardHeader>

                                <CardTitle id="applications-heading">

                                    {t("applications")}

                                </CardTitle>

                            </CardHeader>

                            <CardContent>

                                <div className="mb-6">

                                    <Label
                                        htmlFor="status-filter"
                                        className="sr-only"
                                    >
                                        Filter applications by status
                                    </Label>

                                    <Select
                                        value={filter}
                                        onValueChange={handleFilterChange}
                                    >

                                        <SelectTrigger
                                            id="status-filter"
                                            aria-label="Filter applications by status"
                                            className="w-64"
                                        >

                                            <SelectValue
                                                placeholder={t("filterStatus")}
                                            />

                                        </SelectTrigger>

                                        <SelectContent>

                                            <SelectItem value="All">
                                                All
                                            </SelectItem>

                                            <SelectItem value="Applied">
                                                Applied
                                            </SelectItem>

                                            <SelectItem value="Phone Screen">
                                                Phone Screen
                                            </SelectItem>

                                            <SelectItem value="Interview">
                                                Interview
                                            </SelectItem>

                                            <SelectItem value="Offer">
                                                Offer
                                            </SelectItem>

                                            <SelectItem value="Rejected">
                                                Rejected
                                            </SelectItem>

                                        </SelectContent>

                                    </Select>

                                </div>
{
    filteredApplications.length === 0 ? (

        <EmptyState
            title="No Applications Yet"
            description="Start by adding your first job application."
        />

    ) : (

        <div className="rounded-lg border overflow-hidden">

            <ApplicationTable
                data={filteredApplications}
            />

        </div>

    )
}

                            </CardContent>

                        </Card>

                    </div>

                </section>

            </div>

        </main>

    );

}

export default Dashboard;