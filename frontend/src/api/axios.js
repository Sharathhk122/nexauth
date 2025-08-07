import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'https://nexauth.onrender.com/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  timeout: 1000000, // Increased timeout to 10 seconds
  withCredentials: true
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  }
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('Response error:', error)
    
    if (error.code === 'ECONNABORTED') {
      console.error('Request timeout')
      return Promise.reject(new Error('Request timeout. The server is taking too long to respond.'))
    }
    
    if (!error.response) {
      console.error('Network error - server might be down')
      return Promise.reject(new Error('Network error. Please check your internet connection.'))
    }
    
    if (error.response.status === 401) {
      localStorage.removeItem('token')
      window.location.href = '/login?sessionExpired=true'
    }
    
    if (error.response.data) {
      const errorMessage = error.response.data.message || 
                         error.response.data.error || 
                         `Request failed with status ${error.response.status}`
      return Promise.reject(new Error(errorMessage))
    }
    
    return Promise.reject(error)
  }
)

export default api