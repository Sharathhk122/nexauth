// pages/Dashboard.jsx
import { useAuth } from '../context/AuthContext';
import { Card, Typography, Row, Col, Space } from 'antd';
import { CrownOutlined, UserOutlined, SafetyOutlined } from '@ant-design/icons';
import './Dashboard.css';

const { Title, Text } = Typography;

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      <Title level={2} style={{ color: '#e0aaff', textAlign: 'center' }} className="glow-text">
        Dashboard
      </Title>

      <Row gutter={[24, 24]} justify="center">
        <Col xs={24} md={12} lg={8}>
          <Card
            className="card-3d"
            style={{
              background: 'linear-gradient(145deg, #240046, #3c096c)',
              border: 'none',
              height: '100%',
            }}
          >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <UserOutlined
                style={{
                  fontSize: '48px',
                  color: '#9d4edd',
                  transform: 'rotateY(20deg)',
                }}
              />
              <Title level={4} style={{ color: '#e0aaff' }}>
                Welcome, {user?.username}!
              </Title>
              <Text style={{ color: '#c77dff' }}>
                You have <strong>{user?.role}</strong> privileges.
              </Text>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={8}>
          <Card
            className="card-3d"
            style={{
              background: 'linear-gradient(145deg, #3a0ca3, #4361ee)',
              border: 'none',
              height: '100%',
            }}
          >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <SafetyOutlined
                style={{
                  fontSize: '48px',
                  color: '#4cc9f0',
                  transform: 'rotateY(-20deg)',
                }}
              />
              <Title level={4} style={{ color: '#e0aaff' }}>
                Account Security
              </Title>
              <Text style={{ color: '#c77dff' }}>
                Your account is protected with advanced security measures.
              </Text>
            </Space>
          </Card>
        </Col>

        <Col xs={24} md={12} lg={8}>
          <Card
            className="card-3d"
            style={{
              background: 'linear-gradient(145deg, #f72585, #b5179e)',
              border: 'none',
              height: '100%',
            }}
          >
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <CrownOutlined
                style={{
                  fontSize: '48px',
                  color: '#ff9e00',
                  transform: 'rotateY(10deg)',
                }}
              />
              <Title level={4} style={{ color: '#e0aaff' }}>
                {user?.role === 'ROLE_ADMIN' ? 'Admin' : 'User'} Features
              </Title>
              <Text style={{ color: '#c77dff' }}>
                {user?.role === 'ROLE_ADMIN'
                  ? 'You have access to all administrative features.'
                  : 'Explore your user-specific features.'}
              </Text>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;