import api from './axios'

export const login = async (username, password) => {
  try {
    const response = await api.post('/auth/signin', { username, password });
    if (response.data?.token) {
      localStorage.setItem('token', response.data.token);
      return { 
        success: true, 
        data: response.data,
        message: 'Login successful'
      };
    }
    throw new Error(response.data?.message || 'Authentication failed');
  } catch (error) {
    let errorMessage = 'Login failed. Please try again.';
    
    if (error.response) {
      errorMessage = error.response.data?.message || 
                   error.response.data?.error ||
                   `Server error: ${error.response.status}`;
    } else if (error.message.includes('timeout')) {
      errorMessage = 'Connection timeout. Please check your network.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return { success: false, message: errorMessage };
  }
};

export const register = async (username, email, password) => {
  try {
    const response = await api.post('/auth/signup', { 
      username, 
      email, 
      password 
    })
    return { success: true, data: response.data }
  } catch (error) {
    console.error('Registration error:', error)
    let errorMessage = 'Registration failed. Please try again.'
    
    if (error.response) {
      if (error.response.data?.errors) {
        // Handle validation errors from server
        const errors = error.response.data.errors
        errorMessage = Object.values(errors).join(', ')
      } else {
        errorMessage = error.response.data?.message || 
                      error.response.data?.error ||
                      `Server error: ${error.response.status}`
      }
    } else if (error.message.includes('timeout')) {
      errorMessage = 'Connection timeout. Please check your network.'
    }
    
    return { success: false, message: errorMessage }
  }
}

// ... rest of the file remains the same ...
export const verifyEmail = async (email, code) => {
  try {
    const response = await api.post('/auth/verify', { email, code })
    return response.data
  } catch (error) {
    console.error('Email verification error:', error)
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Verification failed. Please try again.'
    throw new Error(errorMessage)
  }
}

export const resendVerification = async (email) => {
  try {
    const response = await api.post('/auth/resend-verification', { email })
    return response.data
  } catch (error) {
    console.error('Resend verification error:', error)
    const errorMessage = error.response?.data?.message || 
                        error.message || 
                        'Failed to resend verification code.'
    throw new Error(errorMessage)
  }
}

export const logout = () => {
  localStorage.removeItem('token')
}

export const getCurrentUser = async () => {
  try {
    const response = await api.get('/test/user')
    return response.data
  } catch (error) {
    console.error('Get current user error:', error)
    throw error
  }
}