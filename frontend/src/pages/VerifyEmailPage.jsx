import VerifyEmail from '../components/Auth/VerifyEmail'
import ResendVerification from '../components/Auth/ResendVerification'
import { Box } from '@mui/material'

const VerifyEmailPage = () => {
  return (
    <Box>
      <VerifyEmail />
      <Box sx={{ mt: 4 }}>
        <ResendVerification />
      </Box>
    </Box>
  )
}

export default VerifyEmailPage