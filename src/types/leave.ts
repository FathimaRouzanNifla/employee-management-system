
export interface LeaveRequest {
  id: number;
  employee: {
    name: string;
    avatar?: string;
    department: string;
  };
  type: string;
  startDate: Date;
  endDate: Date;
  status: "Pending" | "Approved" | "Rejected";
  reason: string;
  createdAt: Date;
}
