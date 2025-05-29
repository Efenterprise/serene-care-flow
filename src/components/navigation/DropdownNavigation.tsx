import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
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
      label: "Home",
      path: "dashboard",
      children: []
    },
    {
      label: "Clinical",
      path: "clinical",
      children: [
        // People group
        { label: "All Residents", path: "residents/all", group: "People" },
        { label: "Staff on Duty", path: "admin/users", group: "People" },
        
        // Care Management group
        { label: "Clinical Dashboard", path: "clinical/dashboard", group: "Care Management" },
        { label: "MDS Assessments", path: "clinical/mds", group: "Care Management" },
        { label: "Care Plans", path: "clinical/care-plans", group: "Care Management" },
        { label: "Quality Metrics", path: "clinical/quality", group: "Care Management" },
        
        // Therapy group
        { label: "Therapy Dashboard", path: "therapy/dashboard", group: "Therapy" },
        { label: "Therapy Productivity", path: "therapy/productivity", group: "Therapy" },
        { label: "Therapy Outcomes", path: "therapy/outcomes", group: "Therapy" },
        { label: "Therapy Quality", path: "therapy/quality", group: "Therapy" },
        
        // Quick Entry group
        { label: "Progress Notes", path: "documentation/progress-notes", group: "Quick Entry" },
        { label: "Clinical Documentation", path: "clinical/documentation", group: "Quick Entry" }
      ]
    },
    {
      label: "Admin",
      path: "admin",
      children: [
        // People group
        { label: "All Residents", path: "residents/all", group: "People" },
        { label: "Staff Management", path: "admin/users", group: "People" },
        { label: "Medical Professionals", path: "admin/providers", group: "People" },
        
        // Actions group
        { label: "Admissions Queue", path: "residents/admissions", group: "Actions" },
        { label: "Discharges", path: "residents/discharges", group: "Actions" },
        { label: "Temporary Leave", path: "residents/temporary-leave", group: "Actions" },
        
        // System Management group
        { label: "Facility Settings", path: "admin/facility", group: "System Management" },
        { label: "Configurations", path: "admin/configurations", group: "System Management" },
        { label: "Integrations", path: "admin/integrations", group: "System Management" },
        { label: "EMR Integration", path: "emr", group: "System Management" },
        
        // Maintenance group
        { label: "Work Orders", path: "maintenance/work-orders", group: "Maintenance" },
        { label: "Preventive Maintenance", path: "maintenance/preventive", group: "Maintenance" },
        { label: "Asset Management", path: "maintenance/assets", group: "Maintenance" },
        
        // Other group
        { label: "Audit Trail", path: "admin/audit", group: "Other" },
        { label: "AI Insights", path: "insights/ai-proact", group: "Other" }
      ]
    },
    {
      label: "Document Manager",
      path: "documents",
      children: [
        // Admissions group
        { label: "Admissions Agreements", path: "documentation/admissions-agreements", group: "Admissions" },
        { label: "Admission Forms", path: "documentation/admission-forms", group: "Admissions" },
        
        // Clinical group
        { label: "MDS Documentation", path: "documentation/mds", group: "Clinical" },
        { label: "Care Plans", path: "documentation/care-plans", group: "Clinical" },
        { label: "Progress Notes", path: "documentation/progress-notes", group: "Clinical" },
        
        // Regulatory group
        { label: "Policy Management", path: "survey/policies", group: "Regulatory" },
        { label: "Compliance Documents", path: "survey/compliance", group: "Regulatory" },
        
        // Archive group
        { label: "Document Archive", path: "documentation/overview", group: "Archive" },
        { label: "Document Templates", path: "documentation/templates", group: "Archive" }
      ]
    },
    {
      label: "CRM",
      path: "crm",
      children: [
        // Referrals group
        { label: "Live Referrals", path: "referrals/live", group: "Referrals" },
        { label: "Platform Connections", path: "referrals/connections", group: "Referrals" },
        { label: "Referral Analytics", path: "referrals/analytics", group: "Referrals" },
        
        // Communications group
        { label: "Mass Communication", path: "communication/mass", group: "Communications" },
        { label: "Individual Messaging", path: "communication/individual", group: "Communications" },
        { label: "Message Templates", path: "communication/templates", group: "Communications" },
        
        // Performance group
        { label: "Performance Metrics", path: "referrals/performance", group: "Performance" },
        { label: "CRM Analytics", path: "crm/analytics", group: "Performance" }
      ]
    },
    {
      label: "Reports",
      path: "reports",
      children: [
        // Census group
        { label: "Daily Census", path: "reports/census", group: "Census" },
        { label: "Occupancy Reports", path: "reports/occupancy", group: "Census" },
        
        // Clinical group
        { label: "Quality Metrics", path: "reports/quality", group: "Clinical" },
        { label: "Clinical Outcomes", path: "reports/clinical-outcomes", group: "Clinical" },
        
        // Financial group
        { label: "Revenue Reports", path: "reports/financial", group: "Financial" },
        { label: "Collections", path: "reports/collections", group: "Financial" },
        
        // Regulatory group
        { label: "Survey Readiness", path: "survey/readiness", group: "Regulatory" },
        { label: "Compliance Tracking", path: "survey/compliance", group: "Regulatory" },
        { label: "Mock Surveys", path: "survey/mock", group: "Regulatory" },
        { label: "Facility Assessment", path: "survey/assessment", group: "Regulatory" }
      ]
    }
  ];

  const renderGroupedMenuItems = (items: any[]) => {
    const groupedItems = items.reduce((acc, item) => {
      const group = item.group || 'Other';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(item);
      return acc;
    }, {} as Record<string, any[]>);

    const groups = Object.keys(groupedItems);
    
    return groups.map((groupName, groupIndex) => (
      <div key={groupName}>
        {groupIndex > 0 && <DropdownMenuSeparator />}
        <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 py-1">
          {groupName}
        </DropdownMenuLabel>
        {groupedItems[groupName].map((item) => (
          <DropdownMenuItem key={item.path} onClick={() => onNavigate(item.path)}>
            {item.label}
          </DropdownMenuItem>
        ))}
      </div>
    ));
  };

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
                  <DropdownMenuContent className="w-56 max-h-96 overflow-y-auto">
                    {renderGroupedMenuItems(item.children)}
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
