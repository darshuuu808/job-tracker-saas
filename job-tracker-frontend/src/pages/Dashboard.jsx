import { useEffect } from "react";
import { Link } from "react-router-dom";
import { BarChart3 } from "lucide-react";

import useApplicationStore from "../store/applicationStore";

import AddApplicationForm from "../forms/AddApplicationForm";

import ApplicationTable from "../components/ApplicationTable/ApplicationTable";

import ThemeToggle from "../components/ThemeToggle";

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

    }, []);

    const filteredApplications =
        filter === "All"
            ? applications
            : applications.filter(
                (app) => app.status === filter
            );

    const total = applications.length;

    const applied =
        applications.filter(
            (a) => a.status === "Applied"
        ).length;

    const interview =
        applications.filter(
            (a) => a.status === "Interview"
        ).length;

    const offer =
        applications.filter(
            (a) => a.status === "Offer"
        ).length;

    const rejected =
        applications.filter(
            (a) => a.status === "Rejected"
        ).length;

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

        <div className="min-h-screen bg-background">

            <div className="max-w-7xl mx-auto p-8">

                {/* Header */}

                <div className="mb-8 flex items-center justify-between">

                    <div>

                        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">

                            Job Tracker Dashboard

                        </h1>

                        <p className="text-muted-foreground">

                            Manage all your job applications in one place.

                        </p>

                    </div>

                    <div className="flex items-center gap-3">

                        <Link
                            to="/analytics"
                            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
                        >

                            <BarChart3 size={18} />

                            Analytics

                        </Link>

                        <ThemeToggle />

                    </div>

                </div>

                {/* Stats */}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">

                    <Card>

                        <CardHeader>

                            <CardTitle>Total</CardTitle>

                        </CardHeader>

                        <CardContent>

                            <p className="text-3xl font-bold">

                                {total}

                            </p>

                        </CardContent>

                    </Card>

                    <Card>

                        <CardHeader>

                            <CardTitle>Applied</CardTitle>

                        </CardHeader>

                        <CardContent>

                            <p className="text-3xl font-bold text-blue-600">

                                {applied}

                            </p>

                        </CardContent>

                    </Card>

                    <Card>

                        <CardHeader>

                            <CardTitle>Interview</CardTitle>

                        </CardHeader>

                        <CardContent>

                            <p className="text-3xl font-bold text-orange-500">

                                {interview}

                            </p>

                        </CardContent>

                    </Card>

                    <Card>

                        <CardHeader>

                            <CardTitle>Offer</CardTitle>

                        </CardHeader>

                        <CardContent>

                            <p className="text-3xl font-bold text-green-600">

                                {offer}

                            </p>

                        </CardContent>

                    </Card>

                    <Card>

                        <CardHeader>

                            <CardTitle>Rejected</CardTitle>

                        </CardHeader>

                        <CardContent>

                            <p className="text-3xl font-bold text-red-500">

                                {rejected}

                            </p>

                        </CardContent>

                    </Card>

                </div>

                {/* Resume Upload */}

                <Card className="mb-8">

                    <CardHeader>

                        <CardTitle>

                            Resume Upload

                        </CardTitle>

                    </CardHeader>

                    <CardContent>

                        <ResumeUpload />

                    </CardContent>

                </Card>

                {/* NEW - Job Search */}

                <Card className="mb-8">

                    <CardHeader>

                        <CardTitle>

                            Job Search

                        </CardTitle>

                    </CardHeader>

                    <CardContent>

                        <JobSearchBar />

                    </CardContent>

                </Card>

                {/* Main Content */}

                <div className="grid lg:grid-cols-3 gap-8">

                    <div>

                        <AddApplicationForm />

                    </div>

                    <div className="lg:col-span-2">

                        <Card>

                            <CardHeader>

                                <CardTitle>

                                    Applications

                                </CardTitle>

                            </CardHeader>

                            <CardContent>

                                <div className="mb-6">

                                    <Select

                                        value={filter}

                                        onValueChange={setFilter}

                                    >

                                        <SelectTrigger className="w-64">

                                            <SelectValue placeholder="Filter by Status" />

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

                                <div className="rounded-lg border overflow-hidden">

                                    <ApplicationTable
                                        data={filteredApplications}
                                    />

                                </div>

                            </CardContent>

                        </Card>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default Dashboard;