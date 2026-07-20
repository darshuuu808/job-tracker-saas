import API from "./api";

export const searchJobs = async (
    query,
    page = 1
) => {

    const response = await API.get(
        "/api/jobs/search",
        {
            params: {
                q: query,
                page
            }
        }
    );

    return response.data;

};