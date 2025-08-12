import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../config/firebase';
import { useEffect, useState } from 'react';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { Box, CircularProgress } from '@mui/material';

const AdminProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(null);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }
      // Query adminUsers collection for current user's UID
      const q = query(collection(db, 'adminUsers'), where('uid', '==', user.uid));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        const adminData = snapshot.docs[0].data();
        if (adminData.isAdmin || adminData.role === 'superadmin') {
          setIsAdmin(true);
          return;
        }
      }
      setIsAdmin(false);
    };
    if (user) checkAdmin();
  }, [user]);

  if (loading || isAdmin === null) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
  }

  return children;
};

export default AdminProtectedRoute;
