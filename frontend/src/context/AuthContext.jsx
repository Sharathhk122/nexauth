import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { login as authLogin, logout as authLogout, getCurrentUser } from '../api/auth'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const userData = await getCurrentUser()
          setUser(userData)
          setError(null)
        }
      } catch (error) {
        // Clear invalid token
        localStorage.removeItem('token')
        setUser(null)
        // Only show error if it's not a 401 (unauthorized)
        if (error.response?.status !== 401) {
          setError(error.message)
        }
      } finally {
        setLoading(false)
      }
    }
    
    fetchUser()
  }, [])

  const login = async (username, password) => {
    try {
      setLoading(true);
      setError(null);
      const result = await authLogin(username, password);
      
      if (result.success) {
        const userData = await getCurrentUser();
        setUser(userData);
        navigate('/dashboard');
        return { success: true };
      } else {
        setError(result.message);
        return { success: false, message: result.message };
      }
    } catch (error) {
      setError(error.message || 'Login failed');
      return { success: false, message: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true)
      await authLogout()
      setUser(null)
      setError(null)
      navigate('/login')
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    error,
    login,
    logout,
    setError
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)