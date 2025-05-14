
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const LeaveBalance = () => {
  const balances = [
    { type: "Annual Leave", total: 20, used: 5, remaining: 15 },
    { type: "Sick Leave", total: 10, used: 2, remaining: 8 },
    { type: "Personal Leave", total: 5, used: 1, remaining: 4 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {balances.map((balance) => (
        <Card key={balance.type}>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">{balance.type}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{balance.remaining}</div>
            <p className="text-xs text-muted-foreground">
              Used: {balance.used} / Total: {balance.total}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LeaveBalance;
