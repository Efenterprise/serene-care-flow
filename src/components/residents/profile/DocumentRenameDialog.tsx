
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Edit } from "lucide-react";
import { useResidentDocuments } from "@/hooks/useResidentDocuments";

interface DocumentRenameDialogProps {
  documentId?: string;
  currentName?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DocumentRenameDialog = ({ 
  documentId, 
  currentName, 
  open, 
  onOpenChange 
}: DocumentRenameDialogProps) => {
  const [newName, setNewName] = useState("");
  const { renameDocument, isRenaming } = useResidentDocuments("");

  useEffect(() => {
    if (currentName) {
      setNewName(currentName);
    }
  }, [currentName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!documentId || !newName.trim()) return;

    renameDocument(
      { documentId, newName: newName.trim() },
      {
        onSuccess: () => {
          onOpenChange(false);
        }
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rename Document</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="newName">Document Name</Label>
            <Input
              id="newName"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Enter new document name"
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!newName.trim() || isRenaming}>
              <Edit className="w-4 h-4 mr-2" />
              {isRenaming ? 'Renaming...' : 'Rename'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DocumentRenameDialog;
