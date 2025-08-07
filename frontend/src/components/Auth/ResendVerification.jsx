import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { resendVerification } from '../../api/auth';
import { Form, Input, Button, Typography, Space, Divider } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './index.css';

const { Title, Text } = Typography;

const ResendVerification = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
    }),
    onSubmit: async (values) => {
      setError(null);
      try {
        await resendVerification(values.email);
        setSuccess('Verification code resent successfully! Please check your email.');
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to resend verification code');
      }
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="card-3d floating">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Title level={3} className="auth-title">
              RESEND VERIFICATION
            </Title>
            <Text type="secondary" className="auth-subtitle">
              Enter your email to receive a new code
            </Text>

            {error && <div className="auth-message auth-error">{error}</div>}
            {success && <div className="auth-message auth-success">{success}</div>}

            <Form onFinish={formik.handleSubmit} className="auth-form">
              <Form.Item
                help={formik.touched.email && formik.errors.email}
                validateStatus={formik.touched.email && formik.errors.email ? 'error' : ''}
              >
                <Input
                  prefix={<MailOutlined style={{ color: 'var(--light)' }} />}
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
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
                >
                  RESEND CODE
                </Button>
              </Form.Item>
            </Form>

            <Divider style={{ borderColor: 'rgba(224, 170, 255, 0.2)' }} />

            <Text className="auth-info">
              Remember your code?{' '}
              <Link to="/verify-email" className="auth-link">
                Verify Email
              </Link>
            </Text>
          </Space>
        </div>
      </div>
      <div className="auth-bg-circle bg-circle-1"></div>
      <div className="auth-bg-circle bg-circle-2"></div>
    </div>
  );
};

export default ResendVerification;