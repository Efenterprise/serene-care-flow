
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Resident } from "@/hooks/useResidents";
import { useQueryClient } from "@tanstack/react-query";

const residentSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  mrn: z.string().min(1, "MRN is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  gender: z.enum(["male", "female", "other"]).optional(),
  admission_date: z.string().min(1, "Admission date is required"),
  room_number: z.string().optional(),
  floor: z.string().optional(),
  unit: z.string().optional(),
  payor_primary: z.string().optional(),
  payor_secondary: z.string().optional(),
  diagnosis_primary: z.string().optional(),
  physician_attending: z.string().optional(),
  physician_primary_care: z.string().optional(),
  emergency_contact_name: z.string().optional(),
  emergency_contact_phone: z.string().optional(),
  emergency_contact_relationship: z.string().optional(),
  care_level: z.enum(["skilled", "assisted", "memory_care", "respite"]).optional(),
  mobility_status: z.string().optional(),
  notes: z.string().optional(),
});

type ResidentFormData = z.infer<typeof residentSchema>;

interface ResidentEditFormProps {
  resident: Resident;
  isOpen: boolean;
  onClose: () => void;
}

const ResidentEditForm = ({ resident, isOpen, onClose }: ResidentEditFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ResidentFormData>({
    resolver: zodResolver(residentSchema),
    defaultValues: {
      first_name: resident.first_name,
      last_name: resident.last_name,
      mrn: resident.mrn,
      date_of_birth: resident.date_of_birth,
      gender: resident.gender as "male" | "female" | "other" | undefined,
      admission_date: resident.admission_date,
      room_number: resident.room_number || "",
      floor: resident.floor || "",
      unit: resident.unit || "",
      payor_primary: resident.payor_primary || "",
      payor_secondary: resident.payor_secondary || "",
      diagnosis_primary: resident.diagnosis_primary || "",
      physician_attending: resident.physician_attending || "",
      physician_primary_care: resident.physician_primary_care || "",
      emergency_contact_name: resident.emergency_contact_name || "",
      emergency_contact_phone: resident.emergency_contact_phone || "",
      emergency_contact_relationship: resident.emergency_contact_relationship || "",
      care_level: resident.care_level as "skilled" | "assisted" | "memory_care" | "respite" | undefined,
      mobility_status: resident.mobility_status || "",
      notes: resident.notes || "",
    },
  });

  const onSubmit = async (data: ResidentFormData) => {
    setIsLoading(true);
    try {
      const { error } = await supabase
        .from("residents")
        .update(data)
        .eq("id", resident.id);

      if (error) throw error;

      toast({
        title: "Resident updated",
        description: "Resident information has been updated successfully.",
      });

      // Invalidate and refetch residents data
      queryClient.invalidateQueries({ queryKey: ["residents"] });
      queryClient.invalidateQueries({ queryKey: ["resident-stats"] });

      onClose();
    } catch (error) {
      console.error("Error updating resident:", error);
      toast({
        title: "Error",
        description: "Failed to update resident information.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Resident: {resident.first_name} {resident.last_name}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="first_name">First Name *</Label>
              <Input
                id="first_name"
                {...register("first_name")}
                placeholder="Enter first name"
              />
              {errors.first_name && (
                <p className="text-sm text-red-600">{errors.first_name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="last_name">Last Name *</Label>
              <Input
                id="last_name"
                {...register("last_name")}
                placeholder="Enter last name"
              />
              {errors.last_name && (
                <p className="text-sm text-red-600">{errors.last_name.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="mrn">MRN *</Label>
              <Input
                id="mrn"
                {...register("mrn")}
                placeholder="Enter MRN"
              />
              {errors.mrn && (
                <p className="text-sm text-red-600">{errors.mrn.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="date_of_birth">Date of Birth *</Label>
              <Input
                id="date_of_birth"
                type="date"
                {...register("date_of_birth")}
              />
              {errors.date_of_birth && (
                <p className="text-sm text-red-600">{errors.date_of_birth.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select value={watch("gender")} onValueChange={(value) => setValue("gender", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="admission_date">Admission Date *</Label>
              <Input
                id="admission_date"
                type="date"
                {...register("admission_date")}
              />
              {errors.admission_date && (
                <p className="text-sm text-red-600">{errors.admission_date.message}</p>
              )}
            </div>
          </div>

          {/* Location Information */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="room_number">Room Number</Label>
              <Input
                id="room_number"
                {...register("room_number")}
                placeholder="Enter room number"
              />
            </div>

            <div>
              <Label htmlFor="floor">Floor</Label>
              <Input
                id="floor"
                {...register("floor")}
                placeholder="Enter floor"
              />
            </div>

            <div>
              <Label htmlFor="unit">Unit</Label>
              <Input
                id="unit"
                {...register("unit")}
                placeholder="Enter unit"
              />
            </div>
          </div>

          {/* Insurance Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="payor_primary">Primary Payor</Label>
              <Input
                id="payor_primary"
                {...register("payor_primary")}
                placeholder="Enter primary payor"
              />
            </div>

            <div>
              <Label htmlFor="payor_secondary">Secondary Payor</Label>
              <Input
                id="payor_secondary"
                {...register("payor_secondary")}
                placeholder="Enter secondary payor"
              />
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="diagnosis_primary">Primary Diagnosis</Label>
              <Input
                id="diagnosis_primary"
                {...register("diagnosis_primary")}
                placeholder="Enter primary diagnosis"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="physician_attending">Attending Physician</Label>
                <Input
                  id="physician_attending"
                  {...register("physician_attending")}
                  placeholder="Enter attending physician"
                />
              </div>

              <div>
                <Label htmlFor="physician_primary_care">Primary Care Physician</Label>
                <Input
                  id="physician_primary_care"
                  {...register("physician_primary_care")}
                  placeholder="Enter primary care physician"
                />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="emergency_contact_name">Emergency Contact Name</Label>
              <Input
                id="emergency_contact_name"
                {...register("emergency_contact_name")}
                placeholder="Enter contact name"
              />
            </div>

            <div>
              <Label htmlFor="emergency_contact_phone">Emergency Contact Phone</Label>
              <Input
                id="emergency_contact_phone"
                {...register("emergency_contact_phone")}
                placeholder="Enter contact phone"
              />
            </div>

            <div>
              <Label htmlFor="emergency_contact_relationship">Relationship</Label>
              <Input
                id="emergency_contact_relationship"
                {...register("emergency_contact_relationship")}
                placeholder="Enter relationship"
              />
            </div>
          </div>

          {/* Care Information */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="care_level">Care Level</Label>
              <Select value={watch("care_level")} onValueChange={(value) => setValue("care_level", value as any)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select care level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="skilled">Skilled</SelectItem>
                  <SelectItem value="assisted">Assisted</SelectItem>
                  <SelectItem value="memory_care">Memory Care</SelectItem>
                  <SelectItem value="respite">Respite</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="mobility_status">Mobility Status</Label>
              <Input
                id="mobility_status"
                {...register("mobility_status")}
                placeholder="Enter mobility status"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              {...register("notes")}
              placeholder="Enter any additional notes"
              rows={3}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Resident"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ResidentEditForm;
