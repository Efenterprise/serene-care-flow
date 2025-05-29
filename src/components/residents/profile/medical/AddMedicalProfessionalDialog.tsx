
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Resident } from "@/hooks/useResidents";
import MedicalProfessionalForm from "./forms/MedicalProfessionalForm";

interface AddMedicalProfessionalDialogProps {
  resident: Resident;
  isOpen: boolean;
  onClose: () => void;
}

const AddMedicalProfessionalDialog = ({ resident, isOpen, onClose }: AddMedicalProfessionalDialogProps) => {
  const handleClose = () => {
    onClose();
  };

  const handleSuccess = () => {
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Medical Professional</DialogTitle>
        </DialogHeader>

        <MedicalProfessionalForm 
          resident={resident} 
          onSuccess={handleSuccess} 
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddMedicalProfessionalDialog;
