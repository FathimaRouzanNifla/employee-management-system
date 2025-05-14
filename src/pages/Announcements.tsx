
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Pin, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const announcements = [
  {
    id: 1,
    title: "Company Picnic",
    content: "Join us for our annual company picnic on Saturday, June 15 at Central Park. Food and drinks will be provided. Bring your family and enjoy a day of fun activities!",
    date: "2025-06-15",
    author: "Sarah Johnson",
    authorAvatar: "/placeholder.svg",
    authorInitials: "SJ",
    category: "Events",
    pinned: true
  },
  {
    id: 2,
    title: "New Health Insurance Plan",
    content: "We're excited to announce our new and improved health insurance plan. Starting July 1st, all employees will have access to better coverage with lower deductibles. More information will be shared in the upcoming benefits meeting.",
    date: "2025-07-01", 
    author: "Robert Chen",
    authorAvatar: "/placeholder.svg",
    authorInitials: "RC",
    category: "Benefits",
    pinned: false
  },
  {
    id: 3,
    title: "Office Closure for Independence Day",
    content: "The office will be closed on Thursday, July 4th and Friday, July 5th in observance of Independence Day. Regular office hours will resume on Monday, July 8th. For urgent matters, please contact the on-call team.",
    date: "2025-07-04",
    author: "Michael Torres",
    authorAvatar: "/placeholder.svg",
    authorInitials: "MT",
    category: "Office",
    pinned: true
  },
  {
    id: 4,
    title: "Quarterly All-Hands Meeting",
    content: "Our quarterly all-hands meeting will be held next Friday at 2 PM in the main conference room. We'll be discussing our Q2 results and plans for Q3. Remote employees can join via the usual video conference link.",
    date: "2025-05-23",
    author: "Emma Wilson",
    authorAvatar: "/placeholder.svg",
    authorInitials: "EW",
    category: "Meetings",
    pinned: false
  },
  {
    id: 5,
    title: "New Learning & Development Portal",
    content: "We're launching a new learning and development portal next month. The platform will offer hundreds of courses on various professional skills. Stay tuned for login information and an introductory webinar.",
    date: "2025-06-01",
    author: "James Lee",
    authorAvatar: "/placeholder.svg",
    authorInitials: "JL",
    category: "Training",
    pinned: false
  }
];

const Announcements = () => {
  const [activeTab, setActiveTab] = useState("all");

  const pinnedAnnouncements = announcements.filter(a => a.pinned);
  const allAnnouncements = activeTab === "all" ? announcements : 
                           announcements.filter(a => a.category.toLowerCase() === activeTab);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
        <p className="text-muted-foreground">
          Stay up to date with company news and updates
        </p>
      </div>

      {pinnedAnnouncements.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center">
            <Pin className="h-4 w-4 mr-2 text-muted-foreground" />
            <h2 className="text-lg font-medium">Pinned Announcements</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pinnedAnnouncements.map((announcement) => (
              <Card key={announcement.id} className="border-l-4 border-l-primary">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <Badge variant="outline">{announcement.category}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(announcement.date)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{announcement.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-1 border-t">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={announcement.authorAvatar} />
                      <AvatarFallback>{announcement.authorInitials}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{announcement.author}</span>
                  </div>
                  <Button variant="ghost" size="sm">Read more</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="flex overflow-x-auto pb-1 md:pb-0">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="events">Events</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="office">Office</TabsTrigger>
          <TabsTrigger value="meetings">Meetings</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="space-y-4">
          <div className="space-y-4">
            {allAnnouncements.map((announcement) => (
              <Card key={announcement.id} className={pinnedAnnouncements.includes(announcement) ? "hidden" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <Badge variant="outline">{announcement.category}</Badge>
                  </div>
                  <CardDescription className="flex items-center gap-2 mt-1">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(announcement.date)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{announcement.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center pt-1 border-t">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={announcement.authorAvatar} />
                      <AvatarFallback>{announcement.authorInitials}</AvatarFallback>
                    </Avatar>
                    <span className="text-xs text-muted-foreground">{announcement.author}</span>
                  </div>
                  <Button variant="ghost" size="sm">Read more</Button>
                </CardFooter>
              </Card>
            ))}
            
            {allAnnouncements.length === 0 && (
              <div className="flex flex-col items-center justify-center py-12">
                <Bell className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No announcements</h3>
                <p className="text-sm text-muted-foreground">There are no announcements in this category.</p>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Announcements;
