// components/Test/AdminTest.jsx
import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Card, Typography, Space, Spin } from 'antd';
import { CrownOutlined } from '@ant-design/icons';
import './TestPages.css';

const { Title, Text } = Typography;

const AdminTest = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const response = await api.get('/test/admin');
        setMessage(response.data);
      } catch (error) {
        setMessage('Error fetching admin content');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  return (
    <Card
      className="card-3d"
      style={{
        maxWidth: 800,
        margin: '0 auto',
        background: 'linear-gradient(145deg, #3a0ca3, #4361ee)',
        border: 'none',
      }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2} style={{ color: '#e0aaff' }} className="glow-text">
          <CrownOutlined /> Admin Test
        </Title>

        {loading ? (
          <Spin size="large" />
        ) : (
          <Text
            style={{
              fontSize: '18px',
              color: '#4cc9f0',
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

export default AdminTest;