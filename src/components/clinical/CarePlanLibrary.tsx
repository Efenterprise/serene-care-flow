
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, 
  Plus, 
  Search, 
  Filter,
  BookOpen,
  Star,
  Copy,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import CarePlanTemplates from './care-plans/CarePlanTemplates';
import CreateTemplateDialog from './care-plans/CreateTemplateDialog';
import TemplateDetailsDialog from './care-plans/TemplateDetailsDialog';

const CarePlanLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const categories = [
    { value: 'all', label: 'All Templates', count: 24 },
    { value: 'mobility', label: 'Mobility & Rehabilitation', count: 8 },
    { value: 'safety', label: 'Safety & Fall Prevention', count: 5 },
    { value: 'nutrition', label: 'Nutrition & Hydration', count: 4 },
    { value: 'pain', label: 'Pain Management', count: 3 },
    { value: 'cognitive', label: 'Cognitive Support', count: 2 },
    { value: 'social', label: 'Social & Emotional', count: 2 }
  ];

  const handleViewTemplate = (template) => {
    setSelectedTemplate(template);
    setShowDetailsDialog(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center">
            <BookOpen className="w-6 h-6 mr-2 text-blue-600" />
            Care Plan Library
          </h2>
          <p className="text-gray-600">Manage and organize care plan templates for efficient care delivery</p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create Template
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Templates</p>
                <p className="text-2xl font-bold text-blue-600">24</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Most Used</p>
                <p className="text-2xl font-bold text-green-600">8</p>
              </div>
              <Star className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Custom Templates</p>
                <p className="text-2xl font-bold text-purple-600">12</p>
              </div>
              <Edit className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Plans</p>
                <p className="text-2xl font-bold text-orange-600">45</p>
              </div>
              <Copy className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
              <Input
                placeholder="Search templates by name, condition, or intervention..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label} ({category.count})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList>
          <TabsTrigger value="templates">Template Library</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
          <TabsTrigger value="recent">Recently Used</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <CarePlanTemplates 
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            onViewTemplate={handleViewTemplate}
          />
        </TabsContent>

        <TabsContent value="favorites">
          <Card>
            <CardHeader>
              <CardTitle>Favorite Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Your favorite care plan templates will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recent">
          <Card>
            <CardHeader>
              <CardTitle>Recently Used Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Recently used care plan templates will appear here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialogs */}
      {showCreateDialog && (
        <CreateTemplateDialog onClose={() => setShowCreateDialog(false)} />
      )}

      {showDetailsDialog && selectedTemplate && (
        <TemplateDetailsDialog 
          template={selectedTemplate}
          onClose={() => setShowDetailsDialog(false)}
        />
      )}
    </div>
  );
};

export default CarePlanLibrary;
