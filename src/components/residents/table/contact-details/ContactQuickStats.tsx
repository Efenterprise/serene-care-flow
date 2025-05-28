
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Phone, 
  Heart, 
  Shield, 
  Users 
} from "lucide-react";

interface ContactQuickStatsProps {
  emergencyCount: number;
  medicalCount: number;
  legalCount: number;
  totalCount: number;
}

const ContactQuickStats = ({ 
  emergencyCount, 
  medicalCount, 
  legalCount, 
  totalCount 
}: ContactQuickStatsProps) => {
  return (
    <div className="p-4 bg-white border-b">
      <div className="grid grid-cols-4 gap-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Total Contacts</p>
            <p className="text-lg font-bold text-blue-600">{totalCount}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-red-100 rounded-lg">
            <Phone className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Emergency</p>
            <p className="text-lg font-bold text-red-600">{emergencyCount}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <Heart className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Medical</p>
            <p className="text-lg font-bold text-green-600">{medicalCount}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Shield className="w-5 h-5 text-orange-600" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-900">Legal/POA</p>
            <p className="text-lg font-bold text-orange-600">{legalCount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactQuickStats;
