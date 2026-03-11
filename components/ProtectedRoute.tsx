import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-saney-cream">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-saney-gold"></div>
          <p className="text-saney-dark font-serif animate-pulse">Chargement de votre session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    // If user is logged in but not admin, redirect to their client space or home
    return <Navigate to="/client" replace />;
  }

  // If user is Admin but tries to access /client (which is protected but not requireAdmin=true), redirect to /admin
  // This prevents Admins from getting stuck in Client Space if they don't want to be there,
  // BUT Admins might want to see Client Space. 
  // The issue described is "redirected to /espace-client" which is likely the old route name or a typo.
  // The user said: "it takes me to espace-cleint in the url ( http://localhost:3000/espace-client )"
  // Let's check App.tsx for the route definitions.
  
  return <Outlet />;
};
