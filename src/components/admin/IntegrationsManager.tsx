
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  ExternalLink, 
  MessageSquare,
  Building2,
  Clock,
  BarChart3,
  Users,
  Bed
} from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import IntegrationRequestDialog from './IntegrationRequestDialog';

interface IntegrationProvider {
  id: string;
  name: string;
  logo_url?: string;
  website: string;
  description: string;
  category: string;
  contact_email?: string;
  integration_benefits: string[];
  pricing_model?: string;
}

const IntegrationsManager = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState<IntegrationProvider | null>(null);
  const [isRequestDialogOpen, setIsRequestDialogOpen] = useState(false);

  const { data: providers, isLoading } = useQuery({
    queryKey: ['integration-providers'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('integration_providers')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (error) throw error;
      return data as IntegrationProvider[];
    }
  });

  const { data: requests } = useQuery({
    queryKey: ['integration-requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('integration_requests')
        .select(`
          *,
          integration_providers (name)
        `)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      return data;
    }
  });

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Care Management', label: 'Care Management', icon: Users },
    { value: 'Time & Attendance', label: 'Time & Attendance', icon: Clock },
    { value: 'Healthcare Analytics', label: 'Healthcare Analytics', icon: BarChart3 },
    { value: 'Communication', label: 'Communication', icon: MessageSquare },
    { value: 'Census Management', label: 'Census Management', icon: Bed }
  ];

  const filteredProviders = providers?.filter(provider => {
    const matchesSearch = provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         provider.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || provider.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    const categoryData = categories.find(c => c.value === category);
    const Icon = categoryData?.icon || Building2;
    return <Icon className="w-5 h-5" />;
  };

  const handleRequestIntegration = (provider: IntegrationProvider) => {
    setSelectedProvider(provider);
    setIsRequestDialogOpen(true);
  };

  if (isLoading) {
    return (
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-gray-500">Loading integrations...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-0 shadow-sm bg-white">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Building2 className="w-5 h-5" />
            <span>Healthcare Pro Integrations Marketplace</span>
          </CardTitle>
          <p className="text-gray-600">
            Connect with leading healthcare technology providers to enhance your facility's capabilities.
          </p>
        </CardHeader>
      </Card>

      {/* Filters and Search */}
      <Card className="border-0 shadow-sm bg-white">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search integrations..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {categories.map((category) => (
                <Button
                  key={category.value}
                  variant={selectedCategory === category.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.value)}
                  className="flex items-center space-x-1"
                >
                  {category.icon && <category.icon className="w-4 h-4" />}
                  <span>{category.label}</span>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Providers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProviders?.map((provider) => (
          <Card key={provider.id} className="border-0 shadow-sm bg-white hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    {getCategoryIcon(provider.category)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{provider.name}</h3>
                    <Badge variant="outline" className="text-xs">
                      {provider.category}
                    </Badge>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(provider.website, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-3">
                {provider.description}
              </p>
              
              <div>
                <h4 className="font-medium mb-2">Key Benefits:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  {provider.integration_benefits.slice(0, 3).map((benefit, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <span className="text-green-500 mt-1">•</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                  {provider.integration_benefits.length > 3 && (
                    <li className="text-gray-400 text-xs">
                      +{provider.integration_benefits.length - 3} more benefits
                    </li>
                  )}
                </ul>
              </div>

              {provider.pricing_model && (
                <div className="pt-2 border-t">
                  <span className="text-xs text-gray-500">Pricing: {provider.pricing_model}</span>
                </div>
              )}

              <Button 
                className="w-full" 
                onClick={() => handleRequestIntegration(provider)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Request Integration
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Integration Requests */}
      {requests && requests.length > 0 && (
        <Card className="border-0 shadow-sm bg-white">
          <CardHeader>
            <CardTitle>Recent Integration Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {requests.slice(0, 5).map((request: any) => (
                <div key={request.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium">{request.integration_providers?.name}</p>
                    <p className="text-sm text-gray-600">
                      Requested on {new Date(request.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <Badge variant={
                    request.status === 'completed' ? 'default' :
                    request.status === 'in_progress' ? 'secondary' :
                    request.status === 'declined' ? 'destructive' : 'outline'
                  }>
                    {request.status.replace('_', ' ')}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Integration Request Dialog */}
      <IntegrationRequestDialog
        provider={selectedProvider}
        isOpen={isRequestDialogOpen}
        onClose={() => {
          setIsRequestDialogOpen(false);
          setSelectedProvider(null);
        }}
      />
    </div>
  );
};

export default IntegrationsManager;
