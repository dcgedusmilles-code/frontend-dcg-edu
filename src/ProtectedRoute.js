import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { UserAuth } from "./context/AuthContext";

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { session, role, loading } = UserAuth();

  if (loading) return <div>Carregando...</div>;

  if (!session) return <Navigate to="/" replace />;

  if (requiredRoles && !requiredRoles.includes(role)) {
    return <div>🚫 Acesso negado. Seu perfil não tem permissão.</div>;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
