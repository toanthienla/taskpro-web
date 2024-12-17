import { useLocation } from 'react-router-dom';
import Box from '@mui/material/Box';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function Auth() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const isRegister = location.pathname === '/register';

  return (
    <Box sx={{
      display: 'flex',
      minHeight: '100vh',
      justifyContent: 'center'
    }}>
      {isLogin && <LoginForm />}
      {isRegister && <RegisterForm />}
    </Box>
  );
}

export default Auth;