import { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'
import api from '../../api/axios'

const UserTest = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/test/user')
        setMessage(response.data)
      } catch (error) {
        setMessage('Error fetching user content')
      }
    }
    
    fetchUserData()
  }, [])

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        User Test
      </Typography>
      <Typography variant="body1">
        {message}
      </Typography>
    </Box>
  )
}

export default UserTest