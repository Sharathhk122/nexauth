import { Typography, Box } from '@mui/material'
import { useAuth } from '../context/AuthContext'

const Home = () => {
  const { user } = useAuth()

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h3" gutterBottom>
        Welcome to SecureApp
      </Typography>
      <Typography variant="h5">
        {user ? `Hello, ${user.username}!` : 'Please login or register'}
      </Typography>
    </Box>
  )
}

export default Home