
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ActivityItem, ActivityItemProps } from "./ActivityItem";
import { Button } from "@/components/ui/button";

interface RecentActivitiesProps {
  activities: ActivityItemProps[];
}

export function RecentActivities({ activities }: RecentActivitiesProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Latest activities in your organization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-0">
          {activities.map((activity, index) => (
            <ActivityItem key={index} {...activity} />
          ))}
          {activities.length > 0 && (
            <div className="pt-4 text-center">
              <Button variant="outline" size="sm">View All Activities</Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
