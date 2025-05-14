
import { format } from "date-fns";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LeaveRequest } from "@/types/leave";

interface LeaveRequestCardProps {
  request: LeaveRequest;
  onClick: () => void;
}

const LeaveRequestCard = ({ request, onClick }: LeaveRequestCardProps) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-sm transition-shadow">
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/placeholder.svg" alt={request.employee.name} />
            <AvatarFallback>{request.employee.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{request.employee.name}</h3>
            <p className="text-xs text-gray-500">{request.type}</p>
          </div>
        </div>
        <Badge 
          variant="outline"
          className={
            request.status === "Approved" 
              ? "bg-green-50 text-green-700 border-green-200" 
              : request.status === "Rejected"
                ? "bg-red-50 text-red-700 border-red-200"
                : "bg-amber-50 text-amber-700 border-amber-200"
          }
        >
          {request.status}
        </Badge>
      </div>
      
      <div className="mt-3 text-sm">
        <p className="text-gray-500">
          {format(request.startDate, "MMM d")} - {format(request.endDate, "MMM d, yyyy")}
          <span className="inline-block ml-2 text-xs bg-gray-100 px-2 py-0.5 rounded">
            {Math.ceil((request.endDate.getTime() - request.startDate.getTime()) / (1000 * 60 * 60 * 24) + 1)} days
          </span>
        </p>
      </div>
      
      <div className="mt-3 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Requested {format(request.createdAt, "MMM d, yyyy")}
        </span>
        <Button variant="ghost" size="sm" onClick={onClick}>
          <Eye className="h-4 w-4 mr-1" /> View
        </Button>
      </div>
    </div>
  );
};

export default LeaveRequestCard;
