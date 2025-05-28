
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Calendar
} from "lucide-react";

const RevenueCycleDashboard = () => {
  // Mock revenue cycle data
  const revenueMetrics = {
    monthlyRevenue: 1250000,
    averageDailyRate: 285,
    collectionRate: 94.2,
    daysSalesOutstanding: 42,
    denialRate: 8.5,
    pendingClaims: 156,
    overdueAccounts: 23,
    cashCollection: 85600
  };

  const accountsReceivable = [
    {
      id: "1",
      patient: "John Smith",
      account: "ACC-2024-001",
      amount: 15450,
      daysOutstanding: 35,
      insurancePrimary: "Medicare",
      status: "pending_payment",
      lastAction: "Claim submitted"
    },
    {
      id: "2",
      patient: "Mary Johnson",
      account: "ACC-2024-002",
      amount: 8200,
      daysOutstanding: 67,
      insurancePrimary: "Blue Cross",
      status: "follow_up_required",
      lastAction: "Appeal filed"
    },
    {
      id: "3",
      patient: "Robert Davis",
      account: "ACC-2024-003",
      amount: 22100,
      daysOutstanding: 12,
      insurancePrimary: "Medicaid",
      status: "approved",
      lastAction: "Payment received"
    },
    {
      id: "4",
      patient: "Susan Brown",
      account: "ACC-2024-004",
      amount: 5800,
      daysOutstanding: 89,
      insurancePrimary: "Private Pay",
      status: "collection_review",
      lastAction: "Payment plan offered"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending_payment':
        return 'bg-blue-100 text-blue-800';
      case 'follow_up_required':
        return 'bg-orange-100 text-orange-800';
      case 'collection_review':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      case 'follow_up_required':
        return <AlertTriangle className="w-4 h-4 text-orange-600" />;
      case 'collection_review':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-blue-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Revenue Cycle Dashboard</h2>
          <p className="text-gray-600">Financial performance and accounts receivable management</p>
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          <FileText className="w-4 h-4 mr-2" />
          Financial Report
        </Button>
      </div>

      {/* Revenue Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(revenueMetrics.monthlyRevenue)}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Collection Rate</p>
                <p className="text-2xl font-bold text-blue-600">{revenueMetrics.collectionRate}%</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Days Sales Outstanding</p>
                <p className="text-2xl font-bold text-orange-600">{revenueMetrics.daysSalesOutstanding}</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Denial Rate</p>
                <p className="text-2xl font-bold text-red-600">{revenueMetrics.denialRate}%</p>
              </div>
              <div className="p-3 bg-red-100 rounded-full">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <CreditCard className="w-5 h-5 mr-2 text-green-500" />
              Collection Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Collection Rate</span>
                <span className="font-medium">{revenueMetrics.collectionRate}%</span>
              </div>
              <Progress value={revenueMetrics.collectionRate} className="h-2" />
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Cash Collections Today</span>
                <span className="font-medium text-green-600">
                  {formatCurrency(revenueMetrics.cashCollection)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
              Claims Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Pending Claims</span>
                <span className="font-medium">{revenueMetrics.pendingClaims}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Denial Rate</span>
                <span className="font-medium text-red-600">{revenueMetrics.denialRate}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Avg Daily Rate</span>
                <span className="font-medium">{formatCurrency(revenueMetrics.averageDailyRate)}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-500" />
              Aging Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">DSO</span>
                <span className="font-medium">{revenueMetrics.daysSalesOutstanding} days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Overdue Accounts</span>
                <span className="font-medium text-red-600">{revenueMetrics.overdueAccounts}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">90+ Days</span>
                <span className="font-medium">12 accounts</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accounts Receivable */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <FileText className="w-5 h-5 mr-2 text-purple-500" />
            Accounts Receivable
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {accountsReceivable.map((account) => (
              <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-blue-100 rounded-full">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{account.patient}</h3>
                    <p className="text-sm text-gray-600">{account.account} • {account.insurancePrimary}</p>
                    <p className="text-xs text-gray-500">{account.lastAction}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{formatCurrency(account.amount)}</p>
                    <p className="text-sm text-gray-600">{account.daysOutstanding} days</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(account.status)}
                    <Badge className={getStatusColor(account.status)}>
                      {account.status.replace(/_/g, ' ')}
                    </Badge>
                  </div>
                  
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevenueCycleDashboard;
