import { useLocation, Navigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '~/redux/user/userSlice';

function Auth() {
  const location = useLocation();
  const isLogin = location.pathname === '/login';
  const isRegister = location.pathname === '/register';

  const currentUser = useSelector(selectCurrentUser);
  if (currentUser) {
    return <Navigate to='/' replace={true} />;
  }

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