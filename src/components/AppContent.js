import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { CContainer, CSpinner } from "@coreui/react";
import routes from "../routes";
import ProtectedRoute from "../ProtectedRoute";

const renderRoutes = (routes) =>
  routes.map((route, idx) => {
    if (!route.element) return null;
    const Element = route.element;

    if (route.roles && route.roles.length > 0) {
      return (
        <Route
          key={idx}
          path={route.path}
          element={
            <ProtectedRoute requiredRoles={route.roles}>
              <Element />
            </ProtectedRoute>
          }
        >
          {route.children && renderRoutes(route.children)}
        </Route>
      );
    }

    return (
      <Route key={idx} path={route.path} element={<Element />}>
        {route.children && renderRoutes(route.children)}
      </Route>
    );
  });

const AppContent = () => {
  return (
    <CContainer className="px-4" lg>
      <Suspense
        fallback={
          <div className="flex items-center justify-center p-4">
            <CSpinner color="primary" />
          </div>
        }
      >
        <Routes>
          {renderRoutes(routes)}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </CContainer>
  );
};

export default React.memo(AppContent);
