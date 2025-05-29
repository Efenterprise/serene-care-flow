
import { useState, useEffect } from "react";
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
import { useUpdateMedicalProfessional, useDeleteMedicalProfessional, MedicalProfessional } from "@/hooks/useMedicalProfessionals";

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

interface EditMedicalProfessionalDialogProps {
  professional: MedicalProfessional;
  isOpen: boolean;
  onClose: () => void;
}

const EditMedicalProfessionalDialog = ({ professional, isOpen, onClose }: EditMedicalProfessionalDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const updateMutation = useUpdateMedicalProfessional();
  const deleteMutation = useDeleteMedicalProfessional();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<MedicalProfessionalFormData>({
    resolver: zodResolver(medicalProfessionalSchema),
  });

  useEffect(() => {
    if (professional && isOpen) {
      reset({
        name: professional.name,
        profession: professional.profession,
        relation: professional.relation || "",
        office_phone: professional.office_phone || "",
        mobile_phone: professional.mobile_phone || "",
        email: professional.email || "",
        npi_number: professional.npi_number || "",
        license_number: professional.license_number || "",
        notes: professional.notes || "",
        is_primary: professional.is_primary,
      });
    }
  }, [professional, isOpen, reset]);

  const onSubmit = async (data: MedicalProfessionalFormData) => {
    setIsLoading(true);
    try {
      await updateMutation.mutateAsync({
        id: professional.id,
        updates: data,
      });

      toast({
        title: "Medical Professional Updated",
        description: "The medical professional has been updated successfully.",
      });

      onClose();
    } catch (error) {
      console.error("Error updating medical professional:", error);
      toast({
        title: "Error",
        description: "Failed to update medical professional.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to remove this medical professional?")) {
      return;
    }

    setIsLoading(true);
    try {
      await deleteMutation.mutateAsync(professional.id);

      toast({
        title: "Medical Professional Removed",
        description: "The medical professional has been removed successfully.",
      });

      onClose();
    } catch (error) {
      console.error("Error removing medical professional:", error);
      toast({
        title: "Error",
        description: "Failed to remove medical professional.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Medical Professional</DialogTitle>
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

          <div className="flex justify-between pt-4">
            <Button 
              type="button" 
              variant="destructive" 
              onClick={handleDelete}
              disabled={isLoading}
            >
              Remove Professional
            </Button>
            <div className="flex space-x-2">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Updating..." : "Update Professional"}
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMedicalProfessionalDialog;
