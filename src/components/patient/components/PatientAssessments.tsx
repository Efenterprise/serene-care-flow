
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Stethoscope, 
  Plus, 
  Calendar,
  AlertTriangle,
  CheckCircle,
  Eye,
  FileText,
  TrendingUp,
  TrendingDown
} from "lucide-react";

interface PatientAssessmentsProps {
  patientId: string;
}

const PatientAssessments = ({ patientId }: PatientAssessmentsProps) => {
  const assessments = [
    {
      id: "1",
      type: "MDS 3.0 Assessment",
      status: "completed",
      date: "2024-01-16",
      assessor: "RN Coordinator Lisa Johnson",
      dueDate: "2024-01-15",
      scores: {
        cognitive: 8,
        mobility: 12,
        selfCare: 15,
        communication: 4
      },
      summary: "Patient demonstrates mild cognitive impairment with good communication skills. Requires assistance with mobility and some ADLs.",
      priority: "required"
    },
    {
      id: "2",
      type: "Fall Risk Assessment (Morse Scale)",
      status: "completed",
      date: "2024-01-20",
      assessor: "RN Sarah Miller",
      dueDate: "2024-01-20",
      score: 45,
      riskLevel: "moderate",
      factors: ["History of falling", "Gait unsteady", "Uses mobility aid"],
      interventions: ["Bed alarm", "Fall prevention education", "Regular toileting"],
      priority: "routine"
    },
    {
      id: "3",
      type: "Braden Scale (Pressure Ulcer Risk)",
      status: "completed",
      date: "2024-01-19",
      assessor: "RN Jennifer Adams",
      dueDate: "2024-01-19",
      score: 18,
      riskLevel: "low",
      factors: ["Good nutrition", "Mobile with assistance", "Dry skin"],
      interventions: ["Routine skin assessment", "Position changes Q2H"],
      priority: "routine"
    },
    {
      id: "4",
      type: "Pain Assessment",
      status: "completed",
      date: "2024-01-20",
      assessor: "RN Sarah Miller",
      dueDate: "2024-01-20",
      score: 3,
      location: "Right hip surgical site",
      quality: "Aching, sharp with movement",
      interventions: ["Pain medication as ordered", "Ice application", "Positioning"],
      priority: "routine"
    },
    {
      id: "5",
      type: "Functional Assessment",
      status: "completed",
      date: "2024-01-18",
      assessor: "PT Michael Rodriguez",
      dueDate: "2024-01-18",
      scores: {
        ambulation: 3,
        transfers: 4,
        stairs: 2,
        balance: 3
      },
      summary: "Patient shows improvement in transfers and ambulation. Requires continued therapy for stair navigation and balance training.",
      priority: "routine"
    },
    {
      id: "6",
      type: "Nutritional Assessment",
      status: "pending",
      assessor: "Dietitian Sarah Chen",
      dueDate: "2024-01-21",
      priority: "routine"
    },
    {
      id: "7",
      type: "Medication Reconciliation",
      status: "overdue",
      assessor: "PharmD Robert Kim",
      dueDate: "2024-01-19",
      priority: "required"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (riskLevel: string) => {
    switch (riskLevel?.toLowerCase()) {
      case 'high':
        return 'text-red-600';
      case 'moderate':
        return 'text-orange-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'required':
        return 'border-l-red-400';
      case 'urgent':
        return 'border-l-orange-400';
      default:
        return 'border-l-blue-400';
    }
  };

  const getScoreInterpretation = (type: string, score: number) => {
    switch (type) {
      case 'Fall Risk Assessment (Morse Scale)':
        if (score >= 45) return { level: 'High Risk', color: 'text-red-600' };
        if (score >= 25) return { level: 'Moderate Risk', color: 'text-orange-600' };
        return { level: 'Low Risk', color: 'text-green-600' };
      case 'Braden Scale (Pressure Ulcer Risk)':
        if (score <= 12) return { level: 'High Risk', color: 'text-red-600' };
        if (score <= 14) return { level: 'Moderate Risk', color: 'text-orange-600' };
        if (score <= 18) return { level: 'Low Risk', color: 'text-yellow-600' };
        return { level: 'Minimal Risk', color: 'text-green-600' };
      case 'Pain Assessment':
        if (score >= 7) return { level: 'Severe', color: 'text-red-600' };
        if (score >= 4) return { level: 'Moderate', color: 'text-orange-600' };
        if (score >= 1) return { level: 'Mild', color: 'text-yellow-600' };
        return { level: 'No Pain', color: 'text-green-600' };
      default:
        return { level: '', color: 'text-gray-600' };
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Clinical Assessments</h3>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Assessment
        </Button>
      </div>

      <div className="space-y-4">
        {assessments.map((assessment) => (
          <Card key={assessment.id} className={`border-l-4 ${getPriorityColor(assessment.priority)} hover:shadow-md transition-shadow`}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center">
                    <Stethoscope className="w-5 h-5 mr-2 text-blue-600" />
                    {assessment.type}
                  </CardTitle>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span>Assessor: {assessment.assessor}</span>
                    <span>•</span>
                    <span>Due: {assessment.dueDate}</span>
                    {assessment.date && (
                      <>
                        <span>•</span>
                        <span>Completed: {assessment.date}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(assessment.status)}>
                    {assessment.status}
                  </Badge>
                  {assessment.status === 'overdue' && (
                    <AlertTriangle className="w-5 h-5 text-red-600" />
                  )}
                  {assessment.status === 'completed' && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                </div>
              </div>
            </CardHeader>
            
            {assessment.status === 'completed' && (
              <CardContent className="space-y-4">
                {/* Scores Display */}
                {assessment.score !== undefined && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-700">Assessment Score</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">{assessment.score}</span>
                        {assessment.type && (
                          <span className={`text-sm font-medium ${getScoreInterpretation(assessment.type, assessment.score).color}`}>
                            {getScoreInterpretation(assessment.type, assessment.score).level}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* MDS Scores */}
                {assessment.scores && (
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(assessment.scores).map(([category, score]) => (
                      <div key={category} className="p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-900 capitalize">{category}</span>
                          <span className="text-lg font-bold text-blue-600">{score}</span>
                        </div>
                        <Progress value={(score / 20) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Risk Factors */}
                {assessment.factors && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Risk Factors</h4>
                    <div className="flex flex-wrap gap-2">
                      {assessment.factors.map((factor, index) => (
                        <Badge key={index} variant="outline" className="bg-orange-50 text-orange-800">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Pain Details */}
                {assessment.location && (
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Location</span>
                      <p className="font-medium">{assessment.location}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Quality</span>
                      <p className="font-medium">{assessment.quality}</p>
                    </div>
                  </div>
                )}

                {/* Interventions */}
                {assessment.interventions && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Recommended Interventions</h4>
                    <ul className="space-y-1">
                      {assessment.interventions.map((intervention, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-700">
                          <CheckCircle className="w-4 h-4 text-green-600 mr-2 flex-shrink-0" />
                          {intervention}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Summary */}
                {assessment.summary && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-1">Assessment Summary</h4>
                    <p className="text-sm text-blue-800">{assessment.summary}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex justify-end space-x-2 pt-4 border-t">
                  <Button size="sm" variant="outline">
                    <Eye className="w-4 h-4 mr-1" />
                    View Full Report
                  </Button>
                  <Button size="sm" variant="outline">
                    <FileText className="w-4 h-4 mr-1" />
                    Print Assessment
                  </Button>
                  <Button size="sm" variant="outline">
                    <Calendar className="w-4 h-4 mr-1" />
                    Schedule Follow-up
                  </Button>
                </div>
              </CardContent>
            )}

            {assessment.status !== 'completed' && (
              <CardContent>
                <div className="flex justify-end space-x-2">
                  {assessment.status === 'pending' && (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Start Assessment
                    </Button>
                  )}
                  {assessment.status === 'overdue' && (
                    <Button size="sm" className="bg-red-600 hover:bg-red-700">
                      Complete Now
                    </Button>
                  )}
                  <Button size="sm" variant="outline">
                    Schedule
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PatientAssessments;
