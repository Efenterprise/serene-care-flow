
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Shield, Zap, Users, Brain, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  const features = [
    {
      icon: Brain,
      title: "Narrative AI Assistant",
      description: "Voice-powered documentation that creates survey-ready SOAP notes in seconds",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: Users,
      title: "Real-Time IDT Communication",
      description: "Slack-like messaging linked to resident profiles for seamless care coordination",
      color: "bg-green-50 text-green-600"
    },
    {
      icon: BarChart3,
      title: "Visual Census & Dashboards",
      description: "Drag-and-drop bed management with dynamic clinical insights",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: Shield,
      title: "Survey Readiness Module",
      description: "F-Tag aligned compliance tracking with automated alerts",
      color: "bg-amber-50 text-amber-600"
    },
    {
      icon: Heart,
      title: "Integrated Care Planning",
      description: "AI-assisted care plans that evolve with your residents",
      color: "bg-rose-50 text-rose-600"
    },
    {
      icon: Zap,
      title: "Voice-to-Chart",
      description: "Smart voice input that parses vitals and documentation automatically",
      color: "bg-indigo-50 text-indigo-600"
    }
  ];

  const userProfiles = [
    { title: "Floor Nurses", description: "Fast, mobile-friendly documentation" },
    { title: "MDS Coordinators", description: "Clean, compliant assessments with PDPM insights" },
    { title: "Administrators", description: "Census dashboards and survey readiness tools" },
    { title: "Corporate Teams", description: "EBITDAR visibility and quality metrics" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900">Serene Care</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/login">
              <Button>Get Started <ArrowRight className="w-4 h-4 ml-2" /></Button>
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <Badge variant="secondary" className="mb-6">
          The Future of Long-Term Care
        </Badge>
        <h1 className="text-5xl font-bold text-gray-900 mb-6 max-w-4xl mx-auto leading-tight">
          The EMR that skilled nursing operators deserve
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Beautiful, fast, intuitive, and built by people who actually understand the industry. 
          Make every user say "This system makes my life easier."
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/dashboard">
            <Button size="lg" className="text-lg px-8 py-3">
              View Demo Dashboard
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="text-lg px-8 py-3">
            Schedule Demo
          </Button>
        </div>
      </section>

      {/* Core Values */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our North Star</h2>
          <p className="text-lg text-gray-600">Clarity • Compliance • Communication • Care</p>
        </div>
        <div className="grid md:grid-cols-4 gap-8">
          {["Clarity", "Compliance", "Communication", "Care"].map((value, index) => (
            <Card key={value} className="text-center border-0 shadow-sm bg-white/70">
              <CardHeader>
                <CardTitle className="text-lg">{value}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-6 h-6 bg-blue-600 rounded-full"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Features That Disrupt</h2>
          <p className="text-lg text-gray-600">Not just a better PCC—the future of long-term care documentation</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* User Profiles */}
      <section className="container mx-auto px-6 py-16 bg-white/50 rounded-3xl mx-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Built for Every Role</h2>
          <p className="text-lg text-gray-600">From floor nurses to corporate teams</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {userProfiles.map((profile, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg text-blue-900">{profile.title}</CardTitle>
                <CardDescription>{profile.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Ready to Transform Your Facility?
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Join the future of skilled nursing documentation and see why operators choose Serene Care.
        </p>
        <Link to="/dashboard">
          <Button size="lg" className="text-lg px-8 py-3">
            Explore Dashboard <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white/70 mt-16">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-900">Serene Care</span>
            </div>
            <p className="text-sm text-gray-600">
              © 2024 Serene Care. Making skilled nursing beautiful.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
