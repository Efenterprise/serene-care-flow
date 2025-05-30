
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Building, Globe } from "lucide-react";

interface Facility {
  id: string;
  name: string;
  location: string;
  totalBeds: number;
  occupancy: number;
}

interface FacilitySelectorProps {
  onFacilityChange: (facilityId: string) => void;
  selectedFacility: string;
}

const FacilitySelector = ({ onFacilityChange, selectedFacility }: FacilitySelectorProps) => {
  // Mock facility data - would come from API
  const facilities: Facility[] = [
    {
      id: 'all',
      name: 'Corporate View - All Facilities',
      location: 'Nationwide',
      totalBeds: 450,
      occupancy: 89
    },
    {
      id: 'facility-1',
      name: 'Sunnydale Care Center',
      location: 'Phoenix, AZ',
      totalBeds: 120,
      occupancy: 92
    },
    {
      id: 'facility-2',
      name: 'Riverside Manor',
      location: 'Tampa, FL',
      totalBeds: 150,
      occupancy: 88
    },
    {
      id: 'facility-3',
      name: 'Mountain View Healthcare',
      location: 'Denver, CO',
      totalBeds: 100,
      occupancy: 85
    },
    {
      id: 'facility-4',
      name: 'Oceanside Rehabilitation',
      location: 'San Diego, CA',
      totalBeds: 80,
      occupancy: 94
    }
  ];

  const selectedFacilityData = facilities.find(f => f.id === selectedFacility);

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              {selectedFacility === 'all' ? (
                <Globe className="w-5 h-5 text-blue-600" />
              ) : (
                <Building className="w-5 h-5 text-blue-600" />
              )}
              <label className="text-sm font-medium text-gray-700">Facility:</label>
            </div>
            
            <Select value={selectedFacility} onValueChange={onFacilityChange}>
              <SelectTrigger className="w-80">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {facilities.map((facility) => (
                  <SelectItem key={facility.id} value={facility.id}>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-center space-x-2">
                        {facility.id === 'all' ? (
                          <Globe className="w-4 h-4 text-blue-600" />
                        ) : (
                          <Building className="w-4 h-4 text-gray-600" />
                        )}
                        <span>{facility.name}</span>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedFacilityData && (
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-1">
                <span className="font-medium">Location:</span>
                <span>{selectedFacilityData.location}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-medium">Beds:</span>
                <span>{selectedFacilityData.totalBeds}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span className="font-medium">Occupancy:</span>
                <span className={`font-semibold ${
                  selectedFacilityData.occupancy >= 90 ? 'text-green-600' : 
                  selectedFacilityData.occupancy >= 80 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {selectedFacilityData.occupancy}%
                </span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FacilitySelector;
