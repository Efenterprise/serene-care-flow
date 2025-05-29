
import { useState } from "react";
import { ChevronDown, Search, Bell, Settings } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AuthStatus from "@/components/auth/AuthStatus";

interface NavigationItem {
  label: string;
  items: { label: string; path: string; description?: string }[];
}

interface DropdownNavigationProps {
  onNavigate: (path: string) => void;
  currentPath: string;
}

const navigationConfig: NavigationItem[] = [
  {
    label: "Clinical",
    items: [
      { label: "MDS Assessments", path: "clinical/mds", description: "MDS 3.0 assessments and forms" },
      { label: "Care Area Assessments", path: "clinical/caa", description: "CAA triggers and documentation" },
      { label: "Care Plans", path: "clinical/care-plans", description: "Resident care planning" },
      { label: "Progress Notes", path: "clinical/progress-notes", description: "Clinical documentation" },
      { label: "Quality Measures", path: "clinical/quality", description: "Clinical quality metrics" },
    ]
  },
  {
    label: "Residents",
    items: [
      { label: "Resident Directory", path: "residents/directory", description: "All residents overview" },
      { label: "Add New Resident", path: "residents/add", description: "Admit new resident" },
      { label: "Admissions Queue", path: "residents/admissions", description: "Pending admissions" },
      { label: "Resident Profiles", path: "residents/profiles", description: "Individual resident details" },
    ]
  },
  {
    label: "Documentation",
    items: [
      { label: "MDS Forms", path: "documentation/mds", description: "MDS form management" },
      { label: "Physician Orders", path: "documentation/orders", description: "Medical orders tracking" },
      { label: "Incident Reports", path: "documentation/incidents", description: "Safety and incident documentation" },
      { label: "Document Library", path: "documentation/library", description: "Document templates and forms" },
    ]
  },
  {
    label: "Reports",
    items: [
      { label: "Quality Measures", path: "reports/quality", description: "Quality indicator reports" },
      { label: "Census Reports", path: "reports/census", description: "Occupancy and census data" },
      { label: "MDS Reports", path: "reports/mds", description: "MDS compliance and analytics" },
      { label: "Financial Reports", path: "reports/financial", description: "Revenue and billing reports" },
    ]
  },
  {
    label: "Communication",
    items: [
      { label: "Messaging Hub", path: "communication/messages", description: "Internal messaging system" },
      { label: "Family Communication", path: "communication/family", description: "Family notifications and updates" },
      { label: "Alerts & Notifications", path: "communication/alerts", description: "System alerts and reminders" },
      { label: "Communication Templates", path: "communication/templates", description: "Message templates" },
    ]
  },
  {
    label: "Administration",
    items: [
      { label: "User Management", path: "admin/users", description: "Staff accounts and permissions" },
      { label: "System Settings", path: "admin/settings", description: "Application configuration" },
      { label: "Audit Logs", path: "admin/audit", description: "System activity tracking" },
      { label: "EMR Integrations", path: "admin/integrations", description: "External system connections" },
    ]
  }
];

const DropdownNavigation = ({ onNavigate, currentPath }: DropdownNavigationProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleNavigation = (path: string) => {
    onNavigate(path);
  };

  const isCurrentPath = (path: string) => {
    return currentPath.includes(path);
  };

  const getActiveSection = () => {
    for (const section of navigationConfig) {
      if (section.items.some(item => isCurrentPath(item.path))) {
        return section.label;
      }
    }
    return null;
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3">
      <div className="flex items-center justify-between">
        {/* Left side - Logo and Navigation */}
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-blue-600">ResidentCare Pro</h1>
          </div>
          
          {/* Navigation Dropdowns */}
          <nav className="flex items-center space-x-1">
            {navigationConfig.map((section) => (
              <DropdownMenu key={section.label}>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className={`
                      flex items-center space-x-1 px-3 py-2 text-sm font-medium
                      ${getActiveSection() === section.label 
                        ? 'bg-blue-50 text-blue-700 border-b-2 border-blue-500' 
                        : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                      }
                    `}
                  >
                    <span>{section.label}</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-64 p-2">
                  <DropdownMenuLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                    {section.label}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {section.items.map((item) => (
                    <DropdownMenuItem
                      key={item.path}
                      onClick={() => handleNavigation(item.path)}
                      className={`
                        p-3 cursor-pointer rounded-md transition-colors
                        ${isCurrentPath(item.path) 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'hover:bg-gray-50'
                        }
                      `}
                    >
                      <div>
                        <div className="font-medium text-sm">{item.label}</div>
                        {item.description && (
                          <div className="text-xs text-gray-500 mt-1">{item.description}</div>
                        )}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}
          </nav>
        </div>

        {/* Right side - Search and User Actions */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64 h-9"
            />
          </div>
          
          <AuthStatus />
          
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>
          
          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DropdownNavigation;
