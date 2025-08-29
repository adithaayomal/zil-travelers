import { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import { 
  onAuthStateChanged, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from 'firebase/auth';
import { doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { CircularProgress, Box } from '@mui/material';

const AuthContext = createContext({
  currentUser: null,
  userData: null,
  userRole: null,
  loading: true,
  login: () => {},
  logout: () => {},
  register: () => {},
  hasRole: () => false,
  hasAnyAdminRole: () => false,
  isAdmin: false
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // Fetch user data from Firestore
        const userDocRef = doc(db, 'users', user.uid);
        const userDocSnap = await getDoc(userDocRef);
        
        if (userDocSnap.exists()) {
          const data = userDocSnap.data();
          setUserData(data);
        } else {
          // Create user document if it doesn't exist (fallback)
          const newUserData = {
            email: user.email,
            name: user.displayName || user.email?.split('@')[0] || '',
            role: 'user',
            isAdmin: false,
            createdAt: new Date().toISOString()
          };
          await setDoc(userDocRef, newUserData);
          setUserData(newUserData);
        }
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Login function
  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Register function
  const register = async (email, password, name) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    
    // Create user document
    const userData = {
      email: email,
      name: name,
      role: 'user',
      isAdmin: false,
      createdAt: new Date().toISOString()
    };
    
    await setDoc(doc(db, 'users', result.user.uid), userData);
    return result;
  };

  // Logout function
  const logout = () => {
    return signOut(auth);
  };

  // Role checking functions
  const hasRole = (role) => {
    return userData?.role === role;
  };

  const hasAnyAdminRole = () => {
    return userData?.isAdmin === true || userData?.role === 'admin' || userData?.role === 'super admin';
  };

  const isAdmin = hasAnyAdminRole();
  const userRole = userData?.role;

  const value = {
    currentUser,
    userData,
    userRole,
    loading,
    login,
    logout,
    register,
    hasRole,
    hasAnyAdminRole,
    isAdmin
  };

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

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
