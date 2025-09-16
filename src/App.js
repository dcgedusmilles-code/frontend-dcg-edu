import React, { StrictMode, Suspense, useEffect } from "react"
import { HashRouter, Route, Routes } from "react-router-dom"
import { useSelector } from "react-redux"
import { CSpinner, useColorModes } from "@coreui/react"
import { useTranslation } from "react-i18next"
import "./i18n"

import "./scss/style.scss"
import "./scss/globals.css"
import "./scss/examples.scss"

import ProtectedRoute from "./ProtectedRoute"
import { AuthContextProvider } from "./context/AuthContext"
import routes from "./routes"

// Containers
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"))
const RootLayout = React.lazy(() => import("./layout/Layout"))

// Pages públicas
const Register = React.lazy(() => import("./views/pages/register/Register"))
const Page404 = React.lazy(() => import("./views/pages/page404/Page404"))
const Page500 = React.lazy(() => import("./views/pages/page500/Page500"))

/**
 * Renderiza rotas recursivamente (pai/filho).
 */
const renderRoutes = (routes) =>
  routes.map((route, idx) => {
    const Element = route.element
    return (
      <Route
        key={idx}
        path={route.path}
        element={
          route.roles ? (
            <ProtectedRoute requiredRoles={route.roles}>
              <Element />
            </ProtectedRoute>
          ) : (
            <Element />
          )
        }
      >
        {route.children && renderRoutes(route.children)}
      </Route>
    )
  })

const App = () => {
  const { i18n } = useTranslation()
  const { isColorModeSet, setColorMode } = useColorModes("coreui-theme")
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    if (!isColorModeSet()) setColorMode(storedTheme)
  }, [isColorModeSet, setColorMode, storedTheme])

  return (
    <StrictMode>
      <AuthContextProvider>
        <HashRouter>
          <Suspense
            fallback={
              <div className="pt-3 text-center">
                <CSpinner color="primary" variant="grow" />
              </div>
            }
          >
            <Routes>
              {/* Rotas públicas */}
              <Route path="/register" element={<Register />} />
              <Route path="/500" element={<Page500 />} />
              <Route index path="/" element={<RootLayout />} />
              <Route path="*" element={<Page404 />} />

              {/* Rotas protegidas */}
              <Route
                path="/dashboard/*"
                element={
                  <ProtectedRoute requiredRoles={["admin", "gestor", "Professor", "Aluno"]}>
                    <DefaultLayout />
                  </ProtectedRoute>
                }
              >
                {renderRoutes(routes)}
              </Route>
            </Routes>
          </Suspense>
        </HashRouter>
      </AuthContextProvider>
    </StrictMode>
  )
}

export default App
