
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Upload, 
  FileText, 
  Download, 
  Trash2, 
  Edit,
  Eye,
  Printer,
  PenTool
} from "lucide-react";
import { useResidentDocuments } from "@/hooks/useResidentDocuments";
import { Resident } from "@/hooks/useResidents";
import DocumentUploadDialog from "./DocumentUploadDialog";
import DocumentRenameDialog from "./DocumentRenameDialog";
import AdmissionsAgreements from "./AdmissionsAgreements";

interface DocumentsTabProps {
  resident: Resident;
}

const DocumentsTab = ({ resident }: DocumentsTabProps) => {
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [renameDialog, setRenameDialog] = useState<{ open: boolean; documentId?: string; currentName?: string }>({
    open: false
  });

  const { 
    documents, 
    isLoading, 
    deleteDocument, 
    downloadDocument, 
    isDeleting 
  } = useResidentDocuments(resident.id);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (mimeType: string) => {
    if (mimeType.includes('pdf')) return '📄';
    if (mimeType.includes('word')) return '📝';
    if (mimeType.includes('image')) return '🖼️';
    return '📁';
  };

  const handleDelete = (documentId: string) => {
    if (window.confirm('Are you sure you want to delete this document? This action cannot be undone.')) {
      deleteDocument(documentId);
    }
  };

  const handleRename = (documentId: string, currentName: string) => {
    setRenameDialog({
      open: true,
      documentId,
      currentName
    });
  };

  if (isLoading) {
    return <div className="text-center py-8">Loading documents...</div>;
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="agreements" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="agreements" className="flex items-center space-x-2">
            <PenTool className="w-4 h-4" />
            <span>Agreements</span>
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Documents</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="agreements">
          <AdmissionsAgreements resident={resident} />
        </TabsContent>

        <TabsContent value="documents">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Documents</h3>
              <Button onClick={() => setUploadDialogOpen(true)}>
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </div>

            {documents.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <FileText className="w-12 h-12 mx-auto text-gray-400 mb-4" />
                  <h4 className="text-lg font-medium text-gray-900 mb-2">No Documents</h4>
                  <p className="text-gray-500 mb-4">
                    Upload documents for this resident. Forms from referral platforms will automatically appear here.
                  </p>
                  <Button onClick={() => setUploadDialogOpen(true)}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload First Document
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {documents.map((doc) => (
                  <Card key={doc.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{getFileIcon(doc.mime_type)}</span>
                          <div>
                            <h4 className="font-medium">{doc.file_name}</h4>
                            <div className="flex items-center space-x-2 text-sm text-gray-500">
                              <span>{formatFileSize(doc.file_size)}</span>
                              <span>•</span>
                              <span>{new Date(doc.created_at).toLocaleDateString()}</span>
                              {doc.document_type && (
                                <>
                                  <span>•</span>
                                  <Badge variant="secondary">{doc.document_type}</Badge>
                                </>
                              )}
                            </div>
                            {doc.description && (
                              <p className="text-sm text-gray-600 mt-1">{doc.description}</p>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => downloadDocument(doc)}
                            title="Preview"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => downloadDocument(doc)}
                            title="Download"
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => window.print()}
                            title="Print"
                          >
                            <Printer className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleRename(doc.id, doc.file_name)}
                            title="Rename"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(doc.id)}
                            disabled={isDeleting}
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      <DocumentUploadDialog
        residentId={resident.id}
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
      />

      <DocumentRenameDialog
        documentId={renameDialog.documentId}
        currentName={renameDialog.currentName}
        open={renameDialog.open}
        onOpenChange={(open) => setRenameDialog({ open })}
      />
    </div>
  );
};

export default DocumentsTab;
