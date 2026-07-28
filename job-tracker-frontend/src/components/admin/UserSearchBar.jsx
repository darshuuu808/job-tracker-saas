import { Input } from "../ui/input";

export default function UserSearchBar({ value, onChange }) {
  return (
    <div className="mb-4">
      <Input
        type="text"
        placeholder="Search by username or email..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}