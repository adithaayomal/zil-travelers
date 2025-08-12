import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../config/firebase';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          height: '100vh'
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    // Redirect to login page with return url
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
