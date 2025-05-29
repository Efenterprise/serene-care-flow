
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  LayoutDashboard, 
  Users, 
  Activity,
  FileText, 
  MessageSquare, 
  Settings, 
  Brain,
  Stethoscope,
  Building2,
  ClipboardList,
  Search,
  BarChart3,
  Wrench,
  Shield,
  ChevronDown
} from "lucide-react";

interface DropdownNavigationProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

const DropdownNavigation = ({ onNavigate, currentPath }: DropdownNavigationProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleNavigate = (path: string) => {
    onNavigate(path);
    setOpenDropdown(null);
  };

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + "/");

  const navigationItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      path: "dashboard",
      items: []
    },
    {
      key: "residents",
      label: "Residents",
      icon: Users,
      path: "residents",
      items: [
        { label: "All Residents", path: "residents/all" },
        { label: "Admissions Queue", path: "residents/admissions" },
        { label: "Bed Board", path: "residents/beds" },
        { label: "Census Report", path: "residents/census" }
      ]
    },
    {
      key: "therapy",
      label: "Therapy",
      icon: Activity,
      path: "therapy",
      badge: "NEW",
      items: [
        { label: "Dashboard", path: "therapy/dashboard" },
        { label: "Patient Management", path: "therapy/patients" },
        { label: "Scheduling", path: "therapy/scheduling" },
        { label: "Documentation", path: "therapy/documentation" },
        { label: "Outcomes", path: "therapy/outcomes" },
        { label: "Telehealth", path: "therapy/telehealth" }
      ]
    },
    {
      key: "clinical",
      label: "Clinical",
      icon: Stethoscope,
      path: "clinical",
      items: [
        { label: "Care Plans", path: "clinical/care-plans" },
        { label: "Assessments", path: "clinical/assessments" },
        { label: "MDS Management", path: "clinical/mds" },
        { label: "Quality Metrics", path: "clinical/quality" },
        { label: "Clinical Alerts", path: "clinical/alerts" }
      ]
    },
    {
      key: "communication",
      label: "Communication",
      icon: MessageSquare,
      path: "communication",
      items: [
        { label: "Family Portal", path: "communication/family" },
        { label: "Staff Messages", path: "communication/staff" },
        { label: "Mass Communication", path: "communication/mass" },
        { label: "Templates", path: "communication/templates" }
      ]
    },
    {
      key: "documentation",
      label: "Documentation",
      icon: FileText,
      path: "documentation",
      items: [
        { label: "MDS Assessments", path: "documentation/mds" },
        { label: "Care Plans", path: "documentation/care-plans" },
        { label: "Progress Notes", path: "documentation/notes" },
        { label: "Reports", path: "documentation/reports" }
      ]
    },
    {
      key: "survey",
      label: "Survey & Regulatory",
      icon: Shield,
      path: "survey",
      items: [
        { label: "Survey Readiness", path: "survey/readiness" },
        { label: "Compliance Tracking", path: "survey/compliance" },
        { label: "Policy Management", path: "survey/policies" },
        { label: "Mock Surveys", path: "survey/mock" }
      ]
    },
    {
      key: "reports",
      label: "Reports & Analytics",
      icon: BarChart3,
      path: "reports",
      items: [
        { label: "Census Reports", path: "reports/census" },
        { label: "Financial Reports", path: "reports/financial" },
        { label: "Quality Reports", path: "reports/quality" },
        { label: "Custom Reports", path: "reports/custom" }
      ]
    },
    {
      key: "maintenance",
      label: "Maintenance",
      icon: Wrench,
      path: "maintenance",
      items: [
        { label: "Work Orders", path: "maintenance/orders" },
        { label: "Preventive Maintenance", path: "maintenance/preventive" },
        { label: "Asset Management", path: "maintenance/assets" }
      ]
    },
    {
      key: "admin",
      label: "Administration",
      icon: Settings,
      path: "admin",
      items: [
        { label: "User Management", path: "admin/users" },
        { label: "Facility Settings", path: "admin/facility" },
        { label: "Integration Hub", path: "admin/integrations" },
        { label: "Audit Trail", path: "admin/audit" }
      ]
    },
    {
      key: "ai-insights",
      label: "AI Insights",
      icon: Brain,
      path: "insights/ai-proact",
      badge: "AI",
      items: []
    }
  ];

  return (
    <header className="bg-white border-b shadow-sm">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <Building2 className="w-8 h-8 text-blue-600" />
            <div>
              <h1 className="text-xl font-bold text-gray-900">CareConnect Pro</h1>
              <p className="text-xs text-gray-600">Integrated Care Management</p>
            </div>
          </div>
        </div>

        <nav className="flex items-center space-x-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const hasItems = item.items.length > 0;
            
            if (!hasItems) {
              return (
                <Button
                  key={item.key}
                  variant={isActive(item.path) ? "default" : "ghost"}
                  size="sm"
                  onClick={() => handleNavigate(item.path)}
                  className="relative"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                  {item.badge && (
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              );
            }

            return (
              <DropdownMenu 
                key={item.key} 
                open={openDropdown === item.key}
                onOpenChange={(open) => setOpenDropdown(open ? item.key : null)}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={isActive(item.path) ? "default" : "ghost"}
                    size="sm"
                    className="relative"
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                    {item.badge && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    <ChevronDown className="w-3 h-3 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56">
                  <DropdownMenuItem onClick={() => handleNavigate(item.path)}>
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label} Overview
                  </DropdownMenuItem>
                  {item.items.length > 0 && <DropdownMenuSeparator />}
                  {item.items.map((subItem) => (
                    <DropdownMenuItem 
                      key={subItem.path}
                      onClick={() => handleNavigate(subItem.path)}
                    >
                      {subItem.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          })}
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-medium">JD</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DropdownNavigation;
