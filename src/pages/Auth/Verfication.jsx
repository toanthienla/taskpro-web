import { useEffect, useState } from 'react';
import { Navigate, useSearchParams } from 'react-router-dom';
import { validateUserApi } from '~/apis';
import LoadingPage from '~/components/Loading/LoadingPage';

const Verification = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  useEffect(() => {
    if (email && token) {
      validateUserApi(email, token).then(() => { setIsVerified(true); });
    }
  }, [email, token]);

  if (!email || !token) {
    return <Navigate to={'/404'} />;
  }

  if (!isVerified) {
    return <LoadingPage content={'Verifying your TaskPro email...'} />;
  }

  return (
    <Navigate to={`/login?verifiedEmail=${email}`} />
  );
};

export default Verification;