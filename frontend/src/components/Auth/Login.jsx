import { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAuth } from '../../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Input, Card, Typography, Alert, Divider, Spin } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import { motion } from 'framer-motion'

const { Title, Text } = Typography

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required')
    }),
    onSubmit: async (values) => {
      setError(null);
      setLoading(true);
      try {
        const result = await login(values.username, values.password);
        if (result.success) {
          navigate('/dashboard');
        } else {
          setError(result.message || 'Login failed. Please check your credentials.');
        }
      } catch (err) {
        setError(err.message || 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 flex items-center justify-center p-4 overflow-hidden">
      {/* Background animated elements */}
      <motion.div 
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600 rounded-full opacity-10"
        animate={{
          scale: [1, 1.5, 1],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-indigo-600 rounded-full opacity-10"
        animate={{
          scale: [1, 1.8, 1],
          x: [0, -40, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, rotateY: 90 }}
        animate={{ opacity: 1, y: 0, rotateY: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="w-full max-w-md z-10"
      >
        <Card
          className="bg-gray-800 border-0 shadow-2xl"
          hoverable
          bordered={false}
          style={{
            backdropFilter: 'blur(10px)',
            backgroundColor: 'rgba(31, 41, 55, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}
        >
          <div className="text-center mb-6">
            <motion.div
              animate={{ 
                rotateY: [0, 180, 360],
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 0 0 rgba(124, 58, 237, 0.4)',
                  '0 0 0 10px rgba(124, 58, 237, 0)',
                  '0 0 0 0 rgba(124, 58, 237, 0)'
                ]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-full mx-auto flex items-center justify-center shadow-lg">
                <UserOutlined className="text-3xl text-gray-100" />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Title level={3} className="mt-4 text-gray-100 font-bold">Welcome Back</Title>
              <Text className="text-gray-300">Login to your account</Text>
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
                className="mb-6" 
                closable
                onClose={() => setError(null)}
              />
            </motion.div>
          )}

          <Spin spinning={loading} tip="Authenticating..." size="large">
            <Form onFinish={formik.handleSubmit} layout="vertical">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Form.Item
                  label={<span className="text-gray-300 font-medium">Username</span>}
                  validateStatus={formik.touched.username && formik.errors.username ? 'error' : ''}
                  help={formik.touched.username && formik.errors.username}
                >
                  <Input
                    prefix={<UserOutlined className="text-gray-400" />}
                    name="username"
                    size="large"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-700 border-gray-600 text-gray-100 hover:border-purple-500 focus:border-purple-500 placeholder-gray-400"
                    placeholder="Enter your username"
                  />
                </Form.Item>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Form.Item
                  label={<span className="text-gray-300 font-medium">Password</span>}
                  validateStatus={formik.touched.password && formik.errors.password ? 'error' : ''}
                  help={formik.touched.password && formik.errors.password}
                >
                  <Input.Password
                    prefix={<LockOutlined className="text-gray-400" />}
                    name="password"
                    size="large"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className="bg-gray-700 border-gray-600 text-gray-100 hover:border-purple-500 focus:border-purple-500 placeholder-gray-400"
                    placeholder="Enter your password"
                  />
                </Form.Item>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="large"
                    loading={loading}
                    block
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 border-none h-12 font-semibold text-gray-100 shadow-lg"
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </Button>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <Divider className="border-gray-600 text-gray-400">or</Divider>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="text-center"
              >
                <Text className="text-gray-400">Don't have an account? </Text>
                <Link 
                  to="/register" 
                  className="text-purple-400 hover:text-purple-300 font-medium"
                >
                  Register
                </Link>
              </motion.div>
            </Form>
          </Spin>
        </Card>
      </motion.div>

      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-500 opacity-20"
          style={{
            width: Math.random() * 20 + 10,
            height: Math.random() * 20 + 10,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 100],
            x: [0, (Math.random() - 0.5) * 100],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}

export default Login