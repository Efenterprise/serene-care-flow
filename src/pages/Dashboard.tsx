
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import DropdownMainLayout from "@/components/layout/DropdownMainLayout";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <DropdownMainLayout />
    </ProtectedRoute>
  );
};

export default Dashboard;
