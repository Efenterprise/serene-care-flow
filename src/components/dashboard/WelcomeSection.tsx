
import { useAuth } from "@/hooks/useAuth.tsx";

interface WelcomeSectionProps {
  currentTime: string;
}

const WelcomeSection = ({ currentTime }: WelcomeSectionProps) => {
  const { user, profile } = useAuth();
  
  const getTimeOfDayGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const getUserName = () => {
    if (profile?.first_name) {
      return profile.first_name;
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return "there";
  };

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">
        {getTimeOfDayGreeting()}, {getUserName()}!
      </h1>
      <p className="text-gray-600">Here's what's happening at your facility today • {currentTime}</p>
    </div>
  );
};

export default WelcomeSection;
