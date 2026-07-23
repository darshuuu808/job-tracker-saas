import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

import {
    getProfile,
    updateProfile,
    changePassword,
    updateWebhook,
    deleteAccount
} from "../services/profileService";

export default function Settings() {

    const { t } = useTranslation();

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

            toast.error(t("profileLoadFailed"));

        }
    };

    const saveProfile = async () => {

        try {

            await updateProfile({

                username: profile.username,

                email: profile.email,

                timezone: profile.timezone

            });

            toast.success(t("profileUpdated"));

        } catch {

            toast.error(t("profileUpdateFailed"));

        }

    };

    const savePassword = async () => {

        try {

            await changePassword(password);

            toast.success(t("passwordChanged"));

            setPassword({

                current_password: "",

                new_password: ""

            });

        } catch {

            toast.error(t("passwordChangeFailed"));

        }

    };

    const saveWebhook = async () => {

        try {

            await updateWebhook({

                webhook_url: profile.webhook_url

            });

            toast.success(t("webhookUpdated"));

        } catch {

            toast.error(t("webhookUpdateFailed"));

        }

    };

    const removeAccount = async () => {

        if (!window.confirm(t("confirmDeleteAccount")))
            return;

        try {

            await deleteAccount();

            localStorage.removeItem("token");

            window.location.href = "/login";

        } catch {

            toast.error(t("accountDeleteFailed"));

        }

    };

    return (

        <div className="max-w-4xl mx-auto p-8">

            <h1 className="text-3xl font-bold mb-8">
                {t("settings")}
            </h1>

            <div className="space-y-8">

                <div className="border rounded-xl p-6">

                    <h2 className="text-xl font-semibold mb-5">
                        {t("profile")}
                    </h2>

                    <input
                        className="border rounded w-full p-3 mb-4"
                        placeholder={t("username")}
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
                        placeholder={t("email")}
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
                        placeholder={t("timezone")}
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
                        {t("saveChanges")}
                    </button>

                </div>

                <div className="border rounded-xl p-6">

                    <h2 className="text-xl font-semibold mb-5">
                        {t("changePassword")}
                    </h2>

                    <input
                        type="password"
                        className="border rounded w-full p-3 mb-4"
                        placeholder={t("currentPassword")}
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
                        placeholder={t("newPassword")}
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
                        {t("changePassword")}
                    </button>

                </div>

                <div className="border rounded-xl p-6">

                    <h2 className="text-xl font-semibold mb-5">
                        {t("webhook")}
                    </h2>

                    <input
                        className="border rounded w-full p-3 mb-4"
                        placeholder={t("webhookUrl")}
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
                        {t("saveWebhook")}
                    </button>

                </div>

                <div className="border rounded-xl border-red-400 p-6">

                    <h2 className="text-xl font-semibold text-red-600 mb-5">
                        {t("dangerZone")}
                    </h2>

                    <button
                        onClick={removeAccount}
                        className="bg-red-600 text-white px-5 py-2 rounded"
                    >
                        {t("deleteAccount")}
                    </button>

                </div>

            </div>

        </div>

    );

}