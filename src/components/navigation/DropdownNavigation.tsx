import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface DropdownNavigationProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

const DropdownNavigation = ({ onNavigate, currentPath }: DropdownNavigationProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  const menuItems = [
    {
      label: "Dashboard",
      path: "dashboard",
      children: []
    },
    {
      label: "Residents",
      path: "residents",
      children: [
        { label: "All Residents", path: "residents/all" },
        { label: "Admissions Queue", path: "residents/admissions" },
        { label: "Discharges", path: "residents/discharges" },
        { label: "Temporary Leave", path: "residents/temporary-leave" }
      ]
    },
    {
      label: "Referrals & CRM",
      path: "referrals",
      children: [
        { label: "Live Referrals", path: "referrals/live" },
        { label: "Platform Connections", path: "referrals/connections" },
        { label: "Analytics", path: "referrals/analytics" },
        { label: "Performance", path: "referrals/performance" }
      ]
    },
    {
      label: "Therapy",
      path: "therapy",
      children: [
        { label: "Dashboard", path: "therapy/dashboard" },
        { label: "Productivity", path: "therapy/productivity" },
        { label: "Outcomes", path: "therapy/outcomes" },
        { label: "Quality Metrics", path: "therapy/quality" }
      ]
    },
    {
      label: "Clinical",
      path: "clinical",
      children: [
        { label: "MDS Assessments", path: "clinical/mds" },
        { label: "Care Plans", path: "clinical/care-plans" },
        { label: "Quality Metrics", path: "clinical/quality" },
        { label: "Clinical Dashboard", path: "clinical/dashboard" }
      ]
    },
    {
      label: "Communication",
      path: "communication",
      children: [
        { label: "Mass Communication", path: "communication/mass" },
        { label: "Individual Messaging", path: "communication/individual" },
        { label: "Templates", path: "communication/templates" }
      ]
    },
    {
      label: "Documentation",
      path: "documentation",
      children: [
        { label: "Documentation Overview", path: "documentation/overview" },
        { label: "MDS Assessments", path: "documentation/mds" },
        { label: "Care Plans", path: "documentation/care-plans" },
        { label: "Progress Notes", path: "documentation/progress-notes" },
        { label: "Admissions Agreements", path: "documentation/admissions-agreements" },
        { label: "Reports", path: "documentation/reports" }
      ]
    },
    {
      label: "Survey & Regulatory",
      path: "survey",
      children: [
        { label: "Survey Readiness", path: "survey/readiness" },
        { label: "Compliance Tracking", path: "survey/compliance" },
        { label: "Policy Management", path: "survey/policies" },
        { label: "Mock Surveys", path: "survey/mock" },
        { label: "Document Management", path: "survey/documents" },
        { label: "Facility Assessment", path: "survey/assessment" }
      ]
    },
    {
      label: "Reports & Analytics",
      path: "reports",
      children: [
        { label: "Census Reports", path: "reports/census" },
        { label: "Quality Metrics", path: "reports/quality" },
        { label: "Financial Reports", path: "reports/financial" },
        { label: "Compliance Reports", path: "reports/compliance" }
      ]
    },
    {
      label: "Maintenance",
      path: "maintenance",
      children: [
        { label: "Work Orders", path: "maintenance/work-orders" },
        { label: "Preventive Maintenance", path: "maintenance/preventive" },
        { label: "Asset Management", path: "maintenance/assets" }
      ]
    },
    {
      label: "Admin",
      path: "admin",
      children: [
        { label: "User Management", path: "admin/users" },
        { label: "Facility Settings", path: "admin/facility" },
        { label: "Integrations", path: "admin/integrations" },
        { label: "Audit Trail", path: "admin/audit" },
        { label: "Configurations", path: "admin/configurations" }
      ]
    }
  ];

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-6 py-3">
        <div className="flex items-center justify-between">
          <div className="text-xl font-semibold text-gray-800">
            LTC Ally
          </div>
          <div className="space-x-4 flex items-center">
            {/* Navigation Links */}
            {menuItems.map((item) => (
              item.children && item.children.length > 0 ? (
                <DropdownMenu key={item.label}>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-sm">
                      {item.label}
                      <ChevronDown className="w-4 h-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">
                    {item.children.map((child) => (
                      <DropdownMenuItem key={child.path} onClick={() => onNavigate(child.path)}>
                        {child.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button variant="ghost" key={item.label} onClick={() => onNavigate(item.path)} className="text-sm">
                  {item.label}
                </Button>
              )
            ))}

            {/* User Dropdown */}
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-sm">
                  Account <ChevronDown className="w-4 h-4 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => onNavigate('admin/users')}>
                  Manage Users
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onNavigate('admin/facility')}>
                  Facility Settings
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DropdownNavigation;
