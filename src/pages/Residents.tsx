
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ResidentsManagement from "@/components/residents/ResidentsManagement";
import ProtectedRoute from "@/components/auth/ProtectedRoute";

const Residents = () => {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
        <DashboardHeader />
        <div className="container mx-auto px-6 py-8">
          <ResidentsManagement />
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Residents;
