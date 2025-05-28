
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
  Loader2
} from "lucide-react";
import { useBeds, useUpdateBedAvailability } from "@/hooks/useBeds";
import { useToast } from "@/hooks/use-toast";

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
  const { data: beds, isLoading } = useBeds();
  const updateBedAvailability = useUpdateBedAvailability();
  const { toast } = useToast();

  const handleBedAvailabilityToggle = async (bedId: string, currentAvailability: boolean) => {
    try {
      await updateBedAvailability.mutateAsync({ 
        id: bedId, 
        is_available: !currentAvailability 
      });
      toast({
        title: "Bed Status Updated",
        description: `Bed is now ${!currentAvailability ? 'available' : 'occupied'}.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update bed status. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getBedStatusColor = (bed: any) => {
    if (bed.is_available) return 'bg-green-50 border-green-200 hover:bg-green-100';
    if (bed.projected_discharge_date) {
      const dischargeDate = new Date(bed.projected_discharge_date);
      const today = new Date();
      const daysUntilDischarge = Math.ceil((dischargeDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      if (daysUntilDischarge <= 3) return 'bg-orange-50 border-orange-200 hover:bg-orange-100';
    }
    return 'bg-blue-50 border-blue-200 hover:bg-blue-100';
  };

  const getBedIcon = (bed: any) => {
    if (bed.is_available) return <Bed className="w-4 h-4 text-green-600" />;
    if (bed.projected_discharge_date) {
      const dischargeDate = new Date(bed.projected_discharge_date);
      const today = new Date();
      const daysUntilDischarge = Math.ceil((dischargeDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      if (daysUntilDischarge <= 3) return <Calendar className="w-4 h-4 text-orange-600" />;
    }
    return <User className="w-4 h-4 text-blue-600" />;
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString();
  };

  const getDaysInBed = (admitDate: string | null) => {
    if (!admitDate) return 0;
    const admit = new Date(admitDate);
    const today = new Date();
    return Math.ceil((today.getTime() - admit.getTime()) / (1000 * 60 * 60 * 24));
  };

  if (isLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

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
          </div>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-3 h-full overflow-y-auto">
        {beds?.map((bed) => (
          <Card 
            key={bed.id} 
            className={`${getBedStatusColor(bed)} border cursor-pointer transition-all duration-200 hover:shadow-md`}
            onClick={() => handleBedAvailabilityToggle(bed.id, bed.is_available || false)}
          >
            <CardContent className="p-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  {getBedIcon(bed)}
                  <span className="font-semibold text-sm">#{bed.bed_number}</span>
                </div>
                {bed.isolation_required && (
                  <Badge variant="destructive" className="text-xs px-1 py-0">
                    ISO
                  </Badge>
                )}
              </div>

              {!bed.is_available ? (
                <div className="space-y-1">
                  <p className="font-medium text-xs text-gray-900">
                    Occupied
                  </p>
                  <p className="text-xs text-gray-600">
                    Room {bed.room_number}
                  </p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>LOS: {getDaysInBed(bed.admit_date)}d</span>
                    <span>{bed.bed_type}</span>
                  </div>
                  {bed.projected_discharge_date && (
                    <div className="flex items-center text-xs text-orange-600 mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>DC {formatDate(bed.projected_discharge_date)}</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-2">
                  <p className="text-xs font-medium text-green-700">Available</p>
                  <p className="text-xs text-gray-600">
                    {bed.bed_type} - Room {bed.room_number}
                  </p>
                  {bed.amenities && bed.amenities.length > 0 && (
                    <p className="text-xs text-gray-500 mt-1">
                      {bed.amenities.join(', ')}
                    </p>
                  )}
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
