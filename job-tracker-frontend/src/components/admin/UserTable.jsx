import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import UserRow from "./UserRow";

export default function UserTable({
  users,
  actionLoading,
  onActivate,
  onDeactivate,
}) {
  return (
    <div className="rounded-lg border shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length > 0 ? (
            users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                actionLoading={actionLoading}
                onActivate={onActivate}
                onDeactivate={onDeactivate}
              />
            ))
          ) : (
            <TableRow>
              <td
                colSpan={5}
                className="h-24 text-center text-muted-foreground"
              >
                No users found.
              </td>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}