import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, Space, Divider } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './index.css';

const { Title, Text } = Typography;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required'),
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
    },
  });

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="card-3d floating">
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <Title level={3} className="auth-title">
              WELCOME BACK
            </Title>
            <Text type="secondary" className="auth-subtitle">
              Login to your account
            </Text>

            {error && (
              <div className="auth-message auth-error">
                {error}
              </div>
            )}

            <Form onFinish={formik.handleSubmit} className="auth-form">
              <Form.Item
                help={formik.touched.username && formik.errors.username}
                validateStatus={formik.touched.username && formik.errors.username ? 'error' : ''}
              >
                <Input
                  prefix={<UserOutlined style={{ color: 'var(--light)' }} />}
                  placeholder="Username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  size="large"
                />
              </Form.Item>

              <Form.Item
                help={formik.touched.password && formik.errors.password}
                validateStatus={formik.touched.password && formik.errors.password ? 'error' : ''}
              >
                <Input.Password
                  prefix={<LockOutlined style={{ color: 'var(--light)' }} />}
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
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
                  {loading ? 'LOGGING IN...' : 'LOGIN'}
                </Button>
              </Form.Item>
            </Form>

            <Divider style={{ borderColor: 'rgba(224, 170, 255, 0.2)' }} />

            <Text className="auth-info">
              Don't have an account?{' '}
              <Link to="/register" className="auth-link">
                Register Here
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

export default Login;