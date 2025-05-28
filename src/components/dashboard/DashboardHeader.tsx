
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Bell, User, MessageCircle, Activity } from "lucide-react";
import { Link } from "react-router-dom";

const DashboardHeader = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-gray-900">Serene Care</span>
            </div>
            <Badge variant="secondary">Sunrise Manor SNF</Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/emr">
              <Button variant="ghost" size="sm">
                <Activity className="w-4 h-4 mr-2" />
                EMR Connections
              </Button>
            </Link>
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <User className="w-4 h-4" />
              RN Sarah M.
            </Button>
            <Link to="/">
              <Button variant="outline" size="sm">Exit Demo</Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
