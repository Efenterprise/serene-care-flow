
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Heart, AlertTriangle } from "lucide-react";
import { SectionD } from "@/types/mds";

interface MdsSectionDProps {
  data?: SectionD;
  onChange: (data: SectionD) => void;
}

const MdsSectionD = ({ data, onChange }: MdsSectionDProps) => {
  const [formData, setFormData] = useState<SectionD>({
    d0100: '0',
    d0200: '0',
    d0300: '0',
    d0350: '0',
    d0500: '0',
    d0600: '0',
    completed: false,
    ...data
  });

  const [phq9Score, setPhq9Score] = useState(0);
  const [staffAssessmentScore, setStaffAssessmentScore] = useState(0);

  useEffect(() => {
    // Calculate PHQ-9 score
    const score = parseInt(formData.d0300) || 0;
    setPhq9Score(score);

    // Calculate staff assessment score
    const staffScore = parseInt(formData.d0600) || 0;
    setStaffAssessmentScore(staffScore);
  }, [formData.d0300, formData.d0600]);

  const handleChange = (field: keyof SectionD, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onChange(updatedData);
  };

  const getMoodRiskLevel = (score: number) => {
    if (score >= 15) return { level: 'Severe', color: 'text-red-600', bg: 'bg-red-50' };
    if (score >= 10) return { level: 'Moderate', color: 'text-orange-600', bg: 'bg-orange-50' };
    if (score >= 5) return { level: 'Mild', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { level: 'Minimal', color: 'text-green-600', bg: 'bg-green-50' };
  };

  const phqRisk = getMoodRiskLevel(phq9Score);
  const staffRisk = getMoodRiskLevel(staffAssessmentScore);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="w-5 h-5 mr-2 text-pink-600" />
            Resident Mood Interview (PHQ-9)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* D0100 - Should Resident Mood Interview be Conducted? */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              D0100. Should Resident Mood Interview be Conducted?
            </Label>
            <RadioGroup
              value={formData.d0100}
              onValueChange={(value) => handleChange('d0100', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="d0100-0" />
                <Label htmlFor="d0100-0">No (resident is comatose, in end-stage disease, severely cognitively impaired)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="d0100-1" />
                <Label htmlFor="d0100-1">Yes</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.d0100 === '1' && (
            <>
              {/* D0200 - Resident Mood Interview */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  D0200. Resident Mood Interview (PHQ-9)
                </Label>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800 mb-3">
                    Ask the resident: "Over the last 2 weeks, how often have you been bothered by any of the following problems?"
                  </p>
                  <RadioGroup
                    value={formData.d0200}
                    onValueChange={(value) => handleChange('d0200', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="d0200-0" />
                      <Label htmlFor="d0200-0">Interview completed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="d0200-1" />
                      <Label htmlFor="d0200-1">Interview attempted but not completed</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="d0200-2" />
                      <Label htmlFor="d0200-2">Interview not attempted</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>

              {formData.d0200 === '0' && (
                <>
                  {/* D0300 - PHQ-9 Total Severity Score */}
                  <div className="space-y-3">
                    <Label className="text-base font-medium">
                      D0300. PHQ-9 Total Severity Score
                    </Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <RadioGroup
                        value={formData.d0300}
                        onValueChange={(value) => handleChange('d0300', value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="d0300-0" />
                          <Label htmlFor="d0300-0">0-4 (No/minimal depression)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="d0300-1" />
                          <Label htmlFor="d0300-1">5-9 (Mild depression)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2" id="d0300-2" />
                          <Label htmlFor="d0300-2">10-14 (Moderate depression)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3" id="d0300-3" />
                          <Label htmlFor="d0300-3">15-19 (Moderately severe depression)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="4" id="d0300-4" />
                          <Label htmlFor="d0300-4">20-27 (Severe depression)</Label>
                        </div>
                      </RadioGroup>
                      
                      <div className={`p-4 rounded-lg ${phqRisk.bg}`}>
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className={`w-4 h-4 ${phqRisk.color}`} />
                          <span className={`font-medium ${phqRisk.color}`}>
                            Depression Level: {phqRisk.level}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Staff Assessment for Mood</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* D0350 - Should Staff Assessment for Mood be Conducted? */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              D0350. Should Staff Assessment for Mood be Conducted?
            </Label>
            <RadioGroup
              value={formData.d0350}
              onValueChange={(value) => handleChange('d0350', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="d0350-0" />
                <Label htmlFor="d0350-0">No (resident mood interview was completed)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="d0350-1" />
                <Label htmlFor="d0350-1">Yes (resident mood interview was not completed)</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.d0350 === '1' && (
            <>
              {/* D0500 - Staff Assessment Mental Status Indicators */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  D0500. Staff Assessment Mental Status Indicators
                </Label>
                <p className="text-sm text-gray-600">
                  Based on staff observations over the last 14 days
                </p>
                <RadioGroup
                  value={formData.d0500}
                  onValueChange={(value) => handleChange('d0500', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="d0500-0" />
                    <Label htmlFor="d0500-0">Indicators observed</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="d0500-1" />
                    <Label htmlFor="d0500-1">Indicators not observed</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* D0600 - Total Severity Score */}
              <div className="space-y-3">
                <Label className="text-base font-medium">
                  D0600. Total Severity Score
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <RadioGroup
                    value={formData.d0600}
                    onValueChange={(value) => handleChange('d0600', value)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="d0600-0" />
                      <Label htmlFor="d0600-0">0-2 (No/minimal indicators)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="1" id="d0600-1" />
                      <Label htmlFor="d0600-1">3-5 (Mild indicators)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="2" id="d0600-2" />
                      <Label htmlFor="d0600-2">6-10 (Moderate indicators)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="3" id="d0600-3" />
                      <Label htmlFor="d0600-3">11+ (Severe indicators)</Label>
                    </div>
                  </RadioGroup>
                  
                  <div className={`p-4 rounded-lg ${staffRisk.bg}`}>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className={`w-4 h-4 ${staffRisk.color}`} />
                      <span className={`font-medium ${staffRisk.color}`}>
                        Assessment Level: {staffRisk.level}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {(parseInt(formData.d0300) >= 2 || parseInt(formData.d0600) >= 2) && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>Mood State CAA Triggered:</strong> This assessment indicates potential mood concerns that may require 
            further investigation and care planning. Consider psychiatric consultation and mood-related interventions.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default MdsSectionD;
