
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Bed, 
  User, 
  Calendar, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Hospital,
  Phone
} from "lucide-react";

interface Unit {
  id: string;
  name: string;
  beds: number;
  occupied: number;
}

interface BedGridProps {
  selectedUnit: string;
  onUnitChange: (unit: string) => void;
  units: Unit[];
}

const BedGrid = ({ selectedUnit, onUnitChange, units }: BedGridProps) => {
  // Mock bed data
  const beds = Array.from({ length: 30 }, (_, i) => {
    const bedNumber = i + 1;
    const isOccupied = Math.random() > 0.2; // 80% occupancy rate
    
    return {
      id: bedNumber,
      number: `${bedNumber.toString().padStart(3, '0')}`,
      status: isOccupied ? 'occupied' : 'available',
      resident: isOccupied ? {
        name: ['Mary Johnson', 'Robert Smith', 'Helen Davis', 'Frank Wilson', 'Sarah Brown'][Math.floor(Math.random() * 5)],
        admitDate: '2024-01-15',
        diagnosis: ['Hip Fracture', 'Stroke Recovery', 'Pneumonia', 'Post-Surgical', 'CHF'][Math.floor(Math.random() * 5)],
        payorSource: ['Medicare A', 'Medicare A + Supp', 'Medicaid', 'Private Pay'][Math.floor(Math.random() * 4)],
        losProjected: Math.floor(Math.random() * 30) + 5,
        alerts: Math.random() > 0.7 ? ['Fall Risk'] : []
      } : null,
      roomType: ['Private', 'Semi-Private', 'Private'][Math.floor(Math.random() * 3)],
      dischargeScheduled: isOccupied && Math.random() > 0.9 ? '2024-01-25' : null
    };
  });

  const getBedStatusColor = (bed: any) => {
    if (bed.status === 'available') return 'bg-green-50 border-green-200 hover:bg-green-100';
    if (bed.dischargeScheduled) return 'bg-orange-50 border-orange-200 hover:bg-orange-100';
    if (bed.resident?.alerts.length > 0) return 'bg-red-50 border-red-200 hover:bg-red-100';
    return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
  };

  const getBedIcon = (bed: any) => {
    if (bed.status === 'available') return <Bed className="w-4 h-4 text-green-600" />;
    if (bed.dischargeScheduled) return <Calendar className="w-4 h-4 text-orange-600" />;
    if (bed.resident?.alerts.length > 0) return <AlertTriangle className="w-4 h-4 text-red-600" />;
    return <User className="w-4 h-4 text-blue-600" />;
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Bed Board</h2>
        <div className="flex items-center space-x-3">
          <Select value={selectedUnit} onValueChange={onUnitChange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {units.map((unit) => (
                <SelectItem key={unit.id} value={unit.id}>
                  {unit.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center space-x-2 text-xs text-gray-600">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-green-200 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-blue-200 rounded"></div>
              <span>Occupied</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-orange-200 rounded"></div>
              <span>Discharge Soon</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 bg-red-200 rounded"></div>
              <span>Alert</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 h-full overflow-y-auto">
        {beds.map((bed) => (
          <Card 
            key={bed.id} 
            className={`${getBedStatusColor(bed)} border cursor-pointer transition-all duration-200 hover:shadow-md`}
          >
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getBedIcon(bed)}
                  <span className="font-semibold text-sm">#{bed.number}</span>
                </div>
                {bed.resident?.alerts.length > 0 && (
                  <Badge variant="destructive" className="text-xs px-1 py-0">
                    {bed.resident.alerts.length}
                  </Badge>
                )}
              </div>

              {bed.status === 'occupied' && bed.resident ? (
                <div className="space-y-1">
                  <p className="font-medium text-xs text-gray-900 truncate">
                    {bed.resident.name}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {bed.resident.diagnosis}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>LOS: {bed.resident.losProjected}d</span>
                    <span>{bed.resident.payorSource}</span>
                  </div>
                  {bed.dischargeScheduled && (
                    <div className="flex items-center text-xs text-orange-600 mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>DC Soon</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-2">
                  <p className="text-xs font-medium text-green-700">Available</p>
                  <p className="text-xs text-gray-600">{bed.roomType}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BedGrid;
