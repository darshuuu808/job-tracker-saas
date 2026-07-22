import axios from "axios";

const API = "http://localhost:5000/api/notifications";

export const getNotifications = async () => {
    const response = await axios.get(API);
    return response.data;
};

export const markAsRead = async (id) => {
    return axios.patch(`${API}/${id}/read`);
};

export const markAllRead = async () => {
    return axios.patch(`${API}/read-all`);
};

export const notificationStream = () => {
    return new EventSource(`${API}/stream`);
};