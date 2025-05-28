import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Bell, 
  Settings, 
  Home, 
  Users, 
  Activity, 
  BarChart3, 
  FileText, 
  UserCheck, 
  TrendingUp,
  Building2,
  ChevronDown,
  User,
  LogOut,
  HelpCircle
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const DashboardHeader = () => {
  const navigate = useNavigate();
  const [selectedFacility, setSelectedFacility] = useState("Sunrise Senior Living");

  const facilities = [
    { id: 1, name: "Sunrise Senior Living", type: "facility" },
    { id: 2, name: "Oakwood Care Center", type: "facility" },
    { id: 3, name: "Meadowbrook Healthcare", type: "facility" },
    { id: 4, name: "Corporate View", type: "corporate" }
  ];

  const navigationItems = [
    {
      title: "Home",
      icon: Home,
      items: [
        { title: "Dashboard Overview", href: "/dashboard" },
        { title: "Quick Stats", href: "/dashboard/stats" },
        { title: "Recent Activity", href: "/dashboard/activity" },
        { title: "Alerts & Notifications", href: "/dashboard/alerts" }
      ]
    },
    {
      title: "Admin",
      icon: Users,
      items: [
        { title: "User Management", href: "/admin/users" },
        { title: "Audit Trails", href: "/admin/audit" },
        { title: "System Settings", href: "/admin/settings" },
        { title: "Facility Configuration", href: "/admin/facility" },
        { title: "Security & Permissions", href: "/admin/security" }
      ]
    },
    {
      title: "Clinical",
      icon: Activity,
      items: [
        { title: "Residents Management", href: "/residents" },
        { title: "Patient Care", href: "/clinical/care" },
        { title: "Assessments", href: "/clinical/assessments" },
        { title: "Care Plans", href: "/clinical/careplans" },
        { title: "Medication Management", href: "/clinical/medications" },
        { title: "Vitals & Monitoring", href: "/clinical/vitals" },
        { title: "Quality Metrics", href: "/clinical/quality" }
      ]
    },
    {
      title: "Insights",
      icon: BarChart3,
      items: [
        { title: "AI Proact", href: "/insights/ai-proact" },
        { title: "Analytics Dashboard", href: "/insights/analytics" },
        { title: "Performance Reports", href: "/insights/performance" },
        { title: "Quality Indicators", href: "/insights/quality" },
        { title: "Financial Analytics", href: "/insights/financial" },
        { title: "Trend Analysis", href: "/insights/trends" }
      ]
    },
    {
      title: "Document Manager",
      icon: FileText,
      items: [
        { title: "Patient Records", href: "/documents/records" },
        { title: "Compliance Forms", href: "/documents/compliance" },
        { title: "Policies & Procedures", href: "/documents/policies" },
        { title: "Templates", href: "/documents/templates" }
      ]
    },
    {
      title: "CRM",
      icon: UserCheck,
      items: [
        { title: "Referral Management", href: "/crm/referrals" },
        { title: "Admissions", href: "/crm/admissions" },
        { title: "Discharge Planning", href: "/crm/discharge" },
        { title: "Family Communications", href: "/crm/communications" }
      ]
    },
    {
      title: "Reports",
      icon: TrendingUp,
      items: [
        { title: "Census Reports", href: "/reports/census" },
        { title: "Financial Reports", href: "/reports/financial" },
        { title: "Quality Reports", href: "/reports/quality" },
        { title: "Regulatory Reports", href: "/reports/regulatory" },
        { title: "Custom Reports", href: "/reports/custom" }
      ]
    }
  ];

  return (
    <header className="bg-white/95 backdrop-blur-sm border-b border-blue-100 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2">
            <Activity className="w-8 h-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">HealthCare Pro</span>
          </div>

          {/* Main Navigation Menu */}
          <div className="flex items-center space-x-1">
            {navigationItems.map((item) => (
              <DropdownMenu key={item.title}>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="bg-transparent hover:bg-blue-50 data-[state=open]:bg-blue-50">
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.title}
                    <ChevronDown className="w-4 h-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-80 bg-white border border-gray-200 shadow-lg z-50">
                  <div className="p-4">
                    <div className="grid gap-2">
                      {item.items.map((subItem) => (
                        <DropdownMenuItem
                          key={subItem.title}
                          className="px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-colors cursor-pointer"
                          onClick={() => navigate(subItem.href)}
                        >
                          {subItem.title}
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </div>
        </div>

        {/* Right side - Facility Selector, User Profile, and Controls */}
        <div className="flex items-center space-x-4">
          {/* Facility Selector */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white border-blue-200 hover:bg-blue-50">
                <Building2 className="w-4 h-4 mr-2" />
                {selectedFacility}
                <ChevronDown className="w-4 h-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 bg-white border border-gray-200 shadow-lg z-50">
              <DropdownMenuLabel>Select Facility</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {facilities.map((facility) => (
                <DropdownMenuItem
                  key={facility.id}
                  onClick={() => setSelectedFacility(facility.name)}
                  className={`cursor-pointer ${facility.type === 'corporate' ? 'bg-blue-50 font-medium' : ''}`}
                >
                  <Building2 className="w-4 h-4 mr-2" />
                  {facility.name}
                  {facility.type === 'corporate' && (
                    <Badge variant="outline" className="ml-auto text-xs">
                      Corporate
                    </Badge>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-2 px-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-blue-100 text-blue-700">DU</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium text-gray-900">Demo User</p>
                  <Badge className="bg-blue-100 text-blue-800 text-xs">Administrator</Badge>
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 bg-white border border-gray-200 shadow-lg z-50">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="w-4 h-4 mr-2" />
                Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="w-4 h-4 mr-2" />
                Preferences
              </DropdownMenuItem>
              <DropdownMenuItem>
                <HelpCircle className="w-4 h-4 mr-2" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs"></span>
          </Button>

          {/* Home Button */}
          <Button variant="outline" size="icon" onClick={() => navigate('/')}>
            <Home className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
