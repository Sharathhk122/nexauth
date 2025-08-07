// App.jsx
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Dashboard from './pages/Dashboard';
import VerifyEmailPage from './pages/VerifyEmailPage';
import PublicTest from './components/Test/PublicTest';
import UserTest from './components/Test/UserTest';
import AdminTest from './components/Test/AdminTest';
import PrivateRoute from './components/Layout/PrivateRoute';
import Navbar from './components/Layout/Navbar';
import { useAuth } from './context/AuthContext';
import { Layout, theme, notification } from 'antd';
import { useEffect } from 'react';

const { Content, Footer } = Layout;

function App() {
  const { error } = useAuth();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  useEffect(() => {
    if (error) {
      notification.error({
        message: 'Error',
        description: error,
        placement: 'topRight',
      });
    }
  }, [error]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Navbar />
      <Layout>
        <Content style={{ padding: '0 48px', marginTop: 24 }}>
          <div
            style={{
              padding: 24,
              minHeight: 380,
              background: `linear-gradient(145deg, #1a0933, #0d041a)`,
              borderRadius: borderRadiusLG,
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
            }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/public-test" element={<PublicTest />} />

              <Route element={<PrivateRoute allowedRoles={['ROLE_USER', 'ROLE_ADMIN']} />}>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/user-test" element={<UserTest />} />
              </Route>

              <Route element={<PrivateRoute allowedRoles={['ROLE_ADMIN']} />}>
                <Route path="/admin-test" element={<AdminTest />} />
              </Route>
            </Routes>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center', background: 'transparent' }}>
          SecureApp ©{new Date().getFullYear()} Created with Ant Design
        </Footer>
      </Layout>
    </Layout>
  );
}

export default App;