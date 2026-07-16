import API from "./api";

export const login = async (email, password) => {

    const response = await API.post(

        "/login",

        {

            email,

            password

        }

    );

    return response.data;

};

export const register = async (

    username,

    email,

    password

) => {

    const response = await API.post(

        "/register",

        {

            username,

            email,

            password

        }

    );

    return response.data;

};

export const getProfile = async () => {

    const response = await API.get(

        "/profile"

    );

    return response.data;

};

export const logout = async () => {

    const response = await API.post(

        "/logout"

    );

    return response.data;

};