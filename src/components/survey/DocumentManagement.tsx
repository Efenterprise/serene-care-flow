
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Upload, 
  Download, 
  Search, 
  Filter,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

const DocumentManagement = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const documentCategories = [
    { id: "all", label: "All Documents", count: 156 },
    { id: "policies", label: "Policies & Procedures", count: 45 },
    { id: "training", label: "Training Records", count: 32 },
    { id: "certifications", label: "Certifications", count: 28 },
    { id: "safety", label: "Life Safety", count: 25 },
    { id: "quality", label: "Quality Assurance", count: 18 },
    { id: "nursing", label: "Nursing Documentation", count: 8 }
  ];

  const surveyDocuments = [
    {
      id: 1,
      name: "Fire Safety Plan 2024",
      category: "Life Safety",
      lastUpdated: "2024-01-15",
      status: "current",
      requiredBy: "CMS",
      nextReview: "2024-07-15",
      priority: "high"
    },
    {
      id: 2,
      name: "Infection Control Policy",
      category: "Policies & Procedures",
      lastUpdated: "2023-12-10",
      status: "needs_review",
      requiredBy: "CMS",
      nextReview: "2024-02-10",
      priority: "high"
    },
    {
      id: 3,
      name: "Administrator License",
      category: "Certifications",
      lastUpdated: "2023-06-01",
      status: "current",
      requiredBy: "State",
      nextReview: "2024-06-01",
      priority: "medium"
    },
    {
      id: 4,
      name: "Staff Training Matrix",
      category: "Training Records",
      lastUpdated: "2024-01-05",
      status: "current",
      requiredBy: "CMS",
      nextReview: "2024-04-05",
      priority: "medium"
    },
    {
      id: 5,
      name: "Quality Assurance Plan",
      category: "Quality Assurance",
      lastUpdated: "2023-11-20",
      status: "overdue",
      requiredBy: "CMS",
      nextReview: "2024-01-20",
      priority: "high"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "current":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "needs_review":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "overdue":
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "current":
        return <Badge className="bg-green-100 text-green-800">Current</Badge>;
      case "needs_review":
        return <Badge className="bg-yellow-100 text-yellow-800">Needs Review</Badge>;
      case "overdue":
        return <Badge className="bg-red-100 text-red-800">Overdue</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-100 text-red-800">High</Badge>;
      case "medium":
        return <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>;
      case "low":
        return <Badge className="bg-green-100 text-green-800">Low</Badge>;
      default:
        return <Badge className="bg-gray-100 text-gray-800">Normal</Badge>;
    }
  };

  const filteredDocuments = surveyDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           doc.category.toLowerCase().includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Document Management</h2>
          <p className="text-gray-600">Manage survey-required documentation and compliance files</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Upload className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Export List
          </Button>
        </div>
      </div>

      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle>Document Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {documentCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 text-center rounded-lg border transition-colors ${
                  selectedCategory === category.id
                    ? "bg-blue-50 border-blue-200 text-blue-700"
                    : "bg-white hover:bg-gray-50"
                }`}
              >
                <div className="font-semibold">{category.count}</div>
                <div className="text-sm text-gray-600">{category.label}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Documents List */}
      <Card>
        <CardHeader>
          <CardTitle>Survey Required Documents ({filteredDocuments.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredDocuments.map((doc) => (
              <div key={doc.id} className="p-4 border rounded-lg hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(doc.status)}
                    <div>
                      <h3 className="font-medium">{doc.name}</h3>
                      <p className="text-sm text-gray-600">{doc.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {getStatusBadge(doc.status)}
                    {getPriorityBadge(doc.priority)}
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    Last Updated: {doc.lastUpdated}
                  </div>
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-1" />
                    Required by: {doc.requiredBy}
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    Next Review: {doc.nextReview}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentManagement;
