
import { useState } from "react";
import { Calendar as CalendarIcon, Clock } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { format } from "date-fns";

const Attendance = () => {
  const [date, setDate] = useState<Date>(new Date());
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);
  const [checkOutTime, setCheckOutTime] = useState<string | null>(null);
  const { toast } = useToast();

  const handleCheckIn = () => {
    const now = new Date();
    setCheckInTime(format(now, "h:mm a"));
    setIsCheckedIn(true);
    
    toast({
      title: "Checked in successfully",
      description: `You checked in at ${format(now, "h:mm a")}`,
    });
  };

  const handleCheckOut = () => {
    const now = new Date();
    setCheckOutTime(format(now, "h:mm a"));
    setIsCheckedIn(false);
    
    toast({
      title: "Checked out successfully",
      description: `You checked out at ${format(now, "h:mm a")}`,
    });
  };

  // Sample timesheet data
  const timesheetEntries = [
    { date: "Monday, April 22", checkIn: "9:05 AM", checkOut: "5:30 PM", totalHours: "8h 25m" },
    { date: "Tuesday, April 23", checkIn: "8:55 AM", checkOut: "5:15 PM", totalHours: "8h 20m" },
    { date: "Wednesday, April 24", checkIn: checkInTime || "-", checkOut: checkOutTime || "-", totalHours: checkInTime && checkOutTime ? "Calculating..." : "-" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Attendance & Timesheet</h1>
        <p className="text-muted-foreground">Manage your attendance and view your timesheet</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Attendance Calendar</CardTitle>
            <CardDescription>View and manage your attendance</CardDescription>
          </CardHeader>
          <CardContent className="p-0 pl-2">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border shadow-sm"
              disabled={(date) => date > new Date()}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Check In/Out</CardTitle>
            <CardDescription>Record your daily attendance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              <div className="progress-ring-container">
                <Clock size={36} className="text-primary" />
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-bold">{format(new Date(), "h:mm a")}</h3>
                <p className="text-sm text-gray-500">{format(new Date(), "EEEE, MMMM d, yyyy")}</p>
              </div>

              {checkInTime && !checkOutTime && (
                <div className="bg-green-50 text-green-700 px-4 py-2 rounded-md text-sm">
                  Checked in at {checkInTime}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-center space-x-4">
            <Button
              onClick={handleCheckIn}
              variant="default"
              disabled={isCheckedIn}
              className="w-32"
            >
              Check In
            </Button>
            <Button
              onClick={handleCheckOut}
              variant="outline"
              disabled={!isCheckedIn || !!checkOutTime}
              className="w-32"
            >
              Check Out
            </Button>
          </CardFooter>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Timesheet</CardTitle>
          <CardDescription>Your attendance records for the past few days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="table-cell-padding text-left font-medium">Date</th>
                  <th className="table-cell-padding text-left font-medium">Check In</th>
                  <th className="table-cell-padding text-left font-medium">Check Out</th>
                  <th className="table-cell-padding text-left font-medium">Total Hours</th>
                </tr>
              </thead>
              <tbody>
                {timesheetEntries.map((entry, index) => (
                  <tr key={index} className="border-b border-gray-200 last:border-0">
                    <td className="table-cell-padding">{entry.date}</td>
                    <td className="table-cell-padding">{entry.checkIn}</td>
                    <td className="table-cell-padding">{entry.checkOut}</td>
                    <td className="table-cell-padding">{entry.totalHours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Attendance;
