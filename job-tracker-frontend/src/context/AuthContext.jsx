import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import {
    getProfile,
    login as loginService,
    logout as logoutService,
    register as registerService
} from "../services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const token = localStorage.getItem("access_token");

        if (!token) {

            setLoading(false);

            return;

        }

        getProfile()

            .then((profile) => {

                setUser(profile);

            })

            .catch(() => {

                localStorage.removeItem("access_token");

                localStorage.removeItem("refresh_token");

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

    const register = async (

        username,

        email,

        password

    ) => {

        await registerService(

            username,

            email,

            password

        );

        await login(

            email,

            password

        );

    };

    const logout = async () => {

        try {

            await logoutService();

        }

        catch {

            // Ignore logout errors

        }

        localStorage.removeItem("access_token");

        localStorage.removeItem("refresh_token");

        setUser(null);

    };

    return (

        <AuthContext.Provider

            value={{

                user,

                loading,

                login,

                register,

                logout,

                isAuthenticated: !!user

            }}

        >

            {children}

        </AuthContext.Provider>

    );

}

export const useAuth = () =>

    useContext(AuthContext);