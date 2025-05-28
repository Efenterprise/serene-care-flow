
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth.tsx";
import { LogIn, LogOut, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AuthStatus = () => {
  const { user, signOut, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div className="text-sm text-gray-600">Loading...</div>;
  }

  if (!user) {
    return (
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => navigate('/auth')}
      >
        <LogIn className="w-4 h-4 mr-2" />
        Sign In Required
      </Button>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <User className="w-4 h-4 mr-2" />
          {user.email}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AuthStatus;
