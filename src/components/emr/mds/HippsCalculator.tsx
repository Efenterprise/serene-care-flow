
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { 
  DollarSign, 
  TrendingUp, 
  Calculator, 
  FileText,
  AlertTriangle,
  CheckCircle 
} from "lucide-react";
import { MdsData } from "@/types/mds";
import { HippsEngine, HippsResult } from "@/utils/hippsEngine";

interface HippsCalculatorProps {
  mdsData: MdsData;
  residentName?: string;
  mrn?: string;
}

const HippsCalculator = ({ mdsData, residentName, mrn }: HippsCalculatorProps) => {
  const [hippsResult, setHippsResult] = useState<HippsResult | null>(null);
  const [calculating, setCalculating] = useState(false);

  useEffect(() => {
    calculateHipps();
  }, [mdsData]);

  const calculateHipps = async () => {
    setCalculating(true);
    try {
      // Add small delay to show calculation process
      await new Promise(resolve => setTimeout(resolve, 500));
      const result = HippsEngine.calculateHipps(mdsData);
      setHippsResult(result);
    } catch (error) {
      console.error('HIPPS calculation error:', error);
    } finally {
      setCalculating(false);
    }
  };

  const getRehabCategoryColor = (category: string) => {
    switch (category) {
      case 'ultra_high': return 'bg-purple-100 text-purple-800';
      case 'very_high': return 'bg-blue-100 text-blue-800';
      case 'high': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBehaviorCategoryColor = (category: string) => {
    switch (category) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (calculating) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-blue-600 animate-spin" />
            Calculating HIPPS Code...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="animate-pulse text-gray-500">
              Processing MDS data for reimbursement calculation...
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!hippsResult) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
            HIPPS Calculation Unavailable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Complete required MDS sections (A, G, E, I, O) to generate HIPPS code for billing.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <Calculator className="w-5 h-5 mr-2 text-blue-600" />
              HIPPS Code & Revenue Calculation
            </div>
            <Badge variant="outline" className="text-lg font-mono">
              {hippsResult.hipps_code}
            </Badge>
          </CardTitle>
          {residentName && (
            <p className="text-gray-600">
              {residentName} {mrn && `(MRN: ${mrn})`}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium text-blue-800">Daily Rate</p>
                  <p className="text-lg font-bold text-blue-900">
                    ${hippsResult.estimated_daily_rate.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-sm font-medium text-green-800">Monthly Revenue</p>
                  <p className="text-lg font-bold text-green-900">
                    ${hippsResult.estimated_monthly_revenue.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <FileText className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="text-sm font-medium text-purple-800">RUG Category</p>
                  <p className="text-lg font-bold text-purple-900">
                    {hippsResult.rug_category}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-orange-50 rounded-lg">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-orange-800">Case Mix Index</p>
                  <p className="text-lg font-bold text-orange-900">
                    {hippsResult.case_mix_index.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Classification Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700">Rehabilitation Category</Label>
                <Badge className={`mt-1 ${getRehabCategoryColor(hippsResult.rehabilitation_category)}`}>
                  {hippsResult.rehabilitation_category.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>

              <div>
                <Label className="text-sm font-medium text-gray-700">Behavior Category</Label>
                <Badge className={`mt-1 ${getBehaviorCategoryColor(hippsResult.behavior_category)}`}>
                  {hippsResult.behavior_category.toUpperCase()}
                </Badge>
              </div>

              <div className="flex items-center space-x-2">
                <CheckCircle className={`w-4 h-4 ${hippsResult.complex_medical ? 'text-red-600' : 'text-gray-400'}`} />
                <span className="text-sm">Complex Medical Conditions</span>
              </div>

              <div className="flex items-center space-x-2">
                <CheckCircle className={`w-4 h-4 ${hippsResult.reduced_physical_function ? 'text-orange-600' : 'text-gray-400'}`} />
                <span className="text-sm">Reduced Physical Function</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className={`w-4 h-4 ${hippsResult.special_care_high ? 'text-red-600' : 'text-gray-400'}`} />
                <span className="text-sm">Special Care High</span>
              </div>

              <div className="flex items-center space-x-2">
                <CheckCircle className={`w-4 h-4 ${hippsResult.special_care_low ? 'text-yellow-600' : 'text-gray-400'}`} />
                <span className="text-sm">Special Care Low</span>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-gray-700 mb-1">Revenue Impact</p>
                <p className="text-xs text-gray-600">
                  Based on current Medicare rates and case mix index. 
                  Actual reimbursement may vary by region and contract terms.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex space-x-3">
        <Button onClick={calculateHipps} variant="outline">
          <Calculator className="w-4 h-4 mr-2" />
          Recalculate
        </Button>
        <Button>
          <FileText className="w-4 h-4 mr-2" />
          Generate Billing Report
        </Button>
      </div>
    </div>
  );
};

const Label = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <label className={className}>{children}</label>
);

export default HippsCalculator;
