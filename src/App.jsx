import Board from './pages/Boards/_id';
import NotFound from '~/components/404/NotFound';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Auth from '~/pages/Auth/Auth';
import Verification from '~/pages/Auth/Verfication';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '~/redux/user/userSlice';
import Settings from '~/pages/Settings/Settings';

// Function to validate have user in localStorage help prevent visit unwanted site
const ProtectedRoute = ({ user }) => {
  if (!user) return <Navigate to='/login' replace={true} />;
  return <Outlet />; // Outlet is child components
};

function App() {
  const currentUser = useSelector(selectCurrentUser);

  return (
    <Routes>

      <Route element={<ProtectedRoute user={currentUser} />}>
        {/* Board _id */}
        <Route path='/' element={
          <Navigate to='/boards/675681d53d32c24d9305bd48' replace={true} />
        } />
        <Route path='/boards/:boardId' element={<Board />} />

        {/* User settings */}
        <Route path='/settings/account' element={<Settings />} />
        <Route path='/settings/security' element={<Settings />} />
      </Route>

      {/* User account */}
      <Route path='/login' element={<Auth />} />
      <Route path='/register' element={<Auth />} />
      <Route path='/account/verification' element={<Verification />} />

      {/* 404 page */}
      <Route path='*' element={<NotFound />} />

    </Routes>
  );
}


export default App;
