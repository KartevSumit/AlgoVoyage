import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RootState } from '../reducers';
import toast from 'react-hot-toast';
import { useEffect, useRef } from 'react';

type User = {
  progress?: boolean;
};

export default function ProtectedRoute({ children }: any) {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user.user as User);
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!user && !hasShownToast.current) {
      toast.error('Login to access this page');
      hasShownToast.current = true;
    }
  }, [user]);

  if (!user) {
    return <Navigate to="/authentication/login" state={{ from: location }} replace />;
  }
  if (!(user.progress) && location.pathname !== '/complete-profile') {
    //console.log(user.progress);
    toast.error('Complete your profile to access this page');
    return <Navigate to="/complete-profile" replace />;
  }

  return children;
}
