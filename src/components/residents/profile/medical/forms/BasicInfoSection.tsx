
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MedicalProfessionalFormData } from "./MedicalProfessionalForm";

interface BasicInfoSectionProps {
  form: UseFormReturn<MedicalProfessionalFormData>;
}

const professions = [
  "Physician",
  "Nurse Practitioner",
  "Physician Assistant",
  "Physical Therapist",
  "Occupational Therapist",
  "Speech Therapist",
  "Social Worker",
  "Pharmacist",
  "Dietitian",
  "Chaplain",
  "Other"
];

export const BasicInfoSection = ({ form }: BasicInfoSectionProps) => {
  const { register, setValue, watch, formState: { errors } } = form;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          {...register("name")}
          placeholder="Dr. John Smith"
        />
        {errors.name && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="profession">Profession *</Label>
        <Select value={watch("profession")} onValueChange={(value) => setValue("profession", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select profession" />
          </SelectTrigger>
          <SelectContent>
            {professions.map((profession) => (
              <SelectItem key={profession} value={profession}>
                {profession}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.profession && (
          <p className="text-sm text-red-600">{errors.profession.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="relation">Relation to Resident</Label>
        <Input
          id="relation"
          {...register("relation")}
          placeholder="Primary Care Physician"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="is_primary"
          checked={watch("is_primary")}
          onCheckedChange={(checked) => setValue("is_primary", !!checked)}
        />
        <Label htmlFor="is_primary">Primary Medical Professional</Label>
      </div>
    </div>
  );
};
