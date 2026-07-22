import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
    getProfile,
    updateProfile,
    changePassword,
    updateWebhook,
    deleteAccount
} from "../services/profileService";

export default function Settings() {

    const [profile, setProfile] = useState({
        username: "",
        email: "",
        timezone: "",
        webhook_url: ""
    });

    const [password, setPassword] = useState({
        current_password: "",
        new_password: ""
    });

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {

            const res = await getProfile();

            setProfile(res.data);

        } catch {

            toast.error("Failed to load profile");

        }
    };

    const saveProfile = async () => {

        try {

            await updateProfile({

                username: profile.username,

                email: profile.email,

                timezone: profile.timezone

            });

            toast.success("Profile updated");

        } catch {

            toast.error("Failed to update profile");

        }

    };

    const savePassword = async () => {

        try {

            await changePassword(password);

            toast.success("Password changed");

            setPassword({

                current_password: "",

                new_password: ""

            });

        } catch {

            toast.error("Failed to change password");

        }

    };

    const saveWebhook = async () => {

        try {

            await updateWebhook({

                webhook_url: profile.webhook_url

            });

            toast.success("Webhook updated");

        } catch {

            toast.error("Failed to update webhook");

        }

    };

    const removeAccount = async () => {

        if (!window.confirm("Delete your account permanently?"))
            return;

        try {

            await deleteAccount();

            localStorage.removeItem("token");

            window.location.href = "/login";

        } catch {

            toast.error("Failed to delete account");

        }

    };

    return (

        <div className="max-w-4xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                Settings
            </h1>

            <div className="space-y-8">

                <div className="border rounded-xl p-6">

                    <h2 className="text-xl font-semibold mb-5">
                        Profile
                    </h2>

                    <input
                        className="border rounded w-full p-3 mb-4"
                        placeholder="Username"
                        value={profile.username}
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                username: e.target.value
                            })
                        }
                    />

                    <input
                        className="border rounded w-full p-3 mb-4"
                        placeholder="Email"
                        value={profile.email}
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                email: e.target.value
                            })
                        }
                    />

                    <input
                        className="border rounded w-full p-3 mb-4"
                        placeholder="Timezone"
                        value={profile.timezone}
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                timezone: e.target.value
                            })
                        }
                    />

                    <button
                        onClick={saveProfile}
                        className="bg-blue-600 text-white px-5 py-2 rounded"
                    >
                        Save Profile
                    </button>

                </div>

                <div className="border rounded-xl p-6">

                    <h2 className="text-xl font-semibold mb-5">
                        Change Password
                    </h2>

                    <input
                        type="password"
                        className="border rounded w-full p-3 mb-4"
                        placeholder="Current Password"
                        value={password.current_password}
                        onChange={(e) =>
                            setPassword({
                                ...password,
                                current_password: e.target.value
                            })
                        }
                    />

                    <input
                        type="password"
                        className="border rounded w-full p-3 mb-4"
                        placeholder="New Password"
                        value={password.new_password}
                        onChange={(e) =>
                            setPassword({
                                ...password,
                                new_password: e.target.value
                            })
                        }
                    />

                    <button
                        onClick={savePassword}
                        className="bg-green-600 text-white px-5 py-2 rounded"
                    >
                        Change Password
                    </button>

                </div>

                <div className="border rounded-xl p-6">

                    <h2 className="text-xl font-semibold mb-5">
                        Webhook
                    </h2>

                    <input
                        className="border rounded w-full p-3 mb-4"
                        placeholder="Webhook URL"
                        value={profile.webhook_url || ""}
                        onChange={(e) =>
                            setProfile({
                                ...profile,
                                webhook_url: e.target.value
                            })
                        }
                    />

                    <button
                        onClick={saveWebhook}
                        className="bg-purple-600 text-white px-5 py-2 rounded"
                    >
                        Save Webhook
                    </button>

                </div>

                <div className="border rounded-xl border-red-400 p-6">

                    <h2 className="text-xl font-semibold text-red-600 mb-5">
                        Danger Zone
                    </h2>

                    <button
                        onClick={removeAccount}
                        className="bg-red-600 text-white px-5 py-2 rounded"
                    >
                        Delete Account
                    </button>

                </div>

            </div>

        </div>

    );

}