import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate, Link } from 'react-router-dom'; // Added Link
import { verifyEmail } from '../../api/auth';
import { Button, Form, Input, Card, Typography, Alert, Divider, Spin } from 'antd';
import { MailOutlined, SafetyOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

const VerifyEmail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const emailFromState = location.state?.email || '';

  const formik = useFormik({
    initialValues: {
      email: emailFromState,
      code: ''
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      code: Yup.string().required('Verification code is required')
    }),
    onSubmit: async (values) => {
      setError(null);
      setLoading(true);
      try {
        await verifyEmail(values.email, values.code);
        setSuccess('Email verified successfully! You can now login.');
        setTimeout(() => navigate('/login'), 2000);
      } catch (err) {
        setError(err.message || 'Verification failed. Please try again.');
      } finally {
        setLoading(false);
      }
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card
          className="bg-dark-700 border-none shadow-lg"
          hoverable
          bordered={false}
        >
          <div className="text-center mb-6">
            <motion.div
              animate={{ 
                rotateZ: [0, 180, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                repeatType: "loop"
              }}
            >
              <div className="w-20 h-20 bg-primary-500 rounded-full mx-auto flex items-center justify-center shadow-lg">
                <SafetyOutlined className="text-3xl text-dark-100" />
              </div>
            </motion.div>
            <Title level={3} className="mt-4 text-light-100">Verify Email</Title>
            <Text className="text-light-300">Enter your verification code</Text>
          </div>

          {error && (
            <Alert 
              message={error} 
              type="error" 
              showIcon 
              className="mb-6" 
              closable
              onClose={() => setError(null)}
            />
          )}

          {success && (
            <Alert 
              message={success} 
              type="success" 
              showIcon 
              className="mb-6" 
            />
          )}

          <Spin spinning={loading} tip="Verifying...">
            <Form onFinish={formik.handleSubmit} layout="vertical">
              <Form.Item
                label={<span className="text-light-300">Email</span>}
                validateStatus={formik.touched.email && formik.errors.email ? 'error' : ''}
                help={formik.touched.email && formik.errors.email}
              >
                <Input
                  prefix={<MailOutlined className="text-light-300" />}
                  name="email"
                  size="large"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-dark-600 border-dark-500 text-light-100 hover:border-primary-500 focus:border-primary-500"
                />
              </Form.Item>

              <Form.Item
                label={<span className="text-light-300">Verification Code</span>}
                validateStatus={formik.touched.code && formik.errors.code ? 'error' : ''}
                help={formik.touched.code && formik.errors.code}
              >
                <Input
                  prefix={<SafetyOutlined className="text-light-300" />}
                  name="code"
                  size="large"
                  value={formik.values.code}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="bg-dark-600 border-dark-500 text-light-100 hover:border-primary-500 focus:border-primary-500"
                />
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                block
                className="bg-primary-500 hover:bg-primary-600 border-none h-12 font-semibold text-dark-100"
              >
                {loading ? 'Verifying...' : 'Verify Email'}
              </Button>

              <Divider className="border-dark-500 text-light-300">or</Divider>

              <div className="text-center">
                <Text className="text-light-300">Need a new code? </Text>
                <Link 
                  to="/resend-code" 
                  className="text-primary-400 hover:text-primary-300 font-medium"
                >
                  Resend
                </Link>
              </div>
            </Form>
          </Spin>
        </Card>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;