import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { LogOut, Trash2 } from "lucide-react";

const Settings = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState("/placeholder.svg");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  
  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      });
    }, 1000);
  };

  const handleSystemSettingsSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings saved",
        description: "System settings have been updated successfully.",
      });
    }, 1000);
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatarSrc(e.target.result.toString());
          toast({
            title: "Photo updated",
            description: "Your profile photo has been updated.",
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = () => {
    setIsLoading(true);
    
    // Simulate API call for account deletion
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Account deleted",
        description: "Your account has been deleted successfully.",
        variant: "destructive",
      });
      logout();
      navigate("/auth");
    }, 1500);
  };

  const handleRemovePhoto = () => {
    setAvatarSrc("/placeholder.svg");
    toast({
      title: "Photo removed",
      description: "Your profile photo has been removed.",
    });
  };

  const handleLogout = () => {
    setIsLoading(true);
    
    // Simulate API call for logging out from all devices
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Logged out of all devices",
        description: "You have been successfully logged out from all devices.",
      });
      
      // Only log out from current device
      logout();
      navigate("/auth");
    }, 1000);
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="flex overflow-x-auto pb-1 md:pb-0">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="system">System Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="security">Security & Privacy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>
                Manage your public profile information
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileUpdate}>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-4">
                  <Avatar 
                    className="h-20 w-20 cursor-pointer ring-2 ring-offset-2 ring-offset-background hover:opacity-90 transition-opacity"
                    onClick={handleAvatarClick}
                  >
                    <AvatarImage src={avatarSrc} alt="Profile" />
                    <AvatarFallback>{user?.name ? user.name.charAt(0).toUpperCase() : "U"}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col space-y-2">
                    <div className="flex space-x-2">
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm"
                        onClick={handleAvatarClick}
                      >
                        Change Avatar
                      </Button>
                      <Button 
                        type="button"
                        variant="outline" 
                        size="sm"
                        onClick={handleRemovePhoto}
                      >
                        Remove Photo
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Click on the avatar or button to upload a new photo</p>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      className="hidden" 
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" defaultValue={user?.name || "John Doe"} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue={user?.email || "john@example.com"} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input id="title" defaultValue="Product Manager" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select defaultValue="product">
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="product">Product</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="design">Design</SelectItem>
                        <SelectItem value="marketing">Marketing</SelectItem>
                        <SelectItem value="hr">Human Resources</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      defaultValue="Product Manager with 5+ years of experience in SaaS products."
                      rows={4}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end space-x-2">
                <Button variant="outline">Cancel</Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Update your password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </CardContent>
            <CardFooter className="justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Change Password</Button>
            </CardFooter>
          </Card>

          <Card className="border-destructive/30">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>
                Irreversible and destructive actions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-destructive/30 rounded-lg">
                <div>
                  <h3 className="font-medium">Delete Account</h3>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data
                  </p>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">
                      <Trash2 className="mr-2 h-4 w-4" /> Delete Account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        className="bg-destructive hover:bg-destructive/90" 
                        onClick={handleDeleteAccount}
                      >
                        Delete Account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

              <div className="flex items-center justify-between p-4 border border-destructive/30 rounded-lg">
                <div>
                  <h3 className="font-medium">Log Out of All Devices</h3>
                  <p className="text-sm text-muted-foreground">
                    Revoke access to your account on all devices
                  </p>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">
                      <LogOut className="mr-2 h-4 w-4" /> Log Out All
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Log out of all devices?</AlertDialogTitle>
                      <AlertDialogDescription>
                        You will be logged out from all devices where you have an active session. You'll need to log in again on each device.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleLogout}>
                        Log Out All Devices
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>
                Configure your system preferences
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSystemSettingsSave}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input id="company-name" defaultValue="EmployFlow Inc." />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date-format">Date Format</Label>
                    <Select defaultValue="mdy">
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="ymd">YYYY/MM/DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time-format">Time Format</Label>
                    <Select defaultValue="12h">
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="12h">12-hour (AM/PM)</SelectItem>
                        <SelectItem value="24h">24-hour</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="utc-8">
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="utc-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="utc-0">UTC</SelectItem>
                        <SelectItem value="utc+1">Central European Time (UTC+1)</SelectItem>
                        <SelectItem value="utc+8">China Standard Time (UTC+8)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="space-y-1">
                    <Label>System Behavior</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="auto-logout" />
                    <Label htmlFor="auto-logout" className="flex-1">
                      <div className="space-y-0.5">
                        <p>Auto-logout after inactivity</p>
                        <p className="text-sm text-gray-500">Log users out after 30 minutes of inactivity</p>
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 pt-2">
                    <Switch id="session-timeout" defaultChecked />
                    <Label htmlFor="session-timeout" className="flex-1">
                      <div className="space-y-0.5">
                        <p>Session timeout warning</p>
                        <p className="text-sm text-gray-500">Show a warning 5 minutes before session timeout</p>
                      </div>
                    </Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="justify-end space-x-2">
                <Button variant="outline">Reset to Defaults</Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Configure how you want to receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="flex items-center space-x-2">
                  <Switch id="leave-requests" defaultChecked />
                  <Label htmlFor="leave-requests" className="flex-1">Leave request notifications</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="attendance" defaultChecked />
                  <Label htmlFor="attendance" className="flex-1">Attendance reports</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="system-updates" defaultChecked />
                  <Label htmlFor="system-updates" className="flex-1">System updates</Label>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">In-App Notifications</h3>
                <div className="flex items-center space-x-2">
                  <Switch id="pending-approvals" defaultChecked />
                  <Label htmlFor="pending-approvals" className="flex-1">Pending approvals</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="employee-updates" defaultChecked />
                  <Label htmlFor="employee-updates" className="flex-1">Employee profile updates</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="announcements" defaultChecked />
                  <Label htmlFor="announcements" className="flex-1">Company announcements</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end space-x-2">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle>Appearance Settings</CardTitle>
              <CardDescription>
                Customize the look and feel of the dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Theme</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 cursor-pointer hover:border-primary flex flex-col items-center space-y-2 ring-2 ring-primary">
                    <div className="h-20 w-full bg-white rounded border"></div>
                    <span className="text-sm font-medium">Light</span>
                  </div>
                  <div className="border rounded-lg p-4 cursor-pointer hover:border-primary flex flex-col items-center space-y-2">
                    <div className="h-20 w-full bg-gray-900 rounded border"></div>
                    <span className="text-sm font-medium">Dark</span>
                  </div>
                  <div className="border rounded-lg p-4 cursor-pointer hover:border-primary flex flex-col items-center space-y-2">
                    <div className="h-20 w-full bg-gradient-to-r from-white to-gray-900 rounded border"></div>
                    <span className="text-sm font-medium">System</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Color Scheme</h3>
                <div className="grid grid-cols-4 gap-4">
                  <div className="border rounded-lg p-2 cursor-pointer hover:border-primary flex flex-col items-center space-y-1 ring-2 ring-primary">
                    <div className="h-10 w-full rounded bg-primary"></div>
                    <span className="text-xs">Purple</span>
                  </div>
                  <div className="border rounded-lg p-2 cursor-pointer hover:border-primary flex flex-col items-center space-y-1">
                    <div className="h-10 w-full rounded bg-blue-500"></div>
                    <span className="text-xs">Blue</span>
                  </div>
                  <div className="border rounded-lg p-2 cursor-pointer hover:border-primary flex flex-col items-center space-y-1">
                    <div className="h-10 w-full rounded bg-green-500"></div>
                    <span className="text-xs">Green</span>
                  </div>
                  <div className="border rounded-lg p-2 cursor-pointer hover:border-primary flex flex-col items-center space-y-1">
                    <div className="h-10 w-full rounded bg-orange-500"></div>
                    <span className="text-xs">Orange</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="compact-view" />
                  <Label htmlFor="compact-view" className="flex-1">
                    <div className="space-y-0.5">
                      <p>Compact View</p>
                      <p className="text-sm text-gray-500">Use less whitespace throughout the interface</p>
                    </div>
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end space-x-2">
              <Button variant="outline">Reset to Defaults</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>
                Manage your security preferences and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p>Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                  </div>
                  <Button>Set Up 2FA</Button>
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h3 className="text-lg font-medium">Privacy Settings</h3>
                <div className="flex items-center space-x-2">
                  <Switch id="data-collection" defaultChecked />
                  <Label htmlFor="data-collection" className="flex-1">
                    <div className="space-y-0.5">
                      <p>Data Collection</p>
                      <p className="text-sm text-muted-foreground">Allow us to collect usage data to improve your experience</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch id="marketing-emails" />
                  <Label htmlFor="marketing-emails" className="flex-1">
                    <div className="space-y-0.5">
                      <p>Marketing Emails</p>
                      <p className="text-sm text-muted-foreground">Receive emails about new features and promotions</p>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch id="profile-visibility" defaultChecked />
                  <Label htmlFor="profile-visibility" className="flex-1">
                    <div className="space-y-0.5">
                      <p>Profile Visibility</p>
                      <p className="text-sm text-muted-foreground">Make your profile visible to other users in the organization</p>
                    </div>
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end space-x-2">
              <Button variant="outline">Cancel</Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Login Sessions</CardTitle>
              <CardDescription>
                Manage your active login sessions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Current Session</p>
                      <p className="text-sm text-muted-foreground">
                        Chrome on Windows • Last active now
                      </p>
                    </div>
                    <Button variant="outline" size="sm">This Device</Button>
                  </div>
                </div>
                <div className="rounded-lg border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Mobile Session</p>
                      <p className="text-sm text-muted-foreground">
                        Safari on iPhone • Last active 2 hours ago
                      </p>
                    </div>
                    <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10">Revoke</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
