import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { verifyEmail } from '../../api/auth';
import { Form, Input, Button, Typography, Space, Divider } from 'antd';
import { MailOutlined, SafetyOutlined } from '@ant-design/icons';
import './index.css';

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
      code: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email').required('Email is required'),
      code: Yup.string().required('Verification code is required'),
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
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="card-3d floating">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Title level={3} className="auth-title">
              VERIFY EMAIL
            </Title>
            <Text type="secondary" className="auth-subtitle">
              Enter your verification code
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

              <Form.Item
                help={formik.touched.code && formik.errors.code}
                validateStatus={formik.touched.code && formik.errors.code ? 'error' : ''}
              >
                <Input
                  prefix={<SafetyOutlined style={{ color: 'var(--light)' }} />}
                  placeholder="Verification Code"
                  name="code"
                  value={formik.values.code}
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
                  loading={loading}
                  size="large"
                >
                  {loading ? 'VERIFYING...' : 'VERIFY EMAIL'}
                </Button>
              </Form.Item>
            </Form>

            <Divider style={{ borderColor: 'rgba(224, 170, 255, 0.2)' }} />

            <Text className="auth-info">
              Need a new code?{' '}
              <Link to="/resend-code" className="auth-link">
                Resend
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

export default VerifyEmail;