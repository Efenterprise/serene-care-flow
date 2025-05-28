
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import ResidentsManagement from "@/components/residents/ResidentsManagement";

const Residents = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <DashboardHeader />
      <div className="container mx-auto px-6 py-8">
        <ResidentsManagement />
      </div>
    </div>
  );
};

export default Residents;
