
import EmrDashboard from "./EmrDashboard";

const EmrContent = () => {
  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">EMR Integration Hub</h2>
        <p className="text-gray-600">Hospital system integration and patient lifecycle management</p>
      </div>
      <EmrDashboard />
    </div>
  );
};

export default EmrContent;
