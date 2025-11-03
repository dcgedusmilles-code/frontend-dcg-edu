import axios from 'axios'

const apiUrl = import.meta.env.VITE_API_URL || 'localhost:3000/api'

// Cria instância global configurada
const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercepta requisições para adicionar token (caso use autenticação)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Intercepta respostas para lidar com expiração de sessão
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Exemplo: redirecionar para login se token expirar
      localStorage.removeItem('token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api
