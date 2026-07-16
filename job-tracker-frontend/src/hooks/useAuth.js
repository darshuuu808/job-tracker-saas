import { useState } from "react";

function useAuth() {

    const [

        token,

        setToken

    ] = useState(

        localStorage.getItem(

            "token"

        )

    );

    const login = (jwt) => {

        localStorage.setItem(

            "token",

            jwt

        );

        setToken(jwt);

    };

    const logout = () => {

        localStorage.removeItem(

            "token"

        );

        setToken(null);

    };

    return {

        token,

        login,

        logout,

        isAuthenticated: !!token

    };

}

export default useAuth;