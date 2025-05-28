
import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, profile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth', { state: { from: location }, replace: true });
    } else if (!loading && user && profile && requiredRole) {
      const hasRequiredRole = requiredRole.includes(profile.role);
      if (!hasRequiredRole) {
        navigate('/dashboard', { replace: true });
      }
    }
  }, [user, profile, loading, navigate, location, requiredRole]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || (requiredRole && profile && !requiredRole.includes(profile.role))) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
