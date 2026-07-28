import { Button } from "../ui/button";
import UserStatusBadge from "./UserStatusBadge";

export default function UserRow({
  user,
  actionLoading,
  onActivate,
  onDeactivate,
}) {
  const isLoading = actionLoading === user.id;

  return (
    <tr className="border-b hover:bg-muted/40 transition-colors">
      <td className="p-3 font-medium">{user.username}</td>

      <td className="p-3">{user.email}</td>

      <td className="p-3">{user.role}</td>

      <td className="p-3">
        <UserStatusBadge isActive={user.is_active} />
      </td>

      <td className="p-3 text-right">
        {user.is_active ? (
          <Button
            variant="destructive"
            size="sm"
            disabled={isLoading}
            onClick={() => {
              if (window.confirm("Are you sure you want to deactivate this user?")) {
                onDeactivate(user.id);
              }
            }}
          >
            {isLoading ? "Deactivating..." : "Deactivate"}
          </Button>
        ) : (
          <Button
            size="sm"
            disabled={isLoading}
            onClick={() => onActivate(user.id)}
          >
            {isLoading ? "Activating..." : "Activate"}
          </Button>
        )}
      </td>
    </tr>
  );
}