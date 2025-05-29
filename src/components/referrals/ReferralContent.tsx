
import ReferralDashboard from "./ReferralDashboard";
import LivePlatformConnections from "./LivePlatformConnections";
import EnhancedLivePlatformConnections from "./EnhancedLivePlatformConnections";
import AdmissionsQueue from "../admissions/AdmissionsQueue";
import ReferralAnalyticsCharts from "./ReferralAnalyticsCharts";

interface ReferralContentProps {
  currentPath?: string;
}

const ReferralContent = ({ currentPath = "referrals" }: ReferralContentProps) => {
  // Handle referral sub-routes
  if (currentPath === "referrals/dashboard" || currentPath === "referrals") {
    return <ReferralDashboard />;
  }

  if (currentPath === "referrals/connections") {
    return <EnhancedLivePlatformConnections />;
  }

  if (currentPath === "referrals/platforms") {
    return <LivePlatformConnections />;
  }

  if (currentPath === "referrals/admissions") {
    return <AdmissionsQueue />;
  }

  if (currentPath === "referrals/analytics") {
    return <ReferralAnalyticsCharts />;
  }

  // Default to dashboard
  return <ReferralDashboard />;
};

export default ReferralContent;
