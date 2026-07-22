import api from "./api";

export const getProfile = () =>
    api.get("/profile");

export const updateProfile = (data) =>
    api.put("/profile", data);

export const changePassword = (data) =>
    api.put("/profile/password", data);

export const updateWebhook = (data) =>
    api.put("/profile/webhook", data);

export const deleteAccount = () =>
    api.delete("/profile");