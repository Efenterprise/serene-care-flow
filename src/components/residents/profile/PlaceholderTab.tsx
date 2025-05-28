
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PlaceholderTabProps {
  title: string;
  message: string;
}

const PlaceholderTab = ({ title, message }: PlaceholderTabProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600">{message}</p>
      </CardContent>
    </Card>
  );
};

export default PlaceholderTab;
