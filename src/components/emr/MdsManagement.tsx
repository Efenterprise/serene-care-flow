
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import MdsMetrics from "./mds/MdsMetrics";
import MdsSearchFilters from "./mds/MdsSearchFilters";
import MdsAssessmentList from "./mds/MdsAssessmentList";

const MdsManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock MDS data
  const mdsAssessments = [
    {
      id: "1",
      patientName: "John Smith",
      mrn: "MRN12345",
      assessmentType: "Admission",
      dueDate: "2024-01-15",
      status: "completed",
      completedBy: "Jane Doe, RN",
      lastModified: "2024-01-14"
    },
    {
      id: "2",
      patientName: "Mary Johnson",
      mrn: "MRN12346",
      assessmentType: "Quarterly",
      dueDate: "2024-01-18",
      status: "in_progress",
      completedBy: "Mike Wilson, RN",
      lastModified: "2024-01-12"
    },
    {
      id: "3",
      patientName: "Robert Davis",
      mrn: "MRN12347",
      assessmentType: "Annual",
      dueDate: "2024-01-20",
      status: "overdue",
      completedBy: "",
      lastModified: "2024-01-10"
    },
    {
      id: "4",
      patientName: "Susan Brown",
      mrn: "MRN12348",
      assessmentType: "Discharge",
      dueDate: "2024-01-16",
      status: "pending",
      completedBy: "",
      lastModified: "2024-01-13"
    }
  ];

  const overdueCount = mdsAssessments.filter(a => a.status === 'overdue').length;
  const completedCount = mdsAssessments.filter(a => a.status === 'completed').length;
  const inProgressCount = mdsAssessments.filter(a => a.status === 'in_progress').length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">MDS Management</h2>
          <p className="text-gray-600">Minimum Data Set assessments and compliance tracking</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <FileText className="w-4 h-4 mr-2" />
          New Assessment
        </Button>
      </div>

      <MdsMetrics 
        completedCount={completedCount}
        inProgressCount={inProgressCount}
        overdueCount={overdueCount}
      />

      <MdsSearchFilters 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <MdsAssessmentList assessments={mdsAssessments} />
    </div>
  );
};

export default MdsManagement;
