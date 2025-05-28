
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Settings, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DashboardHeader = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Healthcare Management System</h1>
          <p className="text-sm text-gray-600">Demo Version - Patient Care Platform</p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">Demo User</p>
              <Badge className="bg-blue-100 text-blue-800">Administrator</Badge>
            </div>
          </div>
          
          <Button variant="outline" size="icon">
            <Bell className="h-4 w-4" />
          </Button>

          <Button variant="outline" size="icon" onClick={() => navigate('/')}>
            <Home className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
