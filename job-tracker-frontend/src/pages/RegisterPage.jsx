import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card";

function RegisterPage() {

    const { register } = useAuth();

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setLoading(true);

        try {

            await register(

                username,

                email,

                password

            );

        }

        catch (err) {

            setError(

                err.response?.data?.error ||

                "Registration failed"

            );

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">

            <Card className="w-full max-w-md shadow-xl">

                <CardHeader>

                    <CardTitle className="text-3xl">

                        Create Account

                    </CardTitle>

                    <CardDescription>

                        Start tracking your job applications for free.

                    </CardDescription>

                </CardHeader>

                <CardContent>

                    <form

                        onSubmit={handleSubmit}

                        className="space-y-5"

                    >

                        <div className="space-y-2">

                            <label className="text-sm font-medium">

                                Username

                            </label>

                            <Input

                                type="text"

                                placeholder="John Doe"

                                value={username}

                                onChange={(e) =>

                                    setUsername(

                                        e.target.value

                                    )

                                }

                                required

                            />

                        </div>

                        <div className="space-y-2">

                            <label className="text-sm font-medium">

                                Email

                            </label>

                            <Input

                                type="email"

                                placeholder="you@example.com"

                                value={email}

                                onChange={(e) =>

                                    setEmail(

                                        e.target.value

                                    )

                                }

                                required

                            />

                        </div>

                        <div className="space-y-2">

                            <label className="text-sm font-medium">

                                Password

                            </label>

                            <Input

                                type="password"

                                placeholder="Create a password"

                                value={password}

                                onChange={(e) =>

                                    setPassword(

                                        e.target.value

                                    )

                                }

                                required

                            />

                        </div>

                        {

                            error && (

                                <div className="rounded-md border border-red-300 bg-red-50 p-3">

                                    <p className="text-sm text-red-600">

                                        {error}

                                    </p>

                                </div>

                            )

                        }

                        <Button

                            type="submit"

                            className="w-full"

                            disabled={loading}

                        >

                            {

                                loading

                                    ? "Creating Account..."

                                    : "Create Account"

                            }

                        </Button>

                    </form>

                    <div className="mt-6 border-t pt-6 text-center">

                        <p className="text-sm text-slate-600">

                            Already have an account?

                        </p>

                        <Link

                            to="/login"

                            className="mt-2 inline-block font-medium text-blue-600 hover:underline"

                        >

                            Sign In →

                        </Link>

                    </div>

                </CardContent>

            </Card>

        </div>

    );

}

export default RegisterPage;