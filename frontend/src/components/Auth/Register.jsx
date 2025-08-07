import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../api/auth'
import { Button, Form, Input, Card, Typography, Alert, Divider, Spin } from 'antd'
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'

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
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 flex items-center justify-center p-4 overflow-hidden">
      {/* 3D floating background elements */}
      <motion.div 
        className="absolute top-[15%] left-[10%] w-72 h-72 bg-gradient-to-r from-violet-600 to-indigo-800 rounded-full opacity-20 blur-xl"
        animate={{
          y: [0, -40, 0],
          x: [0, -30, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-[20%] right-[15%] w-64 h-64 bg-gradient-to-r from-rose-600 to-pink-700 rounded-full opacity-20 blur-xl"
        animate={{
          y: [0, 30, 0],
          x: [0, 40, 0],
          rotate: [0, -180, -360],
          borderRadius: ["50%", "40%", "50%"]
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />

      <motion.div 
        className="absolute top-1/3 left-2/3 w-56 h-56 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full opacity-15 blur-xl"
        animate={{
          y: [0, -60, 0],
          x: [0, 50, 0],
          scale: [1, 1.3, 1],
          rotate: [0, 270, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />

      {/* Main card with 3D effect */}
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: -10 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ 
          duration: 0.8, 
          type: "spring",
          stiffness: 120,
          damping: 15
        }}
        whileHover={{ 
          y: -10,
          rotateZ: 0.5,
          transition: { duration: 0.3 } 
        }}
        className="w-full max-w-md z-10"
      >
        <Card
          className="bg-gradient-to-br from-gray-900 to-gray-800 border-0 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6)]"
          hoverable
          bordered={false}
          style={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(15, 23, 42, 0.7)',
            border: '1px solid rgba(99, 102, 241, 0.3)',
            borderRadius: '20px',
            transformStyle: 'preserve-3d',
            perspective: '1000px'
          }}
        >
          <div className="text-center mb-6">
            <motion.div
              animate={{ 
                rotateY: [0, 180, 360],
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 0 0 0 rgba(139, 92, 246, 0.4)',
                  '0 0 0 15px rgba(139, 92, 246, 0)',
                  '0 0 0 0 rgba(139, 92, 246, 0)'
                ]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "loop"
              }}
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-violet-600 to-purple-700 rounded-full mx-auto flex items-center justify-center shadow-lg shadow-violet-900/50">
                <motion.div
                  animate={{ 
                    rotateY: [0, 360],
                    scale: [0.9, 1.1, 0.9]
                  }}
                  transition={{ 
                    duration: 6,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <UserOutlined className="text-3xl text-gray-100" />
                </motion.div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Title level={3} className="mt-4 text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-purple-400 font-bold text-2xl tracking-wider">
                CREATE ACCOUNT
              </Title>
              <Text className="text-gray-400">Join our vibrant community</Text>
            </motion.div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Alert 
                message={error} 
                type="error" 
                showIcon 
                className="mb-6 rounded-lg border-0 bg-red-900/50 text-red-100" 
                closable
                onClose={() => setError(null)}
              />
            </motion.div>
          )}

          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Alert 
                message={success} 
                type="success" 
                showIcon 
                className="mb-6 rounded-lg border-0 bg-emerald-900/50 text-emerald-100" 
              />
            </motion.div>
          )}

          <Spin spinning={loading} tip="Processing..." size="large">
            <Form onFinish={formik.handleSubmit} layout="vertical">
              {['username', 'email', 'password', 'confirmPassword'].map((field, i) => (
                <motion.div
                  key={field}
                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0.3 + i * 0.1, type: "spring" }}
                  whileHover={{ y: -3 }}
                >
                  <Form.Item
                    label={<span className="text-gray-300 font-medium">
                      {field === 'confirmPassword' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
                    </span>}
                    validateStatus={formik.touched[field] && formik.errors[field] ? 'error' : ''}
                    help={formik.touched[field] && formik.errors[field]}
                  >
                    <motion.div
                      whileHover={{ 
                        y: -3,
                        transition: { duration: 0.2 }
                      }}
                      style={{ perspective: '1000px' }}
                    >
                      {field.includes('password') ? (
                        <Input.Password
                          prefix={<LockOutlined className="text-gray-400" />}
                          name={field}
                          size="large"
                          value={formik.values[field]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="bg-gray-800/70 border-gray-700 text-gray-100 hover:border-violet-500 focus:border-violet-500 placeholder-gray-500 rounded-xl shadow-lg"
                          placeholder={`Enter your ${field.replace('confirm', '')}`}
                          style={{
                            transformStyle: 'preserve-3d',
                            boxShadow: '0 8px 20px -5px rgba(15, 23, 42, 0.5)'
                          }}
                        />
                      ) : (
                        <Input
                          prefix={
                            field === 'email' ? 
                            <MailOutlined className="text-gray-400" /> : 
                            <UserOutlined className="text-gray-400" />
                          }
                          name={field}
                          size="large"
                          value={formik.values[field]}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          className="bg-gray-800/70 border-gray-700 text-gray-100 hover:border-violet-500 focus:border-violet-500 placeholder-gray-500 rounded-xl shadow-lg"
                          placeholder={`Enter your ${field}`}
                          type={field === 'email' ? 'email' : 'text'}
                          style={{
                            transformStyle: 'preserve-3d',
                            boxShadow: '0 8px 20px -5px rgba(15, 23, 42, 0.5)'
                          }}
                        />
                      )}
                    </motion.div>
                  </Form.Item>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                style={{ perspective: '1000px' }}
              >
                <motion.div
                  whileHover={{ 
                    scale: 1.03,
                    y: -3,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ 
                    scale: 0.97,
                    y: 2
                  }}
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                    disabled={!formik.isValid || loading}
                    block
                    className="bg-gradient-to-r from-violet-700 to-purple-700 hover:from-violet-600 hover:to-purple-600 border-none h-12 font-bold text-gray-100 shadow-lg rounded-xl mt-2"
                    style={{
                      boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.4)',
                      transform: 'translateZ(20px)'
                    }}
                  >
                    {loading ? 'Registering...' : 'REGISTER NOW'}
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Divider className="border-gray-700 text-gray-500">or</Divider>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="text-center"
              >
                <Text className="text-gray-400">Already have an account? </Text>
                <Link 
                  to="/login" 
                  className="text-violet-400 hover:text-violet-300 font-medium"
                >
                  <motion.span
                    whileHover={{ 
                      scale: 1.05,
                      textShadow: "0 0 8px rgba(196, 181, 253, 0.7)"
                    }}
                  >
                    Login Here
                  </motion.span>
                </Link>
              </motion.div>
            </Form>
          </Spin>
        </Card>
      </motion.div>

      {/* 3D floating particles */}
      {[...Array(20)].map((_, i) => {
        const size = Math.random() * 20 + 5;
        return (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: size,
              height: size,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `radial-gradient(circle, 
                ${i % 3 === 0 ? 'rgba(139, 92, 246, 0.6)' : 
                 i % 3 === 1 ? 'rgba(99, 102, 241, 0.6)' : 
                 'rgba(236, 72, 153, 0.6)'}, 
                transparent)`,
              filter: 'blur(2px)',
              zIndex: 0
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 100],
              x: [0, (Math.random() - 0.5) * 100],
              opacity: [0, 0.7, 0],
              rotate: [0, 360],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              repeatType: "loop",
              delay: Math.random() * 5
            }}
          />
        )
      })}

      {/* Floating 3D cubes */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={`cube-${i}`}
          className="absolute"
          style={{
            width: 40,
            height: 40,
            left: `${10 + i * 25}%`,
            top: `${20 + i * 10}%`,
            background: 'rgba(139, 92, 246, 0.15)',
            border: '1px solid rgba(196, 181, 253, 0.2)',
            borderRadius: '8px',
            zIndex: 0
          }}
          animate={{
            rotateX: [0, 180, 360],
            rotateY: [0, 180, 360],
            rotateZ: [0, 15, 0],
            y: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut"
          }}
        />
      ))}
    </div>
  )
}

export default Register