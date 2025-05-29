import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  FileText, 
  Plus, 
  User,
  Calendar,
  Filter
} from "lucide-react";
import { Resident } from "@/hooks/useResidents";

interface ResidentProgressNotesTabProps {
  resident: Resident;
}

const ResidentProgressNotesTab = ({ resident }: ResidentProgressNotesTabProps) => {
  // Mock progress notes data
  const progressNotes = [
    {
      id: 1,
      date: "2024-01-21 14:30",
      author: "Sarah Johnson, RN",
      discipline: "Nursing",
      type: "Progress Note",
      content: "Resident ambulated 50 feet in hallway with minimal assistance. Vital signs stable. No complaints of pain. Appetite good at lunch. Continue current care plan.",
      tags: ["Mobility", "Vitals", "Nutrition"]
    },
    {
      id: 2,
      date: "2024-01-21 10:15",
      author: "Dr. Michael Smith",
      discipline: "Physician",
      type: "Physician Note",
      content: "Weekly physician visit. Reviewed medications. Blood pressure well controlled on current regimen. Discussed dietary restrictions with resident. Plan to continue current medications.",
      tags: ["Medication Review", "Vital Signs", "Diet"]
    },
    {
      id: 3,
      date: "2024-01-20 16:45",
      author: "Lisa Chen, PT",
      discipline: "Physical Therapy",
      type: "Therapy Note",
      content: "Continued gait training with walker. Resident demonstrated improved balance and confidence. Able to walk 75 feet before fatigue. Recommend increasing therapy frequency.",
      tags: ["Gait Training", "Balance", "Mobility"]
    },
    {
      id: 4,
      date: "2024-01-20 09:00",
      author: "Jennifer Adams, RN",
      discipline: "Nursing",
      type: "Assessment Note",
      content: "Skin assessment completed. Small pressure area noted on left heel, stage I. Pressure relief measures implemented. Wound care nurse consulted.",
      tags: ["Skin Assessment", "Wound Care", "Prevention"]
    },
    {
      id: 5,
      date: "2024-01-19 20:30",
      author: "Mark Thompson, CNA",
      discipline: "Nursing",
      type: "Incident Report",
      content: "Resident found on floor beside bed at 2030. No apparent injury. Resident states slipped while getting up to use bathroom. Vitals stable. Physician notified.",
      tags: ["Fall", "Safety", "Incident"]
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
      case 'speech therapy':
        return 'bg-pink-100 text-pink-800';
      case 'social work':
        return 'bg-teal-100 text-teal-800';
      case 'dietary':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'incident report':
        return 'bg-red-100 text-red-800';
      case 'physician note':
        return 'bg-green-100 text-green-800';
      case 'therapy note':
        return 'bg-purple-100 text-purple-800';
      case 'progress note':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with New Note Button */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Progress Notes</h3>
        <div className="flex space-x-2">
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            New Note
          </Button>
        </div>
      </div>

      {/* Quick Add Note */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Add Progress Note</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Textarea 
              placeholder="Enter progress note content..." 
              className="min-h-[100px]"
            />
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Badge variant="outline">Nursing</Badge>
                <Badge variant="outline">Progress Note</Badge>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                Save Note
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Notes List */}
      <div className="space-y-4">
        {progressNotes.map((note) => (
          <Card key={note.id} className="hover:bg-gray-50">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <User className="w-8 h-8 text-gray-400" />
                  <div>
                    <h4 className="font-semibold">{note.author}</h4>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{note.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getDisciplineColor(note.discipline)}>
                    {note.discipline}
                  </Badge>
                  <Badge className={getTypeColor(note.type)}>
                    {note.type}
                  </Badge>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-gray-700 leading-relaxed">{note.content}</p>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {note.tags.map((tag, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex space-x-2">
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                  <Button size="sm" variant="outline">
                    Reply
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Note Statistics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Notes This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-gray-600">+3 from last week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Most Active Discipline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">Nursing</div>
            <p className="text-xs text-gray-600">8 notes this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Latest Note</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">2 hours ago</div>
            <p className="text-xs text-gray-600">Sarah Johnson, RN</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResidentProgressNotesTab;
