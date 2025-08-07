import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../api/auth'
import { 
  Form, 
  Input, 
  Button, 
  Alert, 
  Spin,
  Typography,
  Divider 
} from 'antd'
import { 
  UserOutlined, 
  MailOutlined, 
  LockOutlined,
  LoadingOutlined 
} from '@ant-design/icons'
import './index.css'

const { Title, Text } = Typography

const Register = () => {
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('Username is required')
        .min(3, 'Username must be at least 3 characters')
        .max(20, 'Username must be less than 20 characters')
        .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers and underscores'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
      password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .required('Password is required')
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
          'Must contain at least 8 characters, one uppercase, one lowercase, one number and one special character'
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
    }),
    onSubmit: async (values, { setFieldError }) => {
      setError(null)
      setLoading(true)
      try {
        const response = await register(
          values.username, 
          values.email, 
          values.password
        )
        
        if (response.success) {
          setSuccess(response.data?.message || 'Registration successful! Please check your email for verification.')
          setTimeout(() => {
            navigate('/verify-email', { state: { email: values.email } })
          }, 1500)
        } else {
          if (response.message.includes('Username')) {
            setFieldError('username', response.message)
          } else if (response.message.includes('Email')) {
            setFieldError('email', response.message)
          } else {
            setError(response.message || 'Registration failed. Please try again.')
          }
        }
      } catch (err) {
        setError(err.message || 'An unexpected error occurred. Please try again.')
      } finally {
        setLoading(false)
      }
    }
  })

  return (
    <div className="auth-container">
      <div className="auth-bg-circle bg-circle-1"></div>
      <div className="auth-bg-circle bg-circle-2"></div>
      
      <div className="auth-card">
        <div className="card-3d floating">
          <Title level={2} className="auth-title">
            CREATE ACCOUNT
          </Title>
          <Text type="secondary" className="auth-subtitle">
            Join our vibrant community
          </Text>
          
          {error && (
            <Alert 
              message={error} 
              type="error" 
              showIcon 
              className="auth-message auth-error"
            />
          )}
          {success && (
            <Alert 
              message={success} 
              type="success" 
              showIcon 
              className="auth-message auth-success"
            />
          )}
          
          <Form
            name="register"
            className="auth-form"
            onFinish={formik.handleSubmit}
          >
            <Form.Item
              help={formik.touched.username && formik.errors.username}
              validateStatus={formik.touched.username && formik.errors.username ? "error" : ""}
            >
              <Input
                prefix={<UserOutlined />}
                name="username"
                placeholder="Username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="large"
              />
            </Form.Item>
            
            <Form.Item
              help={formik.touched.email && formik.errors.email}
              validateStatus={formik.touched.email && formik.errors.email ? "error" : ""}
            >
              <Input
                prefix={<MailOutlined />}
                name="email"
                type="email"
                placeholder="Email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="large"
              />
            </Form.Item>
            
            <Form.Item
              help={formik.touched.password && formik.errors.password}
              validateStatus={formik.touched.password && formik.errors.password ? "error" : ""}
            >
              <Input.Password
                prefix={<LockOutlined />}
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="large"
              />
            </Form.Item>
            
            <Form.Item
              help={formik.touched.confirmPassword && formik.errors.confirmPassword}
              validateStatus={formik.touched.confirmPassword && formik.errors.confirmPassword ? "error" : ""}
            >
              <Input.Password
                prefix={<LockOutlined />}
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formik.values.confirmPassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                size="large"
              />
            </Form.Item>
            
            <Form.Item>
              <Button 
                type="primary" 
                htmlType="submit" 
                className="auth-button"
                size="large"
                disabled={!formik.isValid || loading}
                icon={loading ? <LoadingOutlined /> : null}
              >
                {loading ? 'Registering...' : 'REGISTER NOW'}
              </Button>
            </Form.Item>
            
            <Divider style={{ borderColor: 'rgba(123, 44, 191, 0.3)' }} />
            
            <div className="auth-info">
              <Text>
                Already have an account?{' '}
                <Link to="/login" className="auth-link">
                  Login Here
                </Link>
              </Text>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Register