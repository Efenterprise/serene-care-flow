
import ResidentsManagement from "@/components/residents/ResidentsManagement";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import MainLayout from "@/components/layout/MainLayout";

const Residents = () => {
  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="container mx-auto px-6 py-8">
          <ResidentsManagement />
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default Residents;
