import { useState, useEffect } from 'react'
import { Typography, Box } from '@mui/material'
import api from '../../api/axios'

const PublicTest = () => {
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const response = await api.get('/test/all')
        setMessage(response.data)
      } catch (error) {
        setMessage('Error fetching public content')
      }
    }
    
    fetchPublicData()
  }, [])

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Public Test
      </Typography>
      <Typography variant="body1">
        {message}
      </Typography>
    </Box>
  )
}

export default PublicTest