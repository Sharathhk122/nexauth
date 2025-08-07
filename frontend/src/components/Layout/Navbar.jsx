import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          SecureApp
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/public-test">Public Test</Button>
          
          {user ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">Dashboard</Button>
              {user.role === 'ROLE_USER' && (
                <Button color="inherit" component={Link} to="/user-test">User Test</Button>
              )}
              {user.role === 'ROLE_ADMIN' && (
                <Button color="inherit" component={Link} to="/admin-test">Admin Test</Button>
              )}
              <Button color="inherit" onClick={logout}>Logout</Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">Login</Button>
              <Button color="inherit" component={Link} to="/register">Register</Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar