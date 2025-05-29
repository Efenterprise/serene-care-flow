
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SectionA, AssessmentType } from "@/types/mds";

interface MdsSectionAProps {
  data?: Partial<SectionA>;
  onChange: (data: SectionA) => void;
}

const MdsSectionA = ({ data, onChange }: MdsSectionAProps) => {
  const [formData, setFormData] = useState<SectionA>({
    a0100: '',
    a0200: '',
    a0310: 'admission',
    a0320: '',
    a1000: '',
    a1005: '',
    a1010: '',
    a1700: '',
    a1800: '',
    a2000: '',
    a2100: '',
    a2300: '',
    a2400: '',
    completed: false,
    ...data
  });

  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  const updateField = (field: keyof SectionA, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="a0100">A0100. Facility Provider Number</Label>
          <Input
            id="a0100"
            value={formData.a0100}
            onChange={(e) => updateField('a0100', e.target.value)}
            placeholder="Enter facility provider number"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="a0200">A0200. Type of Provider</Label>
          <Select value={formData.a0200} onValueChange={(value) => updateField('a0200', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select provider type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="01">Nursing facility</SelectItem>
              <SelectItem value="02">Swing bed</SelectItem>
              <SelectItem value="03">SNF</SelectItem>
              <SelectItem value="04">Dual certified</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="a0310">A0310. Type of Assessment</Label>
          <Select 
            value={formData.a0310} 
            onValueChange={(value: AssessmentType) => updateField('a0310', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select assessment type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admission">01. Admission assessment</SelectItem>
              <SelectItem value="quarterly">02. Quarterly review assessment</SelectItem>
              <SelectItem value="annual">03. Annual assessment</SelectItem>
              <SelectItem value="significant_change">04. Significant change in status assessment</SelectItem>
              <SelectItem value="discharge">10. Discharge assessment</SelectItem>
              <SelectItem value="death">11. Death in facility tracking record</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="a1000">A1000. Federal OBRA Reason for Assessment</Label>
          <Select value={formData.a1000} onValueChange={(value) => updateField('a1000', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select OBRA reason" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="01">Admission</SelectItem>
              <SelectItem value="02">Annual</SelectItem>
              <SelectItem value="03">Significant change</SelectItem>
              <SelectItem value="04">Quarterly</SelectItem>
              <SelectItem value="05">Discharge</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="a1005">A1005. Entered From</Label>
          <Select value={formData.a1005} onValueChange={(value) => updateField('a1005', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select entry location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="01">Community (private home/apt, board/care, assisted living, group home)</SelectItem>
              <SelectItem value="02">Another nursing home or swing bed</SelectItem>
              <SelectItem value="03">Acute care hospital</SelectItem>
              <SelectItem value="04">Psychiatric hospital</SelectItem>
              <SelectItem value="05">Inpatient rehabilitation facility</SelectItem>
              <SelectItem value="06">ID/DD facility</SelectItem>
              <SelectItem value="07">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="a1010">A1010. Admission Date</Label>
          <Input
            id="a1010"
            type="date"
            value={formData.a1010}
            onChange={(e) => updateField('a1010', e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="a1700">A1700. Medicaid Number</Label>
          <Input
            id="a1700"
            value={formData.a1700}
            onChange={(e) => updateField('a1700', e.target.value)}
            placeholder="Enter Medicaid number if applicable"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="a1800">A1800. Medicare Number</Label>
          <Input
            id="a1800"
            value={formData.a1800}
            onChange={(e) => updateField('a1800', e.target.value)}
            placeholder="Enter Medicare number if applicable"
          />
        </div>
      </div>

      <div className="border-t pt-4">
        <p className="text-sm text-gray-600">
          Complete all required fields above. This section establishes the basic identification and administrative 
          information for the MDS assessment.
        </p>
      </div>
    </div>
  );
};

export default MdsSectionA;
