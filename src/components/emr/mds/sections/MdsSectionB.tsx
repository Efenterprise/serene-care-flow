
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SectionB } from "@/types/mds";

interface MdsSectionBProps {
  data?: Partial<SectionB>;
  onChange: (data: SectionB) => void;
}

const MdsSectionB = ({ data, onChange }: MdsSectionBProps) => {
  const [formData, setFormData] = useState<SectionB>({
    b0100: '0',
    b0200: '0',
    b0300: '0',
    b0600: '0',
    b0700: '0',
    b0800: '0',
    b1000: '0',
    b1200: '0',
    completed: false,
    ...data
  });

  useEffect(() => {
    onChange(formData);
  }, [formData, onChange]);

  const updateField = (field: keyof SectionB, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-8">
      {/* B0100 - Comatose */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">B0100. Comatose</Label>
        <p className="text-sm text-gray-600">
          Persistent vegetative state/no discernible consciousness.
        </p>
        <RadioGroup 
          value={formData.b0100} 
          onValueChange={(value) => updateField('b0100', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="b0100-0" />
            <Label htmlFor="b0100-0">0. No</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="b0100-1" />
            <Label htmlFor="b0100-1">1. Yes</Label>
          </div>
        </RadioGroup>
      </div>

      {/* B0200 - Hearing */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">B0200. Hearing</Label>
        <p className="text-sm text-gray-600">
          With hearing aid or hearing appliances if normally used.
        </p>
        <RadioGroup 
          value={formData.b0200} 
          onValueChange={(value) => updateField('b0200', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="b0200-0" />
            <Label htmlFor="b0200-0">0. Adequate - no difficulty in normal conversation, social interaction, listening to TV</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="b0200-1" />
            <Label htmlFor="b0200-1">1. Minimal difficulty - difficulty in some environments (e.g., when person speaks softly or setting is noisy)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="b0200-2" />
            <Label htmlFor="b0200-2">2. Moderate difficulty - speaker has to increase volume and speak distinctly</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="b0200-3" />
            <Label htmlFor="b0200-3">3. Highly impaired - absence of useful hearing</Label>
          </div>
        </RadioGroup>
      </div>

      {/* B0300 - Hearing Aid */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">B0300. Hearing Aid</Label>
        <RadioGroup 
          value={formData.b0300} 
          onValueChange={(value) => updateField('b0300', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="b0300-0" />
            <Label htmlFor="b0300-0">0. Does not use hearing aid or other hearing appliance</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="b0300-1" />
            <Label htmlFor="b0300-1">1. Uses hearing aid or other hearing appliance</Label>
          </div>
        </RadioGroup>
      </div>

      {/* B0600 - Speech Clarity */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">B0600. Speech Clarity</Label>
        <RadioGroup 
          value={formData.b0600} 
          onValueChange={(value) => updateField('b0600', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="b0600-0" />
            <Label htmlFor="b0600-0">0. Clear speech - distinct, intelligible words</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="b0600-1" />
            <Label htmlFor="b0600-1">1. Unclear speech - slurred or mumbled words</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="b0600-2" />
            <Label htmlFor="b0600-2">2. No speech - absence of spoken words</Label>
          </div>
        </RadioGroup>
      </div>

      {/* B0700 - Makes Self Understood */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">B0700. Makes Self Understood</Label>
        <RadioGroup 
          value={formData.b0700} 
          onValueChange={(value) => updateField('b0700', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="b0700-0" />
            <Label htmlFor="b0700-0">0. Usually understood - expresses ideas without difficulty</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="b0700-1" />
            <Label htmlFor="b0700-1">1. Sometimes understood - ability is adequate in most situations</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="b0700-2" />
            <Label htmlFor="b0700-2">2. Rarely understood - ability limited to making concrete requests</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="b0700-3" />
            <Label htmlFor="b0700-3">3. Never understood</Label>
          </div>
        </RadioGroup>
      </div>

      {/* B0800 - Ability to Understand Others */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">B0800. Ability to Understand Others</Label>
        <RadioGroup 
          value={formData.b0800} 
          onValueChange={(value) => updateField('b0800', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="b0800-0" />
            <Label htmlFor="b0800-0">0. Usually understands - clear comprehension</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="b0800-1" />
            <Label htmlFor="b0800-1">1. Sometimes understands - misses some part/intent of message</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="b0800-2" />
            <Label htmlFor="b0800-2">2. Rarely understands - responds adequately to simple, direct communication</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="b0800-3" />
            <Label htmlFor="b0800-3">3. Never understands</Label>
          </div>
        </RadioGroup>
      </div>

      {/* B1000 - Vision */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">B1000. Vision</Label>
        <p className="text-sm text-gray-600">
          With glasses or other visual appliances if normally used.
        </p>
        <RadioGroup 
          value={formData.b1000} 
          onValueChange={(value) => updateField('b1000', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="b1000-0" />
            <Label htmlFor="b1000-0">0. Adequate - sees fine detail, including regular print in newspapers/books</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="b1000-1" />
            <Label htmlFor="b1000-1">1. Impaired - sees large print, but not regular print in newspapers/books</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="2" id="b1000-2" />
            <Label htmlFor="b1000-2">2. Moderately impaired - limited vision; not able to see newspaper headlines</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="3" id="b1000-3" />
            <Label htmlFor="b1000-3">3. Highly impaired - object identification in question, but eyes appear to follow objects</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="4" id="b1000-4" />
            <Label htmlFor="b1000-4">4. Severely impaired - no vision or sees only light, colors or shapes</Label>
          </div>
        </RadioGroup>
      </div>

      {/* B1200 - Visual Appliances */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">B1200. Visual Appliances</Label>
        <RadioGroup 
          value={formData.b1200} 
          onValueChange={(value) => updateField('b1200', value)}
          className="space-y-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="0" id="b1200-0" />
            <Label htmlFor="b1200-0">0. Does not use glasses or other visual appliances</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="1" id="b1200-1" />
            <Label htmlFor="b1200-1">1. Uses glasses or other visual appliances</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="border-t pt-4">
        <p className="text-sm text-gray-600">
          This section assesses the resident's hearing, speech, and vision abilities. These assessments help identify 
          potential communication barriers and sensory impairments that may trigger related CAAs.
        </p>
      </div>
    </div>
  );
};

export default MdsSectionB;
