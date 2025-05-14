
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { format } from "date-fns";

export interface ActivityItemProps {
  user: {
    name: string;
    avatar?: string;
  };
  action: string;
  timestamp: Date;
  details?: string;
  className?: string;
}

export function ActivityItem({
  user,
  action,
  timestamp,
  details,
  className,
}: ActivityItemProps) {
  return (
    <div className={cn("activity-item", className)}>
      <Avatar className="h-10 w-10">
        <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
        <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <div className="flex justify-between">
          <p className="text-sm font-medium">
            <span className="font-semibold">{user.name}</span> {action}
          </p>
          <span className="text-xs text-gray-500">
            {format(timestamp, "h:mm a")}
          </span>
        </div>
        {details && <p className="text-xs text-gray-500 mt-0.5">{details}</p>}
      </div>
    </div>
  );
}
