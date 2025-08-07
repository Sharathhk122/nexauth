// components/Test/UserTest.jsx
import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Card, Typography, Space, Spin } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import './TestPages.css';

const { Title, Text } = Typography;

const UserTest = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get('/test/user');
        setMessage(response.data);
      } catch (error) {
        setMessage('Error fetching user content');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Card
      className="card-3d"
      style={{
        maxWidth: 800,
        margin: '0 auto',
        background: 'linear-gradient(145deg, #f72585, #b5179e)',
        border: 'none',
      }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2} style={{ color: '#e0aaff' }} className="glow-text">
          <UserOutlined /> User Test
        </Title>

        {loading ? (
          <Spin size="large" />
        ) : (
          <Text
            style={{
              fontSize: '18px',
              color: '#f8bbd0',
              textAlign: 'center',
              padding: '20px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '8px',
            }}
          >
            {message}
          </Text>
        )}
      </Space>
    </Card>
  );
};

export default UserTest;