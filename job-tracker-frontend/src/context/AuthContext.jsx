import {

    createContext,

    useContext,

    useEffect,

    useState

} from "react";

import {

    getProfile,

    login as loginService,

    logout as logoutService

} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({

    children

}) {

    const [

        user,

        setUser

    ] = useState(null);

    const [

        loading,

        setLoading

    ] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem(

            "access_token"

        );

        if (!token) {

            setLoading(false);

            return;

        }

        getProfile()

            .then(setUser)

            .catch(() => {

                localStorage.removeItem(

                    "access_token"

                );

            })

            .finally(() => {

                setLoading(false);

            });

    }, []);

    const login = async (

        email,

        password

    ) => {

        const tokens = await loginService(

            email,

            password

        );

        localStorage.setItem(

            "access_token",

            tokens.access_token

        );

        localStorage.setItem(

            "refresh_token",

            tokens.refresh_token

        );

        const profile = await getProfile();

        setUser(profile);

    };

    const logout = async () => {

        try {

            await logoutService();

        }

        catch {

        }

        localStorage.removeItem(

            "access_token"

        );

        localStorage.removeItem(

            "refresh_token"

        );

        setUser(null);

    };

    return (

        <AuthContext.Provider

            value={{

                user,

                login,

                logout,

                loading,

                isAuthenticated: !!user

            }}

        >

            {

                children

            }

        </AuthContext.Provider>

    );

}

export const useAuth = () =>

    useContext(

        AuthContext

    );