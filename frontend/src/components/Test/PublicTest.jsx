// components/Test/PublicTest.jsx
import { useState, useEffect } from 'react';
import api from '../../api/axios';
import { Card, Typography, Space, Spin } from 'antd';
import { GlobalOutlined } from '@ant-design/icons';
import './TestPages.css';

const { Title, Text } = Typography;

const PublicTest = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPublicData = async () => {
      try {
        const response = await api.get('/test/all');
        setMessage(response.data);
      } catch (error) {
        setMessage('Error fetching public content');
      } finally {
        setLoading(false);
      }
    };

    fetchPublicData();
  }, []);

  return (
    <Card
      className="card-3d"
      style={{
        maxWidth: 800,
        margin: '0 auto',
        background: 'linear-gradient(145deg, #240046, #3c096c)',
        border: 'none',
      }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Title level={2} style={{ color: '#e0aaff' }} className="glow-text">
          <GlobalOutlined /> Public Test
        </Title>

        {loading ? (
          <Spin size="large" />
        ) : (
          <Text
            style={{
              fontSize: '18px',
              color: '#c77dff',
              textAlign: 'center',
              padding: '20px',
              background: 'rgba(0, 0, 0, 0.3)',
              borderRadius: '8px',
            }}
            className="pulsing"
          >
            {message}
          </Text>
        )}
      </Space>
    </Card>
  );
};

export default PublicTest;