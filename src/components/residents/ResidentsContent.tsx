
import ResidentsManagement from "./ResidentsManagement";

const ResidentsContent = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Residents Management</h2>
        <p className="text-gray-600">Manage resident information, contacts, and care plans</p>
      </div>
      <ResidentsManagement />
    </div>
  );
};

export default ResidentsContent;
