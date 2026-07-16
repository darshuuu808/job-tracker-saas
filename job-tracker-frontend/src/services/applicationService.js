import API from "./api";

export const createApplication = async (application) => {

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

export const getApplications = async () => {

    const response = await API.get(

        "/api/v2/applications"

    );

    return response.data;

};