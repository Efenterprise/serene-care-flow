
import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MedicalProfessionalFormData } from "./MedicalProfessionalForm";

interface ContactInfoSectionProps {
  form: UseFormReturn<MedicalProfessionalFormData>;
}

export const ContactInfoSection = ({ form }: ContactInfoSectionProps) => {
  const { register, formState: { errors } } = form;

  return (
    <div className="grid md:grid-cols-2 gap-4">
      <div>
        <Label htmlFor="office_phone">Office Phone</Label>
        <Input
          id="office_phone"
          {...register("office_phone")}
          placeholder="(555) 123-4567"
        />
      </div>

      <div>
        <Label htmlFor="mobile_phone">Mobile Phone</Label>
        <Input
          id="mobile_phone"
          {...register("mobile_phone")}
          placeholder="(555) 987-6543"
        />
      </div>

      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="doctor@clinic.com"
        />
        {errors.email && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>
    </div>
  );
};
