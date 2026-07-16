import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function App() {

    if (

        window.location.pathname === "/login"

    ) {

        return <Login />;

    }

    return <Dashboard />;

}

export default App;