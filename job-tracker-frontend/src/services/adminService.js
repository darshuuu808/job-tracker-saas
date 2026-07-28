import api from "./api";

const adminService = {
  async getUsers() {
    const response = await api.get("/admin/users");
    return response.data;
  },

  async activateUser(userId) {
    const response = await api.patch(
      `/admin/users/${userId}/activate`
    );
    return response.data;
  },

  async deactivateUser(userId) {
    const response = await api.patch(
      `/admin/users/${userId}/deactivate`
    );
    return response.data;
  },

  async getStats() {
    const response = await api.get("/admin/stats");
    return response.data;
  },
};

export default adminService;