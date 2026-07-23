import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { LayoutDashboard, BarChart3 } from "lucide-react";

import API from "../services/api";

import ThemeToggle from "../components/ThemeToggle";

import AnalyticsCards from "../components/analytics/AnalyticsCards";
import StatusPieChart from "../components/analytics/StatusPieChart";
import ApplicationsBarChart from "../components/analytics/ApplicationsBarChart";
import AnalyticsSkeleton from "../components/analytics/AnalyticsSkeleton";

import {
    Card,
    CardHeader,
    CardTitle,
    CardContent
} from "@/components/ui/card";

export default function Analytics() {

    const { t } = useTranslation();

    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        async function loadAnalytics() {

            try {

                const res = await API.get("/api/analytics");

                setAnalytics(res.data);

            } catch (err) {

                console.error(err);

                setError(t("analyticsLoadFailed"));

            } finally {

                setLoading(false);

            }

        }

        loadAnalytics();

    }, [t]);

    if (loading) {

        return <AnalyticsSkeleton />;

    }

    if (error) {

        return (

            <div className="min-h-screen flex items-center justify-center">

                <h2 className="text-lg font-semibold text-red-500">

                    {error}

                </h2>

            </div>

        );

    }

    return (

        <div className="min-h-screen bg-background">

            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Header */}

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

                    <div>

                        <div className="flex items-center gap-3">

                            <BarChart3 className="h-9 w-9 text-primary" />

                            <div>

                                <h1 className="text-4xl font-bold">

                                    {t("analyticsDashboard")}

                                </h1>

                                <p className="text-muted-foreground mt-1">

                                    {t("monitorApplications")}

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="flex items-center gap-3">

                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 rounded-lg border bg-background px-4 py-2 shadow-sm hover:bg-accent transition"
                        >

                            <LayoutDashboard size={18} />

                            {t("dashboard")}

                        </Link>

                        <ThemeToggle />

                    </div>

                </div>

                {/* Statistics Cards */}

                <AnalyticsCards data={analytics} />

                {/* Empty State */}

                {analytics.total_applications === 0 ? (

                    <Card className="mt-10">

                        <CardContent className="py-16 text-center">

                            <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground mb-4" />

                            <h3 className="text-xl font-semibold">

                                {t("noAnalyticsAvailable")}

                            </h3>

                            <p className="text-muted-foreground mt-2">

                                {t("addApplicationsToSeeInsights")}

                            </p>

                        </CardContent>

                    </Card>

                ) : (

                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mt-10">

                        <Card className="shadow-sm">

                            <CardHeader>

                                <CardTitle>

                                    {t("statusDistribution")}

                                </CardTitle>

                            </CardHeader>

                            <CardContent className="h-[400px]">

                                <StatusPieChart
                                    data={analytics.status_distribution}
                                />

                            </CardContent>

                        </Card>

                        <Card className="shadow-sm">

                            <CardHeader>

                                <CardTitle>

                                    {t("weeklyApplications")}

                                </CardTitle>

                            </CardHeader>

                            <CardContent className="h-[400px]">

                                <ApplicationsBarChart
                                    data={analytics.applications_per_week}
                                />

                            </CardContent>

                        </Card>

                    </div>

                )}

            </div>

        </div>

    );

}