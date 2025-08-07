import { Typography, Box } from '@mui/material'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome, {user?.username}! You have {user?.role} privileges.
      </Typography>
    </Box>
  )
}

export default Dashboard