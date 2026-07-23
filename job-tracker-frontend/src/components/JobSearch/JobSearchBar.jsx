import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import useDebounce from "../../hooks/useDebounce";
import { searchJobs } from "../../services/jobSearchService";

import JobList from "./JobList";

export default function JobSearchBar() {

    const { t } = useTranslation();

    const [query, setQuery] = useState("");

    const [jobs, setJobs] = useState([]);

    const [loading, setLoading] = useState(false);

    const debouncedQuery = useDebounce(
        query,
        500
    );

    useEffect(() => {

        if (!debouncedQuery.trim()) {

            setJobs([]);

            return;

        }

        async function fetchJobs() {

            try {

                setLoading(true);

                const data = await searchJobs(
                    debouncedQuery
                );

                setJobs(data);

            }

            catch (err) {

                console.error(err);

            }

            finally {

                setLoading(false);

            }

        }

        fetchJobs();

    }, [debouncedQuery]);

    return (

        <div className="space-y-4">

            <input

                type="text"

                placeholder={t("searchJobs")}

                value={query}

                onChange={(e) =>
                    setQuery(
                        e.target.value
                    )
                }

                className="w-full border rounded-lg p-3"

            />

            {loading && (

                <p>

                    {t("search")}...

                </p>

            )}

            {!loading && debouncedQuery.trim() && jobs.length === 0 && (

                <p className="text-muted-foreground">

                    {t("noJobsFound")}

                </p>

            )}

            <JobList jobs={jobs} />

        </div>

    );

}