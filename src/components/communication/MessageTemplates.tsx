
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Copy,
  FileText,
  Clock,
  MessageSquare,
  Mail,
  Phone
} from "lucide-react";
import { toast } from "sonner";

interface MessageTemplate {
  id: string;
  name: string;
  category: "medical" | "general" | "emergency" | "reminder" | "update";
  type: "email" | "sms" | "call";
  subject: string;
  content: string;
  variables: string[];
  created_at: string;
  usage_count: number;
}

const MessageTemplates = () => {
  const [templates, setTemplates] = useState<MessageTemplate[]>([
    {
      id: "1",
      name: "Daily Care Update",
      category: "medical",
      type: "email",
      subject: "Daily Update for {resident_name}",
      content: "Dear {contact_name},\n\nI hope this message finds you well. I wanted to provide you with today's update on {resident_name}'s care.\n\n{care_details}\n\nIf you have any questions or concerns, please don't hesitate to contact us.\n\nBest regards,\n{staff_name}",
      variables: ["resident_name", "contact_name", "care_details", "staff_name"],
      created_at: "2024-01-15",
      usage_count: 45
    },
    {
      id: "2",
      name: "Appointment Reminder",
      category: "reminder",
      type: "sms",
      subject: "Appointment Reminder",
      content: "Hi {contact_name}, this is a reminder that {resident_name} has an appointment scheduled for {appointment_date} at {appointment_time}. Please call us if you need to reschedule.",
      variables: ["contact_name", "resident_name", "appointment_date", "appointment_time"],
      created_at: "2024-01-10",
      usage_count: 23
    },
    {
      id: "3",
      name: "Emergency Notification",
      category: "emergency",
      type: "email",
      subject: "URGENT: Emergency Notification for {resident_name}",
      content: "Dear {contact_name},\n\nWe need to inform you of an urgent situation regarding {resident_name}. {emergency_details}\n\nPlease contact us immediately at {facility_phone}.\n\nSincerely,\n{facility_name}",
      variables: ["contact_name", "resident_name", "emergency_details", "facility_phone", "facility_name"],
      created_at: "2024-01-05",
      usage_count: 3
    }
  ]);

  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<MessageTemplate | null>(null);
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    category: "general" as MessageTemplate["category"],
    type: "email" as MessageTemplate["type"],
    subject: "",
    content: "",
  });

  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [filterType, setFilterType] = useState<string>("all");

  const filteredTemplates = templates.filter(template => {
    const matchesCategory = filterCategory === "all" || template.category === filterCategory;
    const matchesType = filterType === "all" || template.type === filterType;
    return matchesCategory && matchesType;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "medical": return "bg-blue-100 text-blue-800";
      case "emergency": return "bg-red-100 text-red-800";
      case "reminder": return "bg-orange-100 text-orange-800";
      case "update": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "email": return <Mail className="w-4 h-4" />;
      case "sms": return <MessageSquare className="w-4 h-4" />;
      case "call": return <Phone className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const handleCreateTemplate = () => {
    if (!newTemplate.name.trim() || !newTemplate.subject.trim() || !newTemplate.content.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    const template: MessageTemplate = {
      id: Date.now().toString(),
      ...newTemplate,
      variables: extractVariables(newTemplate.content + " " + newTemplate.subject),
      created_at: new Date().toISOString().split('T')[0],
      usage_count: 0
    };

    setTemplates(prev => [...prev, template]);
    setNewTemplate({
      name: "",
      category: "general",
      type: "email",
      subject: "",
      content: "",
    });
    setShowCreateDialog(false);
    toast.success("Template created successfully");
  };

  const extractVariables = (text: string): string[] => {
    const matches = text.match(/\{([^}]+)\}/g);
    return matches ? matches.map(match => match.slice(1, -1)) : [];
  };

  const handleDeleteTemplate = (id: string) => {
    setTemplates(prev => prev.filter(t => t.id !== id));
    toast.success("Template deleted successfully");
  };

  const handleCopyTemplate = (template: MessageTemplate) => {
    navigator.clipboard.writeText(template.content);
    toast.success("Template content copied to clipboard");
  };

  const handleUseTemplate = (template: MessageTemplate) => {
    // This would integrate with the individual messaging or mass communication components
    toast.success(`Using template: ${template.name}`);
  };

  return (
    <div className="space-y-6">
      {/* Header and Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Message Templates</h3>
          <p className="text-gray-600">Create and manage reusable communication templates</p>
        </div>
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogTrigger asChild>
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Template Name</label>
                  <Input
                    value={newTemplate.name}
                    onChange={(e) => setNewTemplate({...newTemplate, name: e.target.value})}
                    placeholder="Enter template name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Category</label>
                  <Select
                    value={newTemplate.category}
                    onValueChange={(value) => setNewTemplate({...newTemplate, category: value as MessageTemplate["category"]})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General</SelectItem>
                      <SelectItem value="medical">Medical</SelectItem>
                      <SelectItem value="emergency">Emergency</SelectItem>
                      <SelectItem value="reminder">Reminder</SelectItem>
                      <SelectItem value="update">Update</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Communication Type</label>
                <Select
                  value={newTemplate.type}
                  onValueChange={(value) => setNewTemplate({...newTemplate, type: value as MessageTemplate["type"]})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="call">Call Notes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <Input
                  value={newTemplate.subject}
                  onChange={(e) => setNewTemplate({...newTemplate, subject: e.target.value})}
                  placeholder="Enter subject line"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message Content</label>
                <Textarea
                  value={newTemplate.content}
                  onChange={(e) => setNewTemplate({...newTemplate, content: e.target.value})}
                  placeholder="Enter message content. Use {variable_name} for dynamic content."
                  rows={8}
                  required
                />
                <p className="text-xs text-gray-500 mt-1">
                  Use curly braces for variables: {"{resident_name}, {contact_name}, {date}, etc."}
                </p>
              </div>

              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateTemplate}>
                  Create Template
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <div className="flex-1">
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="medical">Medical</SelectItem>
              <SelectItem value="emergency">Emergency</SelectItem>
              <SelectItem value="reminder">Reminder</SelectItem>
              <SelectItem value="update">Update</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
              <SelectItem value="call">Call</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => (
          <Card key={template.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{template.name}</CardTitle>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge className={getCategoryColor(template.category)}>
                      {template.category}
                    </Badge>
                    <Badge variant="outline" className="flex items-center space-x-1">
                      {getTypeIcon(template.type)}
                      <span>{template.type}</span>
                    </Badge>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="font-medium text-sm text-gray-700">Subject:</h4>
                <p className="text-sm text-gray-600">{template.subject}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-sm text-gray-700">Preview:</h4>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {template.content.substring(0, 150)}...
                </p>
              </div>

              {template.variables.length > 0 && (
                <div>
                  <h4 className="font-medium text-sm text-gray-700">Variables:</h4>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {template.variables.slice(0, 3).map(variable => (
                      <Badge key={variable} variant="secondary" className="text-xs">
                        {variable}
                      </Badge>
                    ))}
                    {template.variables.length > 3 && (
                      <Badge variant="secondary" className="text-xs">
                        +{template.variables.length - 3} more
                      </Badge>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="text-xs text-gray-500">
                  Used {template.usage_count} times
                </div>
                <div className="flex space-x-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUseTemplate(template)}
                  >
                    Use
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleCopyTemplate(template)}
                  >
                    <Copy className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteTemplate(template.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No templates found</h3>
            <p className="text-gray-600 mb-4">
              {templates.length === 0 
                ? "Create your first message template to get started" 
                : "No templates match your current filters"
              }
            </p>
            <Button onClick={() => setShowCreateDialog(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default MessageTemplates;
