import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ roles }) {
  const { firebaseUser, profile, loading } = useAuth();
  const location = useLocation();
  if (loading) return <div className="page-status">Opening your library...</div>;
  if (!firebaseUser) return <Navigate to="/signin" replace state={{ from: location }} />;
  if (roles && !roles.includes(profile?.role)) return <Navigate to="/home" replace />;
  return <Outlet />;
}
