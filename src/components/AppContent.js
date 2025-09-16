import React, { Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CContainer, CSpinner } from '@coreui/react'

import routes from '../routes'
import ProtectedRoute from '../ProtectedRoute'

// 🔹 Função recursiva que trata pai e filhos
const renderRoutes = (routes) =>
  routes.map((route, idx) => {
    if (!route.element) return null
    const Element = route.element

    return (
      <Route
        key={idx}
        path={route.path}
        element={
          <ProtectedRoute requiredRoles={route.roles || []}>
            <Element />
          </ProtectedRoute>
        }
      >
        {/* Se houver filhos, renderiza recursivamente */}
        {route.children && renderRoutes(route.children)}
      </Route>
    )
  })

const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense
        fallback={
          <div style={{ padding: 20 }}>
            <CSpinner color="primary" />
          </div>
        }
      >
        <Routes>
          {renderRoutes(routes)}

          {/* rota fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  )
}

export default React.memo(AppContent)
