
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Users, Send, Clock } from "lucide-react";
import CommunicationDashboard from "./CommunicationDashboard";
import IndividualMessaging from "./IndividualMessaging";
import MassCommunication from "./MassCommunication";
import MessageTemplates from "./MessageTemplates";

const CommunicationContent = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Communication Hub</h2>
        <p className="text-gray-600">Manage all resident and family communications from one central location</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard" className="flex items-center space-x-2">
            <MessageSquare className="w-4 h-4" />
            <span>Dashboard</span>
          </TabsTrigger>
          <TabsTrigger value="individual" className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Individual</span>
          </TabsTrigger>
          <TabsTrigger value="mass" className="flex items-center space-x-2">
            <Send className="w-4 h-4" />
            <span>Mass Messages</span>
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center space-x-2">
            <Clock className="w-4 h-4" />
            <span>Templates</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard">
          <CommunicationDashboard />
        </TabsContent>

        <TabsContent value="individual">
          <IndividualMessaging />
        </TabsContent>

        <TabsContent value="mass">
          <MassCommunication />
        </TabsContent>

        <TabsContent value="templates">
          <MessageTemplates />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CommunicationContent;
