// pages/Home.jsx
import { useAuth } from '../context/AuthContext';
import { Card, Typography, Space, Button } from 'antd';
import { RocketOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './Home.css';

const { Title, Paragraph } = Typography;

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="home-container">
      <Card
        className="card-3d floating"
        style={{
          maxWidth: 800,
          margin: '0 auto',
          textAlign: 'center',
          background: 'linear-gradient(145deg, #240046, #3c096c)',
          border: 'none',
        }}
      >
        <Space direction="vertical" size="large">
          <Title level={2} style={{ color: '#e0aaff' }} className="glow-text">
            Welcome to SecureApp
          </Title>
          <Paragraph style={{ fontSize: '18px', color: '#c77dff' }}>
            {user
              ? `Hello, ${user.username}! You're ready to explore.`
              : 'Please login or register to access all features'}
          </Paragraph>

          {!user && (
            <Space size="middle">
              <Link to="/login">
                <Button
                  type="primary"
                  size="large"
                  shape="round"
                  className="animated-button"
                  style={{
                    background: 'linear-gradient(45deg, #7b2cbf, #9d4edd)',
                    border: 'none',
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button
                  size="large"
                  shape="round"
                  className="animated-button"
                  style={{
                    background: 'transparent',
                    border: '1px solid #9d4edd',
                    color: '#e0aaff',
                  }}
                >
                  Register
                </Button>
              </Link>
            </Space>
          )}

          {user && (
            <Link to="/dashboard">
              <Button
                type="primary"
                size="large"
                shape="round"
                icon={<RocketOutlined />}
                className="animated-button"
                style={{
                  background: 'linear-gradient(45deg, #ff6d00, #ff9e00)',
                  border: 'none',
                }}
              >
                Go to Dashboard
              </Button>
            </Link>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default Home;