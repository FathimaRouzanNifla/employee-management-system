
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Download, Filter, Calendar } from "lucide-react";

const Payroll = () => {
  const [selectedTab, setSelectedTab] = useState("current");

  const payslips = [
    { id: 1, period: "May 2025", amount: "Rs.4,500.00", status: "Paid", date: "May 28, 2025" },
    { id: 2, period: "April 2025", amount: "Rs.4,500.00", status: "Paid", date: "April 28, 2025" },
    { id: 3, period: "March 2025", amount: "Rs.4,500.00", status: "Paid", date: "March 28, 2025" },
    { id: 4, period: "February 2025", amount: "Rs.4,300.00", status: "Paid", date: "February 28, 2025" },
    { id: 5, period: "January 2025", amount: "Rs.4,300.00", status: "Paid", date: "January 28, 2025" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Payroll Management</h1>
        <p className="text-muted-foreground">
          View your payslips and manage payroll information
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Current Salary</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs.54,000.00</div>
            <p className="text-xs text-muted-foreground">Annual Gross Salary</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Last Payslip</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs.4,500.00</div>
            <p className="text-xs text-muted-foreground">Paid on May 28, 2025</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Year To Date</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rs.22,500.00</div>
            <p className="text-xs text-muted-foreground">Total paid in 2025</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="payslips" className="space-y-4">
        <TabsList>
          <TabsTrigger value="payslips">Payslips</TabsTrigger>
          <TabsTrigger value="deductions">Deductions</TabsTrigger>
          <TabsTrigger value="tax">Tax Information</TabsTrigger>
        </TabsList>
        
        <TabsContent value="payslips" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                <div>
                  <CardTitle>Payslip History</CardTitle>
                  <CardDescription>
                    View and download your previous payslips
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="h-8">
                    <Filter className="h-3.5 w-3.5 mr-2" />
                    Filter
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <div className="grid grid-cols-5 p-4 text-sm font-medium border-b bg-muted/50">
                  <div>Period</div>
                  <div>Amount</div>
                  <div className="hidden md:block">Status</div>
                  <div className="hidden md:block">Date</div>
                  <div className="text-right">Actions</div>
                </div>
                {payslips.map((payslip) => (
                  <div key={payslip.id} className="grid grid-cols-5 p-4 text-sm border-b last:border-0">
                    <div>{payslip.period}</div>
                    <div>{payslip.amount}</div>
                    <div className="hidden md:block">
                      <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold text-green-700 bg-green-50">
                        {payslip.status}
                      </span>
                    </div>
                    <div className="hidden md:block">{payslip.date}</div>
                    <div className="flex justify-end">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deductions">
          <Card>
            <CardHeader>
              <CardTitle>Deductions</CardTitle>
              <CardDescription>
                View your salary deductions breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center px-4 py-3 bg-muted/30 rounded-lg">
                  <span>Income Tax</span>
                  <span className="font-medium">Rs.875.00</span>
                </div>
                <div className="flex justify-between items-center px-4 py-3 bg-muted/30 rounded-lg">
                  <span>Social Security</span>
                  <span className="font-medium">Rs.348.75</span>
                </div>
                <div className="flex justify-between items-center px-4 py-3 bg-muted/30 rounded-lg">
                  <span>Health Insurance</span>
                  <span className="font-medium">Rs.250.00</span>
                </div>
                <div className="flex justify-between items-center px-4 py-3 bg-muted/30 rounded-lg">
                  <span>Retirement Contribution</span>
                  <span className="font-medium">Rs.225.00</span>
                </div>
                <div className="flex justify-between items-center px-4 py-3 font-medium">
                  <span>Total Deductions</span>
                  <span>Rs.1,698.75</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tax">
          <Card>
            <CardHeader>
              <CardTitle>Tax Information</CardTitle>
              <CardDescription>
                Your tax filing information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Tax Identification</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tax ID:</span>
                        <span>XXX-XX-1234</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Filing Status:</span>
                        <span>Single</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Allowances:</span>
                        <span>1</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Additional Withholding:</span>
                        <span>Rs.0.00</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-medium mb-2">Year-to-Date Tax Summary</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Federal Income Tax:</span>
                        <span>Rs.4,375.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">State Income Tax:</span>
                        <span>Rs.1,200.00</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Social Security:</span>
                        <span>Rs.1,743.75</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Medicare:</span>
                        <span>Rs.407.81</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center mt-8">
                  <Button variant="outline">
                    Download Tax Forms
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Payroll;
