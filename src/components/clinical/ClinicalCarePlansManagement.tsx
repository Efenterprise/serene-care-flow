
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Target, 
  Library, 
  Plus, 
  Users,
  TrendingUp,
  Clock,
  BookOpen
} from 'lucide-react';
import CarePlanLibrary from './CarePlanLibrary';

const ClinicalCarePlansManagement = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Care Plans Management</h2>
          <p className="text-gray-600">Comprehensive care plan management and template library</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Care Plan
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Care Plans</p>
                <p className="text-2xl font-bold text-blue-600">148</p>
              </div>
              <Target className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Templates Available</p>
                <p className="text-2xl font-bold text-green-600">24</p>
              </div>
              <Library className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Goals Met This Month</p>
                <p className="text-2xl font-bold text-purple-600">67</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Due for Review</p>
                <p className="text-2xl font-bold text-orange-600">23</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="library" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="library">Template Library</TabsTrigger>
          <TabsTrigger value="active">Active Plans</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="library">
          <CarePlanLibrary />
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader>
              <CardTitle>Active Care Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Active care plans management interface will be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Care Plan Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Care plan analytics and reporting interface will be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <Card>
            <CardHeader>
              <CardTitle>Care Plan Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-center text-gray-500 py-8">Care plan configuration and settings interface will be implemented here</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClinicalCarePlansManagement;
