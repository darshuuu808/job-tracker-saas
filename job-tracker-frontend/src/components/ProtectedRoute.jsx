import { useAuth } from "../context/AuthContext";

import Login from "../pages/Login";

function ProtectedRoute({

    children

}) {

    const {

        loading,

        isAuthenticated

    } = useAuth();

    if (loading)

        return <h2>Loading...</h2>;

    if (!isAuthenticated)

        return <Login />;

    return children;

}

export default ProtectedRoute;