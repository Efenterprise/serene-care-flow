
interface WelcomeSectionProps {
  currentTime: string;
}

const WelcomeSection = ({ currentTime }: WelcomeSectionProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Good morning, Sarah!</h1>
      <p className="text-gray-600">Here's what's happening at Sunrise Manor today • {currentTime}</p>
    </div>
  );
};

export default WelcomeSection;
