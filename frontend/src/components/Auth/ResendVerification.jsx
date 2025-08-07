import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { TextField, Button, Box, Typography, Alert } from '@mui/material'
import { resendVerification } from '../../api/auth'

const ResendVerification = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const formik = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required')
    }),
    onSubmit: async (values) => {
      setError(null)
      try {
        await resendVerification(values.email)
        setSuccess('Verification code resent successfully! Please check your email.')
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to resend verification code')
      }
    }
  })

  return (
    <Box sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h5" gutterBottom>Resend Verification Code</Typography>
      
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          margin="normal"
        />
        
        <Button 
          type="submit" 
          variant="contained" 
          fullWidth 
          sx={{ mt: 2 }}
          disabled={formik.isSubmitting}
        >
          Resend Code
        </Button>
      </form>
    </Box>
  )
}

export default ResendVerification