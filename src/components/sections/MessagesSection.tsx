import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

function MessagesSection() {
  return (
    <fieldset className="grid gap-6 p-4 border rounded-lg">
      <legend className="px-1 -ml-1 text-sm font-medium">Messages</legend>
      <div className="grid gap-3">
        <Label htmlFor="role">Role</Label>
        <Select defaultValue="system">
          <SelectTrigger>
            <SelectValue placeholder="Select a role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="system">System</SelectItem>
            <SelectItem value="user">User</SelectItem>
            <SelectItem value="assistant">Assistant</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="content">Content</Label>
        <Textarea
          id="content"
          placeholder="You are a..."
          className="min-h-[9.5rem]"
        />
      </div>
    </fieldset>
  );
}

export default MessagesSection;
