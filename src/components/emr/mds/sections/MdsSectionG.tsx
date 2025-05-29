
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Activity, AlertTriangle, TrendingUp } from "lucide-react";
import { SectionG } from "@/types/mds";

interface MdsSectionGProps {
  data?: SectionG;
  onChange: (data: SectionG) => void;
}

const MdsSectionG = ({ data, onChange }: MdsSectionGProps) => {
  const [formData, setFormData] = useState<SectionG>({
    g0110: '0',
    g0120: '0',
    g0130: '0',
    g0140: '0',
    g0150: '0',
    g0160: '0',
    g0170: '0',
    g0180: '0',
    g0190: '0',
    g0200: '0',
    g0300: '0',
    g0400: '0',
    g0600: '0',
    completed: false,
    ...data
  });

  const [adlScore, setAdlScore] = useState(0);
  const [independenceLevel, setIndependenceLevel] = useState('');

  useEffect(() => {
    // Calculate ADL score for HIPPS
    const adlItems = [
      formData.g0110, formData.g0120, formData.g0130, formData.g0140,
      formData.g0170, formData.g0180, formData.g0190, formData.g0200
    ];

    const score = adlItems.reduce((total, item) => {
      const itemScore = parseInt(item) || 0;
      return total + (itemScore > 4 ? 4 : itemScore);
    }, 0);

    setAdlScore(score);

    // Determine independence level
    if (score <= 8) setIndependenceLevel('High Independence');
    else if (score <= 16) setIndependenceLevel('Moderate Independence');
    else if (score <= 24) setIndependenceLevel('Low Independence');
    else setIndependenceLevel('Extensive Assistance Needed');
  }, [formData]);

  const handleChange = (field: keyof SectionG, value: string) => {
    const updatedData = { ...formData, [field]: value };
    setFormData(updatedData);
    onChange(updatedData);
  };

  const adlOptions = [
    { value: '0', label: 'Independent - no help or oversight' },
    { value: '1', label: 'Supervision - oversight, encouragement or cueing' },
    { value: '2', label: 'Limited assistance - resident highly involved in activity' },
    { value: '3', label: 'Extensive assistance - resident involved in activity, staff provide weight-bearing support' },
    { value: '4', label: 'Total dependence - full staff performance during entire activity' },
    { value: '7', label: 'Activity occurred only once or twice - unable to establish pattern' },
    { value: '8', label: 'Activity did not occur or family/caregiver provided care 100% of the time' }
  ];

  const adlItems = [
    { code: 'g0110', label: 'Bed Mobility', description: 'Moving to/from lying position, turning side to side, positioning body' },
    { code: 'g0120', label: 'Transfer', description: 'Moving between surfaces' },
    { code: 'g0130', label: 'Walk in Room', description: 'Walking between locations in resident\'s room' },
    { code: 'g0140', label: 'Walk in Corridor', description: 'Walking in corridor on unit' },
    { code: 'g0150', label: 'Locomotion on Unit', description: 'Moving between locations in resident\'s room and adjacent corridor' },
    { code: 'g0160', label: 'Locomotion off Unit', description: 'Moving to and returning from areas off the unit' },
    { code: 'g0170', label: 'Dressing', description: 'Putting on, fastening, and taking off clothing and footwear' },
    { code: 'g0180', label: 'Eating', description: 'Moving food/fluid from dish/cup to mouth and swallowing' },
    { code: 'g0190', label: 'Toilet Use', description: 'Using the toilet room, commode, bedpan, or urinal' },
    { code: 'g0200', label: 'Personal Hygiene', description: 'Washing face and hands, oral care, hair care, shaving' }
  ];

  return (
    <div className="space-y-6">
      <Alert>
        <TrendingUp className="h-4 w-4" />
        <AlertDescription>
          <strong>ADL Score: {adlScore}</strong> - {independenceLevel}
          <br />
          This score is used for HIPPS code calculation and Medicare reimbursement determination.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="w-5 h-5 mr-2 text-indigo-600" />
            Activities of Daily Living (ADL) Assistance
          </CardTitle>
          <p className="text-sm text-gray-600">
            Code for resident's PERFORMANCE during the 7-day look-back period
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {adlItems.map((item) => (
            <div key={item.code} className="space-y-4">
              <div>
                <Label className="text-base font-medium">
                  {item.code.toUpperCase()}. {item.label}
                </Label>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
              </div>
              
              <RadioGroup
                value={formData[item.code as keyof SectionG] as string}
                onValueChange={(value) => handleChange(item.code as keyof SectionG, value)}
                className="grid grid-cols-1 gap-2"
              >
                {adlOptions.map((option) => (
                  <div key={option.value} className="flex items-center space-x-2">
                    <RadioGroupItem value={option.value} id={`${item.code}-${option.value}`} />
                    <Label htmlFor={`${item.code}-${option.value}`} className="text-sm">
                      {option.value} - {option.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bathing</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Label className="text-base font-medium">
              G0300. Bathing
            </Label>
            <p className="text-sm text-gray-600">
              Ability to wash entire body (excluding back and hair)
            </p>
            <RadioGroup
              value={formData.g0300}
              onValueChange={(value) => handleChange('g0300', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="g0300-0" />
                <Label htmlFor="g0300-0">0 - Independent</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="g0300-1" />
                <Label htmlFor="g0300-1">1 - Supervision</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="g0300-2" />
                <Label htmlFor="g0300-2">2 - Physical help limited to transfer only</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="g0300-3" />
                <Label htmlFor="g0300-3">3 - Physical help in part of bathing activity</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="4" id="g0300-4" />
                <Label htmlFor="g0300-4">4 - Total dependence</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="8" id="g0300-8" />
                <Label htmlFor="g0300-8">8 - Activity did not occur during entire 7 days</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Range of Motion and Rehabilitation Potential</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* G0400 - Functional Limitation in Range of Motion */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              G0400. Functional Limitation in Range of Motion
            </Label>
            <RadioGroup
              value={formData.g0400}
              onValueChange={(value) => handleChange('g0400', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="g0400-0" />
                <Label htmlFor="g0400-0">0 - No impairment</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="g0400-1" />
                <Label htmlFor="g0400-1">1 - Impairment on one side</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="g0400-2" />
                <Label htmlFor="g0400-2">2 - Impairment on both sides</Label>
              </div>
            </RadioGroup>
          </div>

          {/* G0600 - Functional Rehabilitation Potential */}
          <div className="space-y-3">
            <Label className="text-base font-medium">
              G0600. Functional Rehabilitation Potential
            </Label>
            <p className="text-sm text-gray-600">
              Resident believes he or she is capable of increased independence
            </p>
            <RadioGroup
              value={formData.g0600}
              onValueChange={(value) => handleChange('g0600', value)}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="g0600-0" />
                <Label htmlFor="g0600-0">0 - No</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="g0600-1" />
                <Label htmlFor="g0600-1">1 - Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="g0600-2" />
                <Label htmlFor="g0600-2">2 - Unable to determine</Label>
              </div>
            </RadioGroup>
          </div>
        </CardContent>
      </Card>

      {adlScore >= 12 && (
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            <strong>ADL/Functional Rehabilitation CAA Triggered:</strong> This resident shows significant functional 
            limitations that may benefit from rehabilitation services or adaptive equipment.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default MdsSectionG;
