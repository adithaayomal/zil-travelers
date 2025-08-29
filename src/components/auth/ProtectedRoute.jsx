import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ children, requireAdmin = false, requiredRole = null }) => {
  const { currentUser, loading, hasRole, hasAnyAdminRole } = useAuth();

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

  if (!currentUser) {
    // Redirect to login page with return url
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  // Check admin access
  if (requireAdmin && !hasAnyAdminRole()) {
    return <Navigate to="/" replace />;
  }

  // Check specific role access
  if (requiredRole && !hasRole(requiredRole)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
