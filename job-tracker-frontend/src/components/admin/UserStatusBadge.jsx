import { Badge } from "../ui/badge";

export default function UserStatusBadge({ isActive }) {
  return (
    <Badge variant={isActive ? "default" : "destructive"}>
      {isActive ? "Active" : "Inactive"}
    </Badge>
  );
}