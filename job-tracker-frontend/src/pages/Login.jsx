import { useState } from "react";

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

function Login() {

    const { login } = useAuth();

    const [

        email,

        setEmail

    ] = useState("");

    const [

        password,

        setPassword

    ] = useState("");

    const [

        error,

        setError

    ] = useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        try {

            await login(

                email,

                password

            );

        }

        catch (err) {

            setError(

                err.response?.data?.error ||

                "Login failed"

            );

        }

    };

    return (

        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">

            <Card className="w-full max-w-md shadow-xl">

                <CardHeader>

                    <CardTitle className="text-3xl">

                        Job Tracker

                    </CardTitle>

                    <CardDescription>

                        Sign in to continue

                    </CardDescription>

                </CardHeader>

                <CardContent>

                    <form

                        onSubmit={handleSubmit}

                        className="space-y-5"

                    >

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

                                placeholder="Enter your password"

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

                        >

                            Login

                        </Button>

                    </form>

                </CardContent>

            </Card>

        </div>

    );

}

export default Login;