
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Activity, 
  Zap, 
  TrendingUp,
  Heart,
  Brain,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart className="w-8 h-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">HealthCare Pro</span>
          </div>
          <div className="space-x-4">
            <Button onClick={() => navigate('/dashboard')} className="bg-blue-600 hover:bg-blue-700">
              View Demo
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            <Zap className="w-4 h-4 mr-2" />
            Live Demo Available
          </Badge>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Advanced Healthcare Management
            <span className="text-blue-600"> with AI Intelligence</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Streamline patient admissions, manage bed capacity, and optimize care delivery 
            with our comprehensive healthcare management platform featuring AI-powered insights.
          </p>
          <div className="flex items-center justify-center space-x-4">
            <Button size="lg" onClick={() => navigate('/dashboard')} className="bg-blue-600 hover:bg-blue-700">
              View Live Demo
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/emr')}>
              EMR Integration
            </Button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Healthcare Management</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to manage patient care, from admission to discharge
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <Brain className="w-12 h-12 text-blue-600 mb-4" />
              <CardTitle>AI-Powered Admissions</CardTitle>
              <CardDescription>
                Intelligent patient screening and bed assignment with predictive analytics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Automated referral processing
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Real-time bed availability
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Risk assessment algorithms
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <Activity className="w-12 h-12 text-green-600 mb-4" />
              <CardTitle>Clinical Dashboard</CardTitle>
              <CardDescription>
                Comprehensive patient monitoring with real-time vitals and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  EMR integration
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Quality metrics tracking
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Care plan management
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
            <CardHeader>
              <TrendingUp className="w-12 h-12 text-purple-600 mb-4" />
              <CardTitle>Revenue Optimization</CardTitle>
              <CardDescription>
                Financial analytics and billing optimization for improved outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Insurance verification
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Length of stay optimization
                </li>
                <li className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-600 mr-2" />
                  Cost per day tracking
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Ready to Transform Your Healthcare Operations?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Experience the power of our healthcare management platform with this interactive demo.
          </p>
          <Button size="lg" onClick={() => navigate('/dashboard')} className="bg-blue-600 hover:bg-blue-700">
            Explore Demo Dashboard
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Heart className="w-6 h-6" />
              <span className="text-xl font-bold">HealthCare Pro</span>
            </div>
            <p className="text-gray-400">
              Intelligent healthcare management solutions for modern facilities.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
