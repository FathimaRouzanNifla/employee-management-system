
import { useState } from "react";
import { Search, Plus, MoreHorizontal, Pencil, Trash, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  status: "Active" | "On Leave" | "Inactive";
}

const employeesData: Employee[] = [
  { id: 1, name: "John Doe", position: "Product Manager", department: "Product", email: "john@example.com", phone: "123-456-7890", status: "Active" },
  { id: 2, name: "Jane Smith", position: "UX Designer", department: "Design", email: "jane@example.com", phone: "123-456-7891", status: "Active" },
  { id: 3, name: "Mike Johnson", position: "Developer", department: "Engineering", email: "mike@example.com", phone: "123-456-7892", status: "On Leave" },
  { id: 4, name: "Sarah Williams", position: "HR Manager", department: "Human Resources", email: "sarah@example.com", phone: "123-456-7893", status: "Active" },
  { id: 5, name: "Alex Brown", position: "Marketing Specialist", department: "Marketing", email: "alex@example.com", phone: "123-456-7894", status: "Inactive" },
  { id: 6, name: "Emily Davis", position: "Frontend Developer", department: "Engineering", email: "emily@example.com", phone: "123-456-7895", status: "Active" },
  { id: 7, name: "Robert Wilson", position: "Backend Developer", department: "Engineering", email: "robert@example.com", phone: "123-456-7896", status: "Active" },
];

const EmployeeForm = ({ employee }: { employee?: Employee }) => {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Full Name</label>
          <Input id="name" defaultValue={employee?.name} />
        </div>
        <div className="space-y-2">
          <label htmlFor="position" className="text-sm font-medium">Position</label>
          <Input id="position" defaultValue={employee?.position} />
        </div>
        <div className="space-y-2">
          <label htmlFor="department" className="text-sm font-medium">Department</label>
          <Input id="department" defaultValue={employee?.department} />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <Input id="email" type="email" defaultValue={employee?.email} />
        </div>
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">Phone</label>
          <Input id="phone" defaultValue={employee?.phone} />
        </div>
        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium">Status</label>
          <select 
            id="status" 
            className="w-full h-10 px-3 rounded-md border border-input bg-background text-sm"
            defaultValue={employee?.status}
          >
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end space-x-2 pt-4">
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit">Save</Button>
      </div>
    </form>
  );
};

const Employees = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | undefined>(undefined);

  const filteredEmployees = employeesData.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    employee.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Employee Directory</h1>
        <p className="text-muted-foreground">Manage your organization's employees</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search employees..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-1 h-4 w-4" /> Add Employee
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>Add Employee</DialogTitle>
              </DialogHeader>
              <EmployeeForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="table-cell-padding text-left font-medium">Employee</th>
                <th className="table-cell-padding text-left font-medium">Position</th>
                <th className="table-cell-padding text-left font-medium">Department</th>
                <th className="table-cell-padding text-left font-medium">Status</th>
                <th className="table-cell-padding text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-200 last:border-0">
                  <td className="table-cell-padding">
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src="/placeholder.svg" />
                        <AvatarFallback>{employee.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{employee.name}</p>
                        <p className="text-xs text-gray-500">{employee.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-cell-padding">{employee.position}</td>
                  <td className="table-cell-padding">{employee.department}</td>
                  <td className="table-cell-padding">
                    <Badge 
                      variant="outline"
                      className={
                        employee.status === "Active" 
                          ? "bg-green-50 text-green-700 border-green-200" 
                          : employee.status === "On Leave"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-gray-50 text-gray-700 border-gray-200"
                      }
                    >
                      {employee.status}
                    </Badge>
                  </td>
                  <td className="table-cell-padding text-right">
                    <Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DialogTrigger asChild>
                            <DropdownMenuItem onClick={() => setSelectedEmployee(employee)}>
                              <Pencil className="mr-2 h-4 w-4" />
                              <span>Edit</span>
                            </DropdownMenuItem>
                          </DialogTrigger>
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>

                      <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader>
                          <DialogTitle>Edit Employee</DialogTitle>
                        </DialogHeader>
                        <EmployeeForm employee={selectedEmployee} />
                      </DialogContent>
                    </Dialog>
                  </td>
                </tr>
              ))}
              {filteredEmployees.length === 0 && (
                <tr>
                  <td colSpan={5} className="table-cell-padding text-center text-muted-foreground">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default Employees;
