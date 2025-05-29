
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionC } from "@/types/mds";
import { Brain, Calculator } from "lucide-react";

interface MdsSectionCProps {
  data?: Partial<SectionC>;
  onChange: (data: SectionC) => void;
}

const MdsSectionC = ({ data, onChange }: MdsSectionCProps) => {
  const [formData, setFormData] = useState<SectionC>({
    c0100: '0',
    c0200: '0',
    c0300: '0',
    c0400: '0',
    c0500: '0',
    c0600: '0',
    c0700: '0',
    c0800: '0',
    c0900: '0',
    c1000: '0',
    c1300: '0',
    c1600: '0',
    completed: false,
    ...data
  });

  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  const updateField = (field: keyof SectionC, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Calculate BIMS score automatically
  const calculateBIMSScore = () => {
    const c0200Score = parseInt(formData.c0200) || 0;
    const c0300Score = parseInt(formData.c0300) || 0;
    const c0400Score = parseInt(formData.c0400) || 0;
    const total = c0200Score + c0300Score + c0400Score;
    
    // Auto-update the BIMS summary score
    if (total !== parseInt(formData.c0500)) {
      updateField('c0500', total.toString());
    }
    
    return total;
  };

  useEffect(() => {
    if (formData.c0200 !== '0' || formData.c0300 !== '0' || formData.c0400 !== '0') {
      calculateBIMSScore();
    }
  }, [formData.c0200, formData.c0300, formData.c0400]);

  const bimsScore = calculateBIMSScore();

  return (
    <div className="space-y-8">
      {/* Brief Interview for Mental Status (BIMS) */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Brain className="w-5 h-5 mr-2 text-purple-600" />
            Brief Interview for Mental Status (BIMS)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* C0100 - Should BIMS be conducted */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">C0100. Should Brief Interview for Mental Status be Conducted?</Label>
            <p className="text-sm text-gray-600">
              Attempt to conduct interview if resident appears alert and able to communicate.
            </p>
            <RadioGroup 
              value={formData.c0100} 
              onValueChange={(value) => updateField('c0100', value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="c0100-0" />
                <Label htmlFor="c0100-0">0. No (resident is rarely/never understood)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="c0100-1" />
                <Label htmlFor="c0100-1">1. Yes</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.c0100 === '1' && (
            <>
              {/* C0200 - Repetition of Three Words */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">C0200. Repetition of Three Words</Label>
                <p className="text-sm text-gray-600">
                  Ask resident: "I am going to say three words for you to remember. Please repeat the words after I have said all three. The words are: sock, blue, bed. Now tell me the three words."
                </p>
                <RadioGroup 
                  value={formData.c0200} 
                  onValueChange={(value) => updateField('c0200', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="c0200-0" />
                    <Label htmlFor="c0200-0">0. None</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="c0200-1" />
                    <Label htmlFor="c0200-1">1. One</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="c0200-2" />
                    <Label htmlFor="c0200-2">2. Two</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="c0200-3" />
                    <Label htmlFor="c0200-3">3. Three</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* C0300 - Temporal Orientation */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">C0300. Temporal Orientation</Label>
                <p className="text-sm text-gray-600">
                  Ask resident: "Please tell me what year it is right now." "What month are we in right now?" "What day of the week is today?"
                </p>
                <RadioGroup 
                  value={formData.c0300} 
                  onValueChange={(value) => updateField('c0300', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="c0300-0" />
                    <Label htmlFor="c0300-0">0. No orientation</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="c0300-1" />
                    <Label htmlFor="c0300-1">1. Oriented to year</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="c0300-2" />
                    <Label htmlFor="c0300-2">2. Oriented to month</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="c0300-3" />
                    <Label htmlFor="c0300-3">3. Oriented to day of the week</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* C0400 - Recall */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">C0400. Recall</Label>
                <p className="text-sm text-gray-600">
                  Ask resident: "Let's go back to an earlier question. What were those three words that I asked you to repeat?"
                </p>
                <RadioGroup 
                  value={formData.c0400} 
                  onValueChange={(value) => updateField('c0400', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="c0400-0" />
                    <Label htmlFor="c0400-0">0. Could not recall</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="c0400-1" />
                    <Label htmlFor="c0400-1">1. Could recall one word</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="c0400-2" />
                    <Label htmlFor="c0400-2">2. Could recall two words</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="c0400-3" />
                    <Label htmlFor="c0400-3">3. Could recall three words</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* C0500 - BIMS Summary Score */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">C0500. BIMS Summary Score</Label>
                <div className="flex items-center space-x-4">
                  <Calculator className="w-5 h-5 text-blue-600" />
                  <div className="text-lg font-semibold">
                    Total Score: {bimsScore} / 15
                  </div>
                  <div className="text-sm text-gray-600">
                    {bimsScore >= 13 ? 'Cognitively Intact' : 
                     bimsScore >= 8 ? 'Moderately Impaired' : 
                     'Severely Impaired'}
                  </div>
                </div>
                <Input
                  type="number"
                  value={formData.c0500}
                  onChange={(e) => updateField('c0500', e.target.value)}
                  min="0"
                  max="15"
                  className="w-20"
                  readOnly
                />
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Staff Assessment for Mental Status */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Assessment for Mental Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* C0600 - Should Staff Assessment be conducted */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">C0600. Should Staff Assessment for Mental Status be Conducted?</Label>
            <RadioGroup 
              value={formData.c0600} 
              onValueChange={(value) => updateField('c0600', value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="c0600-0" />
                <Label htmlFor="c0600-0">0. No (BIMS score was 13-15)</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="c0600-1" />
                <Label htmlFor="c0600-1">1. Yes (BIMS could not be completed or score was 0-12)</Label>
              </div>
            </RadioGroup>
          </div>

          {formData.c0600 === '1' && (
            <>
              {/* C0700 - Short-term Memory */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">C0700. Short-term Memory OK</Label>
                <RadioGroup 
                  value={formData.c0700} 
                  onValueChange={(value) => updateField('c0700', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="c0700-0" />
                    <Label htmlFor="c0700-0">0. Memory OK</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="c0700-1" />
                    <Label htmlFor="c0700-1">1. Memory problem</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* C0800 - Long-term Memory */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">C0800. Long-term Memory OK</Label>
                <RadioGroup 
                  value={formData.c0800} 
                  onValueChange={(value) => updateField('c0800', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="c0800-0" />
                    <Label htmlFor="c0800-0">0. Memory OK</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="c0800-1" />
                    <Label htmlFor="c0800-1">1. Memory problem</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* C0900 - Memory/Recall Ability */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">C0900. Memory/Recall Ability</Label>
                <RadioGroup 
                  value={formData.c0900} 
                  onValueChange={(value) => updateField('c0900', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="c0900-0" />
                    <Label htmlFor="c0900-0">0. No problem</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="c0900-1" />
                    <Label htmlFor="c0900-1">1. Problem</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* C1000 - Cognitive Skills for Daily Decision Making */}
              <div className="space-y-4">
                <Label className="text-base font-semibold">C1000. Cognitive Skills for Daily Decision Making</Label>
                <RadioGroup 
                  value={formData.c1000} 
                  onValueChange={(value) => updateField('c1000', value)}
                  className="space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="0" id="c1000-0" />
                    <Label htmlFor="c1000-0">0. Independent - decisions consistent/reasonable</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="1" id="c1000-1" />
                    <Label htmlFor="c1000-1">1. Modified independence - some difficulty in new situations only</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="2" id="c1000-2" />
                    <Label htmlFor="c1000-2">2. Moderately impaired - decisions poor; cues/supervision required</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="3" id="c1000-3" />
                    <Label htmlFor="c1000-3">3. Severely impaired - never/rarely makes decisions</Label>
                  </div>
                </RadioGroup>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Signs and Symptoms of Delirium */}
      <Card>
        <CardHeader>
          <CardTitle>Signs and Symptoms of Delirium</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* C1300 - Signs and Symptoms of Delirium */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">C1300. Signs and Symptoms of Delirium</Label>
            <p className="text-sm text-gray-600">
              Based on direct observation and staff report, does the resident have any of the following signs/symptoms of delirium?
            </p>
            <RadioGroup 
              value={formData.c1300} 
              onValueChange={(value) => updateField('c1300', value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="c1300-0" />
                <Label htmlFor="c1300-0">0. No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="c1300-1" />
                <Label htmlFor="c1300-1">1. Yes</Label>
              </div>
            </RadioGroup>
          </div>

          {/* C1600 - Acute Onset Mental Status Change */}
          <div className="space-y-4">
            <Label className="text-base font-semibold">C1600. Acute Onset Mental Status Change</Label>
            <RadioGroup 
              value={formData.c1600} 
              onValueChange={(value) => updateField('c1600', value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="c1600-0" />
                <Label htmlFor="c1600-0">0. No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="c1600-1" />
                <Label htmlFor="c1600-1">1. Yes</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <div className="border-t pt-4">
        <p className="text-sm text-gray-600">
          This section assesses cognitive patterns through structured interviews and staff observations. 
          The BIMS score and cognitive assessments are critical triggers for Delirium and Cognitive Loss CAAs.
        </p>
      </div>
    </div>
  );
};

export default MdsSectionC;
