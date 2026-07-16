import { useEffect, useState } from "react";

import {

    getApplications

} from "../services/applicationService";


const useApplications = () => {

    const [

        applications,

        setApplications

    ] = useState([]);

    const [

        loading,

        setLoading

    ] = useState(true);

    const [

        page,

        setPage

    ] = useState(1);

    const [

        totalPages,

        setTotalPages

    ] = useState(1);

    const perPage = 10;


    const fetchApplications = async () => {

        try {

            setLoading(true);

            const data = await getApplications(

                page,

                perPage

            );

            setApplications(

                data.applications
            );

            setTotalPages(

                data.pages
            );

        }

        catch (error) {

            console.error(

                error
            );

        }

        finally {

            setLoading(false);

        }

    };


    useEffect(() => {

        fetchApplications();

    }, [page]);


    return {

        applications,

        loading,

        page,

        totalPages,

        setPage,

        refresh: fetchApplications

    };

};


export default useApplications;