import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import Dashboard from './pages/Dashboard'
import VerifyEmailPage from './pages/VerifyEmailPage'
import PublicTest from './components/Test/PublicTest'
import UserTest from './components/Test/UserTest'
import AdminTest from './components/Test/AdminTest'
import PrivateRoute from './components/Layout/PrivateRoute'
import Navbar from './components/Layout/Navbar'
import { useAuth } from './context/AuthContext'
import { Alert, Snackbar } from '@mui/material'

function App() {
  const { error } = useAuth()

  return (
    <div className="App">
      <Navbar />
      
      {/* Global error notification */}
      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/public-test" element={<PublicTest />} />
        
        {/* Protected routes */}
        <Route element={<PrivateRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-test" element={<UserTest />} />
        </Route>
        
        <Route element={<PrivateRoute allowedRoles={['ROLE_ADMIN']} />}>
          <Route path="/admin-test" element={<AdminTest />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App