
import { format } from "date-fns";
import { History } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LeaveRequest } from "@/types/leave";

interface LeaveHistoryProps {
  requests: LeaveRequest[];
}

const LeaveHistory = ({ requests }: LeaveHistoryProps) => {
  const sortedRequests = [...requests]
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return (
    <div className="space-y-4">
      {sortedRequests.map((request) => (
        <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center gap-4">
            <History className="h-5 w-5 text-gray-400" />
            <div>
              <p className="font-medium">{request.type}</p>
              <p className="text-sm text-gray-500">
                {format(request.startDate, "MMM d")} - {format(request.endDate, "MMM d, yyyy")}
              </p>
            </div>
          </div>
          <Badge 
            variant="outline"
            className={
              request.status === "Approved" 
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-red-50 text-red-700 border-red-200"
            }
          >
            {request.status}
          </Badge>
        </div>
      ))}
    </div>
  );
};

export default LeaveHistory;
