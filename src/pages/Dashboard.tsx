
import { Users, Clock, CheckSquare } from "lucide-react";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentActivities } from "@/components/dashboard/RecentActivities";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityItemProps } from "@/components/dashboard/ActivityItem";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

// Sample data for the charts
const attendanceData = [
  { name: "Mon", value: 85 },
  { name: "Tue", value: 92 },
  { name: "Wed", value: 89 },
  { name: "Thu", value: 94 },
  { name: "Fri", value: 91 },
  { name: "Sat", value: 45 },
  { name: "Sun", value: 23 },
];

// Sample activities data
const activities: ActivityItemProps[] = [
  {
    user: { name: "Jane Smith" },
    action: "submitted a leave request",
    timestamp: new Date(2025, 3, 24, 9, 25),
    details: "Vacation from May 3rd to May 10th",
  },
  {
    user: { name: "Mike Johnson" },
    action: "checked in",
    timestamp: new Date(2025, 3, 24, 8, 45),
    details: "From the mobile app",
  },
  {
    user: { name: "Sarah Williams" },
    action: "updated their profile",
    timestamp: new Date(2025, 3, 24, 8, 30),
    details: "Changed contact information",
  },
  {
    user: { name: "Alex Brown" },
    action: "completed a training module",
    timestamp: new Date(2025, 3, 24, 8, 15),
    details: "Cybersecurity Awareness Training",
  },
];

const Dashboard = () => {
  const currentHour = new Date().getHours();
  let greeting = "Good Morning";
  
  if (currentHour >= 12 && currentHour < 18) {
    greeting = "Good Afternoon";
  } else if (currentHour >= 18) {
    greeting = "Good Evening";
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{greeting}, John</h1>
        <p className="text-muted-foreground">
          Here's what's happening in your organization today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard 
          title="Total Employees" 
          value={182} 
          icon={Users} 
          trend={{ value: 4.5, isPositive: true }}
          iconColor="bg-primary"
        />
        <StatsCard 
          title="Today's Attendance" 
          value="87%" 
          icon={Clock} 
          trend={{ value: 1.2, isPositive: true }}
          description="158 of 182 employees"
          iconColor="bg-cyan-500"
        />
        <StatsCard 
          title="Pending Leave Requests" 
          value={12} 
          icon={CheckSquare}
          trend={{ value: 2.1, isPositive: false }}
          iconColor="bg-amber-500" 
        />
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Weekly Attendance Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                  }}
                  formatter={(value: number) => [`${value}%`, 'Attendance']}
                />
                <Bar
                  dataKey="value"
                  fill="hsl(252, 94%, 67%)"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={60}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <div className="md:col-span-2">
          <RecentActivities activities={activities} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
