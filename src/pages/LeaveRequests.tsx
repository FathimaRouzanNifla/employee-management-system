
import { useState, useEffect } from "react";
import { Plus, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LeaveBalance from "@/components/leave/LeaveBalance";
import LeaveHistory from "@/components/leave/LeaveHistory";
import LeaveRequestCard from "@/components/leave/LeaveRequestCard";
import LeaveRequestDetails from "@/components/leave/LeaveRequestDetails";
import LeaveFilter from "@/components/leave/LeaveFilter";
import ApplyLeaveForm from "@/components/leave/ApplyLeaveForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import type { LeaveRequest } from "@/types/leave";

const initialLeaveRequests: LeaveRequest[] = [
  {
    id: 1,
    employee: { name: "Jane Smith", department: "Design" },
    type: "Vacation",
    startDate: new Date(2025, 4, 3),
    endDate: new Date(2025, 4, 10),
    status: "Pending",
    reason: "Annual family vacation",
    createdAt: new Date(2025, 3, 24, 9, 25),
  },
  {
    id: 2,
    employee: { name: "Mike Johnson", department: "Engineering" },
    type: "Sick Leave",
    startDate: new Date(2025, 3, 25),
    endDate: new Date(2025, 3, 26),
    status: "Pending",
    reason: "Not feeling well, need to rest",
    createdAt: new Date(2025, 3, 24, 8, 15),
  },
  {
    id: 3,
    employee: { name: "Alex Brown", department: "Marketing" },
    type: "Personal Leave",
    startDate: new Date(2025, 3, 28),
    endDate: new Date(2025, 3, 28),
    status: "Approved",
    reason: "Family emergency",
    createdAt: new Date(2025, 3, 23, 14, 30),
  },
  {
    id: 4,
    employee: { name: "Sarah Williams", department: "Human Resources" },
    type: "Vacation",
    startDate: new Date(2025, 3, 20),
    endDate: new Date(2025, 3, 22),
    status: "Rejected",
    reason: "Planned short trip",
    createdAt: new Date(2025, 3, 15, 11, 20),
  },
  {
    id: 5,
    employee: { name: "Robert Wilson", department: "Engineering" },
    type: "Work From Home",
    startDate: new Date(2025, 3, 26),
    endDate: new Date(2025, 3, 27),
    status: "Approved",
    reason: "Internet installation at home",
    createdAt: new Date(2025, 3, 22, 10, 15),
  },
];

const LeaveRequests = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
  const [filteredRequests, setFilteredRequests] = useState<LeaveRequest[]>(initialLeaveRequests);
  const [selectedRequest, setSelectedRequest] = useState<LeaveRequest | null>(null);
  const [showApplyLeaveDialog, setShowApplyLeaveDialog] = useState(false);
  const [filters, setFilters] = useState<{status: string[], type: string[]}>({status: [], type: []});
  const [activeTab, setActiveTab] = useState("requests");
  const [activeRequestsTab, setActiveRequestsTab] = useState("pending");
  
  // Apply filters whenever filter state or leave requests change
  useEffect(() => {
    let result = [...leaveRequests];
    
    if (filters.status.length > 0) {
      result = result.filter(req => filters.status.includes(req.status));
    }
    
    if (filters.type.length > 0) {
      result = result.filter(req => filters.type.includes(req.type));
    }
    
    setFilteredRequests(result);
  }, [filters, leaveRequests]);

  const pendingRequests = filteredRequests.filter(req => req.status === "Pending");
  const approvedRequests = filteredRequests.filter(req => req.status === "Approved");
  const rejectedRequests = filteredRequests.filter(req => req.status === "Rejected");

  const handleFilterChange = (newFilters: {status: string[], type: string[]}) => {
    setFilters(newFilters);
  };

  const handleApplyLeave = (leaveData: Omit<LeaveRequest, 'id' | 'createdAt'>) => {
    const newLeave: LeaveRequest = {
      ...leaveData,
      id: leaveRequests.length + 1,
      createdAt: new Date(),
    };
    
    setLeaveRequests([newLeave, ...leaveRequests]);
  };

  const handleStatusChange = (requestId: number, newStatus: "Approved" | "Rejected" | "Pending") => {
    setLeaveRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === requestId ? { ...req, status: newStatus } : req
      )
    );
    
    toast({
      title: `Leave request ${newStatus.toLowerCase()}`,
      description: `The leave request has been ${newStatus.toLowerCase()}.`,
    });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-bold tracking-tight">Leave Management</h1>
        <p className="text-muted-foreground text-sm md:text-base">Manage and track your leave requests</p>
      </div>

      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Dialog open={showApplyLeaveDialog} onOpenChange={setShowApplyLeaveDialog}>
          <DialogTrigger asChild>
            <Button 
              className="w-full md:w-auto" 
            >
              <Plus className="h-4 w-4 mr-2" /> Apply for Leave
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Apply for Leave</DialogTitle>
              <DialogDescription>
                Fill in the details to submit your leave request
              </DialogDescription>
            </DialogHeader>
            <ApplyLeaveForm 
              onClose={() => setShowApplyLeaveDialog(false)} 
              onSubmit={handleApplyLeave}
            />
          </DialogContent>
        </Dialog>
        
        <div className={`flex items-center ${isMobile ? 'w-full justify-between' : 'gap-4'}`}>
          <LeaveFilter onFilterChange={handleFilterChange} />
          <span className="text-xs md:text-sm font-medium flex items-center gap-1">
            <Clock className="h-3 w-3 md:h-4 md:w-4 text-amber-500" />
            <span>{pendingRequests.length} Pending</span>
          </span>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-2 md:pb-3">
          <CardTitle>Leave Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="requests" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full overflow-x-auto">
              <TabsTrigger value="requests" className="text-xs md:text-sm">Leave Requests</TabsTrigger>
              <TabsTrigger value="balance" className="text-xs md:text-sm">Leave Balance</TabsTrigger>
              <TabsTrigger value="history" className="text-xs md:text-sm">History</TabsTrigger>
              <TabsTrigger value="approvals" className="text-xs md:text-sm">Approvals</TabsTrigger>
            </TabsList>
            
            <TabsContent value="requests" className="space-y-3 md:space-y-4">
              <Tabs value={activeRequestsTab} onValueChange={setActiveRequestsTab} className="w-full mt-2 md:mt-3">
                <TabsList className="w-full overflow-x-auto justify-start">
                  <TabsTrigger value="pending" className="text-xs md:text-sm">Pending ({pendingRequests.length})</TabsTrigger>
                  <TabsTrigger value="approved" className="text-xs md:text-sm">Approved ({approvedRequests.length})</TabsTrigger>
                  <TabsTrigger value="rejected" className="text-xs md:text-sm">Rejected ({rejectedRequests.length})</TabsTrigger>
                </TabsList>
                
                {["pending", "approved", "rejected"].map((status) => (
                  <TabsContent key={status} value={status} className="mt-3 md:mt-4">
                    {status === "pending" && (
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                        {pendingRequests.length > 0 ? (
                          pendingRequests.map((request) => (
                            <Dialog key={request.id}>
                              <DialogTrigger asChild>
                                <div onClick={() => setSelectedRequest(request)}>
                                  <LeaveRequestCard 
                                    request={request} 
                                    onClick={() => setSelectedRequest(request)} 
                                  />
                                </div>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle>Leave Request Details</DialogTitle>
                                  <DialogDescription>
                                    Review and take action on this leave request
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedRequest && <LeaveRequestDetails 
                                  request={selectedRequest} 
                                  onStatusChange={(status) => handleStatusChange(selectedRequest.id, status)}
                                />}
                              </DialogContent>
                            </Dialog>
                          ))
                        ) : (
                          <div className="col-span-1 md:col-span-2 text-center py-6 md:py-10 text-gray-500">
                            <p>No pending leave requests</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {status === "approved" && (
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                        {approvedRequests.length > 0 ? (
                          approvedRequests.map((request) => (
                            <Dialog key={request.id}>
                              <DialogTrigger asChild>
                                <div onClick={() => setSelectedRequest(request)}>
                                  <LeaveRequestCard 
                                    request={request} 
                                    onClick={() => setSelectedRequest(request)} 
                                  />
                                </div>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle>Leave Request Details</DialogTitle>
                                  <DialogDescription>
                                    Review leave request details
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedRequest && <LeaveRequestDetails 
                                  request={selectedRequest}
                                  onStatusChange={(status) => handleStatusChange(selectedRequest.id, status)}
                                />}
                              </DialogContent>
                            </Dialog>
                          ))
                        ) : (
                          <div className="col-span-1 md:col-span-2 text-center py-6 md:py-10 text-gray-500">
                            <p>No approved leave requests found</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {status === "rejected" && (
                      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                        {rejectedRequests.length > 0 ? (
                          rejectedRequests.map((request) => (
                            <Dialog key={request.id}>
                              <DialogTrigger asChild>
                                <div onClick={() => setSelectedRequest(request)}>
                                  <LeaveRequestCard 
                                    request={request} 
                                    onClick={() => setSelectedRequest(request)} 
                                  />
                                </div>
                              </DialogTrigger>
                              <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                  <DialogTitle>Leave Request Details</DialogTitle>
                                  <DialogDescription>
                                    Review leave request details
                                  </DialogDescription>
                                </DialogHeader>
                                {selectedRequest && <LeaveRequestDetails 
                                  request={selectedRequest}
                                  onStatusChange={(status) => handleStatusChange(selectedRequest.id, status)}
                                />}
                              </DialogContent>
                            </Dialog>
                          ))
                        ) : (
                          <div className="col-span-1 md:col-span-2 text-center py-6 md:py-10 text-gray-500">
                            <p>No rejected leave requests found</p>
                          </div>
                        )}
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </TabsContent>
            
            <TabsContent value="balance">
              <LeaveBalance />
            </TabsContent>
            
            <TabsContent value="history">
              <LeaveHistory 
                requests={[...approvedRequests, ...rejectedRequests]} 
              />
            </TabsContent>
            
            <TabsContent value="approvals">
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4">
                {pendingRequests.length > 0 ? (
                  pendingRequests.map((request) => (
                    <Dialog key={request.id}>
                      <DialogTrigger asChild>
                        <div onClick={() => setSelectedRequest(request)}>
                          <LeaveRequestCard 
                            request={request} 
                            onClick={() => setSelectedRequest(request)}
                          />
                        </div>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Leave Request Details</DialogTitle>
                          <DialogDescription>
                            Review and take action on this leave request
                          </DialogDescription>
                        </DialogHeader>
                        {selectedRequest && <LeaveRequestDetails 
                          request={selectedRequest} 
                          onStatusChange={(status) => handleStatusChange(selectedRequest.id, status)}
                        />}
                      </DialogContent>
                    </Dialog>
                  ))
                ) : (
                  <div className="col-span-1 md:col-span-2 text-center py-6 md:py-10 text-gray-500">
                    <p>No pending approvals</p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaveRequests;
