
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MedicalProfessionalFormData } from "./MedicalProfessionalForm";

interface ProfessionalInfoSectionProps {
  form: UseFormReturn<MedicalProfessionalFormData>;
}

export const ProfessionalInfoSection = ({ form }: ProfessionalInfoSectionProps) => {
  const { register } = form;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="npi_number">NPI Number</Label>
        <Input
          id="npi_number"
          {...register("npi_number")}
          placeholder="1234567890"
        />
      </div>

      <div>
        <Label htmlFor="license_number">License Number</Label>
        <Input
          id="license_number"
          {...register("license_number")}
          placeholder="MD12345"
        />
      </div>
    </div>
  );
};
