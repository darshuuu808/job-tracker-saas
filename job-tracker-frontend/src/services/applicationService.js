import axios from "axios";

const API = axios.create({

    baseURL: "http://127.0.0.1:5000/api/v2"

});

export const createApplication = async (application) => {

    const payload = {

        company: application.company,

        role: application.role,

        notes: application.notes

    };

    const response = await API.post(

        "/applications",

        payload

    );

    return response.data;

};

export const getApplications = async () => {

    const response = await API.get(

        "/applications"

    );

    return response.data;

};