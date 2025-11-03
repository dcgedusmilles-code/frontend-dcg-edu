import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  // ✅ Base URL da API via variável de ambiente
  const API_BASE_URL = import.meta.env.VITE_API_URL

  // ✅ Instância configurada do Axios
  const api = axios.create({
    baseURL: API_BASE_URL,
  })

  // Adiciona token automaticamente em todas as requisições
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  // 🔐 Lê o token quando o app é carregado
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      fetchUserProfile(token)
    } else {
      setLoading(false)
    }
  }, [])

  // 🔄 Busca o perfil do usuário autenticado
  const fetchUserProfile = async (token) => {
    try {
      const response = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })

      const userData = response.data?.user || response.data
      setUser(userData)
      setRole(userData.role || null)
    } catch (error) {
      const status = error.response?.status
      console.error('Erro ao buscar perfil:', error.response?.data || error.message)

      // Só remove o token se realmente for inválido (401)
      if (status === 401) {
        localStorage.removeItem('accessToken')
        setUser(null)
        setRole(null)
      }
    } finally {
      setLoading(false)
    }
  }

  // 🚪 Login
  const signInUser = async (email, password) => {
    console.log('email, password', email, password)

    try {
      const response = await api.post('/auth/login', { email, password })
      const { tokens, user } = response.data
      const accessToken = tokens?.accessToken || response.data.accessToken

      // Salva token localmente
      localStorage.setItem('accessToken', accessToken)
      setUser(user)
      setRole(user.role || null)

      return { success: true, user }
    } catch (error) {
      console.error('Erro ao entrar:', error.response?.data || error.message)
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao autenticar',
      }
    }
  }

  // 🚪 Logout (local e remoto, se houver endpoint)
  const signOut = async () => {
    try {
      // Se a tua API tiver endpoint de logout:
      // await api.post("/auth/logout");

      localStorage.removeItem('accessToken')
      setUser(null)
      setRole(null)
      return { success: true }
    } catch (error) {
      console.error('Erro ao sair:', error.response?.data || error.message)
      return { success: false }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        loading,
        signInUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

// ✅ Hook para usar o contexto facilmente
export const UserAuth = () => useContext(AuthContext)
