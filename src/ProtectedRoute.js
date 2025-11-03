import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { UserAuth } from './context/AuthContext'

const ProtectedRoute = ({ children, requiredRoles }) => {
  const { user, role, loading } = UserAuth()

  console.log('Auth info ->', { user, role, loading })

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Carregando...</p>
      </div>
    )
  }

  if (!user && !loading) {
    return <Navigate to="/" replace />
  }

  // 🚫 Se o usuário não tem a role necessária
  if (requiredRoles && !requiredRoles.includes(role)) {
    return <div>🚫 Acesso negado. Seu perfil não tem permissão.</div>
  }

  // ✅ Acesso permitido
  return children ? children : <Outlet />
}

export default ProtectedRoute
