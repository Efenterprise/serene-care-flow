
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Shield,
  Settings,
  Brain,
  Plug,
  ChevronRight
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Residents",
    url: "/residents",
    icon: Users,
  },
  {
    title: "EMR Integration",
    url: "/emr",
    icon: Stethoscope,
  },
  {
    title: "AI Insights",
    url: "/insights/ai-proact",
    icon: Brain,
  },
];

const adminItems = [
  {
    title: "Admin Dashboard",
    url: "/admin",
    icon: Shield,
  },
  {
    title: "Integrations",
    url: "/admin/integrations",
    icon: Plug,
  },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const collapsed = state === "collapsed";

  const isActive = (path: string) => currentPath === path;
  const isExpanded = navigationItems.some((item) => isActive(item.url)) || 
                    adminItems.some((item) => isActive(item.url));

  const getNavClassName = (path: string) => {
    const baseClasses = "flex items-center w-full";
    return isActive(path) 
      ? `${baseClasses} bg-blue-100 text-blue-700 font-medium` 
      : `${baseClasses} text-gray-700 hover:bg-gray-100`;
  };

  return (
    <Sidebar className={collapsed ? "w-16" : "w-64"} collapsible>
      <SidebarContent className="bg-white border-r">
        {/* Header */}
        <div className="p-4 border-b">
          {!collapsed && (
            <div>
              <h2 className="text-lg font-semibold text-gray-900">ResidentCare Pro</h2>
              <p className="text-sm text-gray-600">Healthcare Management</p>
            </div>
          )}
          <SidebarTrigger className={collapsed ? "mx-auto mt-2" : "mt-2"} />
        </div>

        {/* Main Navigation */}
        <SidebarGroup defaultOpen={isExpanded}>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName(item.url)}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Admin Section */}
        <SidebarGroup defaultOpen={adminItems.some((item) => isActive(item.url))}>
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Administration
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {adminItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavClassName(item.url)}>
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="ml-3">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
