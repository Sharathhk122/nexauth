import VerifyEmail from '../components/Auth/VerifyEmail';
import ResendVerification from '../components/Auth/ResendVerification';
import { Space } from 'antd';

const VerifyEmailPage = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <VerifyEmail />
      <ResendVerification />
    </Space>
  );
};

export default VerifyEmailPage;