
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Resident } from "@/hooks/useResidents";
import { useCreateMedicalProfessional } from "@/hooks/useMedicalProfessionals";

const medicalProfessionalSchema = z.object({
  name: z.string().min(1, "Name is required"),
  profession: z.string().min(1, "Profession is required"),
  relation: z.string().optional(),
  office_phone: z.string().optional(),
  mobile_phone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
  npi_number: z.string().optional(),
  license_number: z.string().optional(),
  notes: z.string().optional(),
  is_primary: z.boolean().default(false),
});

type MedicalProfessionalFormData = z.infer<typeof medicalProfessionalSchema>;

interface AddMedicalProfessionalDialogProps {
  resident: Resident;
  isOpen: boolean;
  onClose: () => void;
}

const AddMedicalProfessionalDialog = ({ resident, isOpen, onClose }: AddMedicalProfessionalDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const createMutation = useCreateMedicalProfessional();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<MedicalProfessionalFormData>({
    resolver: zodResolver(medicalProfessionalSchema),
    defaultValues: {
      is_primary: false,
    },
  });

  const onSubmit = async (data: MedicalProfessionalFormData) => {
    setIsLoading(true);
    try {
      await createMutation.mutateAsync({
        name: data.name,
        profession: data.profession,
        relation: data.relation || "",
        office_phone: data.office_phone || "",
        mobile_phone: data.mobile_phone || "",
        email: data.email || "",
        npi_number: data.npi_number || "",
        license_number: data.license_number || "",
        notes: data.notes || "",
        is_primary: data.is_primary,
        resident_id: resident.id,
        is_active: true,
      });

      toast({
        title: "Medical Professional Added",
        description: "The medical professional has been added successfully.",
      });

      reset();
      onClose();
    } catch (error) {
      console.error("Error adding medical professional:", error);
      toast({
        title: "Error",
        description: "Failed to add medical professional.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    reset();
    onClose();
  };

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

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Medical Professional</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
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

          {/* Contact Information */}
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

          {/* Professional Information */}
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

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Additional notes about this medical professional..."
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Professional"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddMedicalProfessionalDialog;
