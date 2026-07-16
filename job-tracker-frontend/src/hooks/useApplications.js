import { useEffect, useState } from "react";

import {

    getApplications

} from "../services/applicationService";

function useApplications() {

    const [

        applications,

        setApplications

    ] = useState([]);

    const [

        loading,

        setLoading

    ] = useState(true);

    const [

        error,

        setError

    ] = useState(null);

    useEffect(() => {

        const fetchApplications = async () => {

            try {

                const data = await getApplications();

                setApplications(

                    data.applications

                );

            }

            catch (err) {

                setError(

                    err.response?.data?.error ||

                    err.message

                );

            }

            finally {

                setLoading(false);

            }

        };

        fetchApplications();

    }, []);

    return {

        applications,

        loading,

        error

    };

}

export default useApplications;