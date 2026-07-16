import API from "./api";

// -------------------------
// Get Applications
// -------------------------

export const getApplications = async (

    page = 1,

    perPage = 10

) => {

    const response = await API.get(

        "/api/v2/applications",

        {

            params: {

                page,

                per_page: perPage

            }

        }

    );

    return response.data;

};

// -------------------------
// Create Application
// -------------------------

export const createApplication = async (

    application

) => {

    const response = await API.post(

        "/api/v2/applications",

        {

            company: application.company,

            role: application.role,

            notes: application.notes

        }

    );

    return response.data;

};

// -------------------------
// Update Application
// -------------------------

export const updateApplication = async (

    id,

    data

) => {

    const response = await API.patch(

        `/api/v2/applications/${id}`,

        data

    );

    return response.data;

};

// -------------------------
// Delete Application
// -------------------------

export const deleteApplication = async (

    id

) => {

    const response = await API.delete(

        `/api/v2/applications/${id}`

    );

    return response.data;

};