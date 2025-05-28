
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Users, 
  Activity, 
  Zap, 
  Lock,
  Eye,
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
            <Button variant="outline" onClick={() => navigate('/auth')}>
              Sign In
            </Button>
            <Button onClick={() => navigate('/auth')} className="bg-blue-600 hover:bg-blue-700">
              Get Started
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <Badge className="mb-4 bg-blue-100 text-blue-800">
            <Shield className="w-4 h-4 mr-2" />
            HIPAA Compliant
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
            <Button size="lg" onClick={() => navigate('/auth')} className="bg-blue-600 hover:bg-blue-700">
              Access Portal
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Enterprise Security & Compliance</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Built with healthcare's most stringent security requirements in mind
          </p>
        </div>
        
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Lock className="w-12 h-12 mx-auto text-blue-600 mb-4" />
              <CardTitle className="text-lg">Multi-Factor Auth</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Advanced MFA with backup codes and IP restrictions for secure access control.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Eye className="w-12 h-12 mx-auto text-green-600 mb-4" />
              <CardTitle className="text-lg">Audit Trail</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Complete activity logging with timestamps and user identification for compliance.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Users className="w-12 h-12 mx-auto text-purple-600 mb-4" />
              <CardTitle className="text-lg">Role-Based Access</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Granular permissions with facility vs remote access controls.
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-white/70 backdrop-blur-sm">
            <CardHeader className="text-center">
              <Shield className="w-12 h-12 mx-auto text-red-600 mb-4" />
              <CardTitle className="text-lg">HIPAA Compliant</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center">
                Full HIPAA compliance with encrypted data and secure communications.
              </p>
            </CardContent>
          </Card>
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
                Financial analytics and billing optimization for improved EBITDAR
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
            Join leading healthcare facilities using our platform to improve patient outcomes 
            and operational efficiency.
          </p>
          <Button size="lg" onClick={() => navigate('/auth')} className="bg-blue-600 hover:bg-blue-700">
            Start Your Journey
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
              Secure, compliant, and intelligent healthcare management solutions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
