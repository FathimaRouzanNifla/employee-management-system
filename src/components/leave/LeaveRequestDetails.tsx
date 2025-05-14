
import { useState } from "react";
import { format } from "date-fns";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { LeaveRequest } from "@/types/leave";

interface LeaveRequestDetailsProps {
  request: LeaveRequest;
  onStatusChange?: (status: "Approved" | "Rejected" | "Pending") => void;
}

const LeaveRequestDetails = ({ request, onStatusChange }: LeaveRequestDetailsProps) => {
  const { toast } = useToast();
  const [status, setStatus] = useState(request.status);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleApprove = () => {
    setIsSubmitting(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      setStatus("Approved");
      if (onStatusChange) {
        onStatusChange("Approved");
      }
      
      toast({
        title: "Leave request approved",
        description: `You've approved ${request.employee.name}'s leave request.`,
      });
      
      setIsSubmitting(false);
    }, 500);
  };
  
  const handleReject = () => {
    setIsSubmitting(true);
    
    // Simulate API call with a delay
    setTimeout(() => {
      setStatus("Rejected");
      if (onStatusChange) {
        onStatusChange("Rejected");
      }
      
      toast({
        title: "Leave request rejected",
        description: `You've rejected ${request.employee.name}'s leave request.`,
      });
      
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/placeholder.svg" alt={request.employee.name} />
          <AvatarFallback>{request.employee.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-medium">{request.employee.name}</h3>
          <p className="text-sm text-gray-500">{request.employee.department}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-500">Leave Type</p>
          <p className="font-medium">{request.type}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Status</p>
          <Badge 
            variant="outline"
            className={
              status === "Approved" 
                ? "bg-green-50 text-green-700 border-green-200" 
                : status === "Rejected"
                  ? "bg-red-50 text-red-700 border-red-200"
                  : "bg-amber-50 text-amber-700 border-amber-200"
            }
          >
            {status}
          </Badge>
        </div>
        <div>
          <p className="text-sm text-gray-500">Date Range</p>
          <p className="font-medium">
            {format(request.startDate, "MMM d, yyyy")} - {format(request.endDate, "MMM d, yyyy")}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Days</p>
          <p className="font-medium">
            {Math.ceil((request.endDate.getTime() - request.startDate.getTime()) / (1000 * 60 * 60 * 24) + 1)} days
          </p>
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500">Reason</p>
        <p className="bg-gray-50 p-3 rounded-md text-sm">{request.reason}</p>
      </div>
      
      {status === "Pending" && (
        <div className="flex justify-end space-x-3 pt-4">
          <Button 
            variant="outline" 
            onClick={handleReject} 
            disabled={isSubmitting}
            className="border-red-200 text-red-600 hover:bg-red-50"
          >
            <X className="mr-1 h-4 w-4" /> Reject
          </Button>
          <Button 
            onClick={handleApprove} 
            disabled={isSubmitting}
            className="bg-green-600 hover:bg-green-700"
          >
            <Check className="mr-1 h-4 w-4" /> Approve
          </Button>
        </div>
      )}
    </div>
  );
};

export default LeaveRequestDetails;
