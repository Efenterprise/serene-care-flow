
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import MainLayout from "@/components/layout/MainLayout";
import DashboardContent from "@/components/dashboard/DashboardContent";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="container mx-auto px-6 py-8">
          <DashboardContent />
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default Dashboard;
