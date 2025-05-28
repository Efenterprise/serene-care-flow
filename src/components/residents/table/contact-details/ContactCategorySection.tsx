
import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Phone, 
  Mail, 
  MessageSquare, 
  CheckCircle, 
  AlertCircle,
  UserPlus 
} from "lucide-react";
import { ResidentContact } from "@/hooks/useContacts";
import ContactInfoCard from "./ContactInfoCard";

interface ContactCategorySectionProps {
  title: string;
  contacts: ResidentContact[];
  categoryColor: string;
  icon: ReactNode;
}

const ContactCategorySection = ({ 
  title, 
  contacts, 
  categoryColor, 
  icon 
}: ContactCategorySectionProps) => {
  const getColorClasses = (color: string) => {
    const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
      red: { 
        bg: "bg-red-50", 
        border: "border-red-200", 
        text: "text-red-700", 
        badge: "bg-red-100 text-red-800" 
      },
      blue: { 
        bg: "bg-blue-50", 
        border: "border-blue-200", 
        text: "text-blue-700", 
        badge: "bg-blue-100 text-blue-800" 
      },
      green: { 
        bg: "bg-green-50", 
        border: "border-green-200", 
        text: "text-green-700", 
        badge: "bg-green-100 text-green-800" 
      },
      purple: { 
        bg: "bg-purple-50", 
        border: "border-purple-200", 
        text: "text-purple-700", 
        badge: "bg-purple-100 text-purple-800" 
      },
      orange: { 
        bg: "bg-orange-50", 
        border: "border-orange-200", 
        text: "text-orange-700", 
        badge: "bg-orange-100 text-orange-800" 
      },
      indigo: { 
        bg: "bg-indigo-50", 
        border: "border-indigo-200", 
        text: "text-indigo-700", 
        badge: "bg-indigo-100 text-indigo-800" 
      },
    };
    return colorMap[color] || colorMap.blue;
  };

  const colors = getColorClasses(categoryColor);

  if (contacts.length === 0) {
    return (
      <Card className={`${colors.bg} ${colors.border}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className={`flex items-center space-x-2 ${colors.text}`}>
              {icon}
              <span>{title}</span>
            </CardTitle>
            <Button size="sm" variant="outline" className="h-8">
              <UserPlus className="w-3 h-3 mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 text-sm">No {title.toLowerCase()} added yet</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${colors.bg} ${colors.border}`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className={`flex items-center space-x-2 ${colors.text}`}>
            {icon}
            <span>{title}</span>
            <Badge className={colors.badge}>
              {contacts.length}
            </Badge>
          </CardTitle>
          <Button size="sm" variant="outline" className="h-8">
            <UserPlus className="w-3 h-3 mr-1" />
            Add
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {contacts.map((contact) => (
          <ContactInfoCard 
            key={contact.id} 
            contact={contact} 
            categoryColor={categoryColor}
          />
        ))}
      </CardContent>
    </Card>
  );
};

export default ContactCategorySection;
