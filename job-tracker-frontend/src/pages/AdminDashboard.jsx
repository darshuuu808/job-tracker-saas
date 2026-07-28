import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import adminService from "../services/adminService";

import AdminStatsCards from "../components/admin/AdminStatsCards";
import UserSearchBar from "../components/admin/UserSearchBar";
import UserTable from "../components/admin/UserTable";
import EmptyState from "../components/EmptyState";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const loadData = async () => {
    try {
      setLoading(true);

      const [usersData, statsData] = await Promise.all([
        adminService.getUsers(),
        adminService.getStats(),
      ]);

      setUsers(usersData);
      setStats(statsData);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleActivate = async (id) => {
    try {
      setActionLoading(id);

      await adminService.activateUser(id);

      toast.success("User activated successfully.");

      await loadData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to activate user.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDeactivate = async (id) => {
    try {
      setActionLoading(id);

      await adminService.deactivateUser(id);

      toast.success("User deactivated successfully.");

      await loadData();
    } catch (error) {
      console.error(error);
      toast.error("Failed to deactivate user.");
    } finally {
      setActionLoading(null);
    }
  };

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return users.filter(
      (user) =>
        user.username.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        user.role.toLowerCase().includes(query)
    );
  }, [users, search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h2 className="text-2xl font-semibold">
          Loading Admin Dashboard...
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-8 space-y-8">
      <div>
        <h1 className="text-4xl font-bold">
          Admin Dashboard
        </h1>

        <p className="text-muted-foreground mt-2">
          Manage platform users and monitor statistics.
        </p>
      </div>

      <AdminStatsCards stats={stats} />

      <UserSearchBar
        value={search}
        onChange={setSearch}
      />

      {filteredUsers.length === 0 ? (
        <EmptyState
          title="No Users Found"
          description="Try a different search keyword."
        />
      ) : (
        <UserTable
          users={filteredUsers}
          actionLoading={actionLoading}
          onActivate={handleActivate}
          onDeactivate={handleDeactivate}
        />
      )}
    </div>
  );
}