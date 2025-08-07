// components/Layout/Navbar.jsx
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Menu, Layout, Button, Avatar, Space, Typography, Divider } from 'antd';
import { LoginOutlined, LogoutOutlined, UserOutlined, DashboardOutlined, HomeOutlined } from '@ant-design/icons';
import './Navbar.css';

const { Header } = Layout;
const { Text } = Typography;

const Navbar = () => {
  const { user, logout } = useAuth();

  const items = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/">Home</Link>,
    },
    {
      key: 'public',
      label: <Link to="/public-test">Public Test</Link>,
    },
    ...(user
      ? [
          {
            key: 'dashboard',
            icon: <DashboardOutlined />,
            label: <Link to="/dashboard">Dashboard</Link>,
          },
          ...(user.role === 'ROLE_USER'
            ? [
                {
                  key: 'user-test',
                  label: <Link to="/user-test">User Test</Link>,
                },
              ]
            : []),
          ...(user.role === 'ROLE_ADMIN'
            ? [
                {
                  key: 'admin-test',
                  label: <Link to="/admin-test">Admin Test</Link>,
                },
              ]
            : []),
        ]
      : []),
  ];

  return (
    <Header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(90deg, #10002b, #240046)',
        padding: '0 24px',
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.45)',
      }}
    >
      <div className="logo" style={{ marginRight: '24px' }}>
        <Text strong style={{ color: '#e0aaff', fontSize: '20px' }}>
          SecureApp
        </Text>
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        items={items}
        style={{
          flex: 1,
          minWidth: 0,
          background: 'transparent',
          borderBottom: 'none',
        }}
      />

      <Space size="middle">
        {user ? (
          <>
            <Avatar
              icon={<UserOutlined />}
              style={{
                backgroundColor: '#7b2cbf',
                transform: 'rotateY(20deg)',
                transition: 'all 0.3s',
              }}
            />
            <Text style={{ color: '#e0aaff' }}>{user.username}</Text>
            <Button
              type="primary"
              shape="round"
              icon={<LogoutOutlined />}
              onClick={logout}
              className="animated-button"
              style={{
                background: 'linear-gradient(45deg, #ff6d00, #ff9e00)',
                border: 'none',
              }}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Link to="/login">
              <Button
                type="primary"
                shape="round"
                icon={<LoginOutlined />}
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
          </>
        )}
      </Space>
    </Header>
  );
};

export default Navbar;