import { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'
import api from '../../api/axios'

const AdminTest = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await api.get('/test/admin')
        setMessage(response.data)
      } catch (error) {
        setMessage('Error fetching admin content')
      }
    }
    
    fetchAdminData()
  }, [])

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Admin Test
      </Typography>
      <Typography variant="body1">
        {message}
      </Typography>
    </Box>
  )
}

export default AdminTest