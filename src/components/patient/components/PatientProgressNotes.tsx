
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  FileText, 
  Plus, 
  User, 
  Clock,
  Filter,
  Edit,
  Eye
} from "lucide-react";

interface PatientProgressNotesProps {
  patientId: string;
}

const PatientProgressNotes = ({ patientId }: PatientProgressNotesProps) => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const progressNotes = [
    {
      id: "1",
      date: "2024-01-20",
      time: "08:30",
      discipline: "Nursing",
      staff: "RN Sarah Miller",
      note: "Patient ambulated 50 feet with walker in hallway. No shortness of breath or distress noted. Vital signs stable. Patient reports pain level 3/10 at surgical site, managed with prescribed medication. Incision site clean, dry, and intact with no signs of infection.",
      priority: "routine"
    },
    {
      id: "2",
      date: "2024-01-19",
      time: "14:15",
      discipline: "Physical Therapy",
      staff: "PT Michael Rodriguez",
      note: "Physical therapy session completed. Patient demonstrated improved strength in affected leg. Gait training with walker progressing well. Patient able to negotiate 5 steps with minimal assistance. Goals for next session: increase ambulation distance to 75 feet and practice stair climbing.",
      priority: "routine"
    },
    {
      id: "3",
      date: "2024-01-19",
      time: "09:00",
      discipline: "Physician",
      staff: "Dr. Sarah Wilson",
      note: "Post-operative follow-up. Surgical site healing well. Patient reports decreased pain and improved mobility. X-ray shows good implant positioning. Cleared for increased weight bearing as tolerated. Plan to continue current therapy regimen and reassess in 1 week.",
      priority: "important"
    },
    {
      id: "4",
      date: "2024-01-18",
      time: "20:00",
      discipline: "Nursing",
      staff: "RN Jennifer Adams",
      note: "Evening assessment completed. Patient resting comfortably. No acute distress. Medication administration per protocol. Patient education provided regarding fall prevention strategies. Family visit completed, son updated on progress.",
      priority: "routine"
    },
    {
      id: "5",
      date: "2024-01-18",
      time: "10:30",
      discipline: "Occupational Therapy",
      staff: "OT Lisa Chen",
      note: "ADL assessment and training session. Patient demonstrates independence with upper body dressing and grooming. Requires minimal assistance with lower body dressing due to hip precautions. Adaptive equipment provided for dressing stick and sock aid. Patient educated on hip precautions.",
      priority: "routine"
    },
    {
      id: "6",
      date: "2024-01-17",
      time: "16:45",
      discipline: "Social Work",
      staff: "SW Robert Kim",
      note: "Discharge planning meeting with patient and family. Discussed home safety assessment needs and potential modifications. Insurance authorization obtained for home health services. Patient and family express confidence in discharge plan. Follow-up appointment scheduled with orthopedic surgeon.",
      priority: "important"
    }
  ];

  const getDisciplineColor = (discipline: string) => {
    switch (discipline.toLowerCase()) {
      case 'nursing':
        return 'bg-blue-100 text-blue-800';
      case 'physician':
        return 'bg-green-100 text-green-800';
      case 'physical therapy':
        return 'bg-purple-100 text-purple-800';
      case 'occupational therapy':
        return 'bg-orange-100 text-orange-800';
      case 'social work':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'important':
        return 'border-l-red-400';
      case 'urgent':
        return 'border-l-red-600';
      default:
        return 'border-l-blue-400';
    }
  };

  const filteredNotes = selectedFilter === "all" 
    ? progressNotes 
    : progressNotes.filter(note => note.discipline.toLowerCase() === selectedFilter.toLowerCase());

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Progress Notes</h3>
        <div className="flex items-center space-x-3">
          <Select value={selectedFilter} onValueChange={setSelectedFilter}>
            <SelectTrigger className="w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by discipline" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Disciplines</SelectItem>
              <SelectItem value="nursing">Nursing</SelectItem>
              <SelectItem value="physician">Physician</SelectItem>
              <SelectItem value="physical therapy">Physical Therapy</SelectItem>
              <SelectItem value="occupational therapy">Occupational Therapy</SelectItem>
              <SelectItem value="social work">Social Work</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {filteredNotes.map((note) => (
          <Card key={note.id} className={`border-l-4 ${getPriorityColor(note.priority)} hover:shadow-md transition-shadow`}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-gray-500" />
                  <div>
                    <h4 className="font-medium text-gray-900">{note.staff}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Badge className={getDisciplineColor(note.discipline)}>
                        {note.discipline}
                      </Badge>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {note.date} at {note.time}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="w-4 h-4 mr-1" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">{note.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientProgressNotes;
