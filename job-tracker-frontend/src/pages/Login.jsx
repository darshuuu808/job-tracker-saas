import { useState } from "react";

import { useAuth } from "../context/AuthContext";

function Login() {

    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            await login(email, password);

            window.location.href = "/";

        }

        catch (err) {

            setError(

                err.response?.data?.error ||

                "Login failed"

            );

        }

    };

    return (

        <div
            style={{
                width: "350px",
                margin: "100px auto"
            }}
        >

            <h2>Login</h2>

            <form onSubmit={handleSubmit}>

                <input

                    type="email"

                    placeholder="Email"

                    value={email}

                    onChange={(e) =>

                        setEmail(e.target.value)

                    }

                    style={{

                        width: "100%",

                        padding: "10px",

                        marginBottom: "10px"

                    }}

                />

                <input

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={(e) =>

                        setPassword(e.target.value)

                    }

                    style={{

                        width: "100%",

                        padding: "10px",

                        marginBottom: "10px"

                    }}

                />

                {error && (

                    <p style={{ color: "red" }}>

                        {error}

                    </p>

                )}

                <button

                    type="submit"

                    style={{

                        width: "100%",

                        padding: "10px"

                    }}

                >

                    Login

                </button>

            </form>

        </div>

    );

}

export default Login;