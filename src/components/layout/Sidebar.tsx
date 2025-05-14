
import { useState } from "react";
import { cn } from "@/lib/utils";
import { NavLink } from "react-router-dom";
import { 
  Home,
  Users,
  Calendar,
  FileText,
  Settings,
  ChevronLeft,
  ChevronRight,
  Clock,
  CheckSquare,
  Bell,
  TrendingUp,
  DollarSign
} from "lucide-react";
import { Button } from "@/components/ui/button";

export type NavItem = {
  title: string;
  href: string;
  icon: React.ElementType;
};

const NAV_ITEMS: NavItem[] = [
  {
    title: "Dashboard",
    href: "/",
    icon: Home
  },
  {
    title: "Attendance & Timesheet",
    href: "/attendance",
    icon: Clock
  },
  {
    title: "Employee Directory",
    href: "/employees",
    icon: Users
  },
  {
    title: "Leave Management",
    href: "/leave-requests",
    icon: Calendar
  },
  {
    title: "Payroll",
    href: "/payroll",
    icon: DollarSign
  },
  {
    title: "Announcements",
    href: "/announcements",
    icon: Bell
  },
  {
    title: "Performance",
    href: "/performance",
    icon: TrendingUp
  },
  {
    title: "Reports",
    href: "/reports",
    icon: FileText
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings
  }
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={cn(
        "min-h-screen bg-sidebar text-sidebar-foreground transition-all duration-300",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex items-center justify-between p-4">
        {!collapsed && (
          <h1 className="text-xl font-bold">
            Employ<span className="text-sidebar-foreground">Flow</span>
          </h1>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-sidebar-foreground hover:bg-sidebar-muted hover:text-sidebar-foreground ml-auto"
        >
          {collapsed ? <ChevronRight /> : <ChevronLeft />}
        </Button>
      </div>
      
      <div className="px-2 py-4">
        <nav className="space-y-1">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-3 py-2 rounded-md hover:bg-sidebar-muted transition-colors",
                  isActive ? "bg-sidebar-muted text-white font-medium" : "text-sidebar-foreground",
                  collapsed && "justify-center"
                )
              }
            >
              <item.icon
                className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-3")}
              />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
