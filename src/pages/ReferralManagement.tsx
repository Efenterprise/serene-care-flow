
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import MainLayout from "@/components/layout/MainLayout";
import ReferralDashboard from "@/components/referrals/ReferralDashboard";

const ReferralManagement = () => {
  return (
    <ProtectedRoute>
      <MainLayout>
        <div className="container mx-auto px-6 py-8">
          <ReferralDashboard />
        </div>
      </MainLayout>
    </ProtectedRoute>
  );
};

export default ReferralManagement;
