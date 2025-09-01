

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { Container, Box, Paper, Typography, Button, TextField, Alert, CircularProgress, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import loginBg from '../assets/login.jpg';


// --- Styled Components ---
const GlassCard = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 320,
  maxWidth: 450,
  width: '100%',
  minHeight: 500,
  boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
  borderRadius: 24,
  overflow: 'hidden',
  background: 'rgba(255,255,255,0.85)',
  [theme.breakpoints.down('md')]: {
    maxWidth: 420,
    minHeight: 450,
  },
}));

const FormBox = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(4, 3),
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  minWidth: 0,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3, 2),
  },
}));

const AccentBar = styled('div')(({ theme, color }) => ({
  width: 48,
  height: 6,
  borderRadius: 3,
  margin: '0 auto 18px',
  background: theme.palette[color]?.main || theme.palette.primary.main,
}));

const BackgroundBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  zIndex: 0,
  background: `
    linear-gradient(120deg, rgba(52,152,219,0.25) 0%, rgba(46,204,113,0.18) 100%),
    url(${loginBg}) center center / cover no-repeat
  `,
  opacity: 1,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    background: 'linear-gradient(120deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.18) 100%)',
    zIndex: 1,
    pointerEvents: 'none',
  },
}));

const LoginForm = ({ onGoogleLogin, onCreateAccount }) => {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const user = userCredential.user;
      
      // Update last login timestamp
      if (user) {
        const userDocRef = doc(db, 'users', user.uid);
        await setDoc(userDocRef, {
          lastLogin: serverTimestamp()
        }, { merge: true });
      }
      
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    } catch (error) {
      setLoginError(error.message);
    } finally {
      setLoginLoading(false);
    }
  };

  return (
    <FormBox>
      <AccentBar color="primary" />
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'primary.main', letterSpacing: 1, textAlign: 'center' }}>
        Login
      </Typography>
      {loginError && (
        <Alert severity="error" sx={{ mb: 2 }}>{loginError}</Alert>
      )}
      <form onSubmit={handleLogin}>
        <TextField
          label="Email Address"
          type="email"
          fullWidth
          required
          margin="normal"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
          disabled={loginLoading}
          sx={{ background: 'rgba(52,152,219,0.06)', borderRadius: 2, mb: 1 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          margin="normal"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
          disabled={loginLoading}
          sx={{ background: 'rgba(52,152,219,0.06)', borderRadius: 2, mb: 1 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ mt: 2, mb: 1, borderRadius: 3, fontWeight: 700, fontSize: '1.1rem', boxShadow: '0 2px 8px 0 rgba(52,152,219,0.10)' }}
          disabled={loginLoading}
        >
          {loginLoading ? <CircularProgress size={22} /> : 'Login'}
        </Button>
      </form>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={onGoogleLogin}
        sx={{ mt: 1, borderRadius: 3, fontWeight: 700, color: 'primary.main', borderColor: 'primary.main', background: 'rgba(52,152,219,0.06)', '&:hover': { background: 'rgba(52,152,219,0.12)' } }}
        disabled={loginLoading}
      >
        Continue with Google
      </Button>
      
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          Don't have an account?
        </Typography>
        <Button
          variant="text"
          onClick={onCreateAccount}
          sx={{ 
            color: 'primary.main', 
            fontWeight: 600, 
            textDecoration: 'underline',
            '&:hover': {
              backgroundColor: 'rgba(52,152,219,0.08)',
              textDecoration: 'underline'
            }
          }}
        >
          Create Account
        </Button>
      </Box>
    </FormBox>
  );
};

// --- SignupForm Component ---
const SignupForm = ({ onGoogleLogin, onBackToLogin }) => {
  const [signupFirstName, setSignupFirstName] = useState('');
  const [signupLastName, setSignupLastName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRePassword, setSignupRePassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [signupLoading, setSignupLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignup = async (e) => {
    e.preventDefault();
    setSignupError('');
    if (!signupFirstName.trim() || !signupLastName.trim()) {
      setSignupError('Please enter your first and last name.');
      return;
    }
    if (signupPassword !== signupRePassword) {
      setSignupError('Passwords do not match.');
      return;
    }
    setSignupLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, signupEmail, signupPassword);
      const user = userCredential.user;
      
      if (user) {
        // Update user profile
        await user.updateProfile({
          displayName: signupFirstName + ' ' + signupLastName
        });

        // Add user to users collection
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          email: user.email,
          displayName: signupFirstName + ' ' + signupLastName,
          firstName: signupFirstName,
          lastName: signupLastName,
          isAdmin: false,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          provider: 'email'
        });
      }
      
      const from = location.state?.from || '/';
      navigate(from, { replace: true });
    } catch (error) {
      setSignupError(error.message);
    } finally {
      setSignupLoading(false);
    }
  };

  return (
    <FormBox>
      <AccentBar color="secondary" />
      <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: 'secondary.main', letterSpacing: 1, textAlign: 'center' }}>
        Sign Up
      </Typography>
      {signupError && (
        <Alert severity="error" sx={{ mb: 2 }}>{signupError}</Alert>
      )}
      <form onSubmit={handleSignup}>
        <Box sx={{ display: 'flex', gap: 2, mb: 1 }}>
          <TextField
            label="First Name"
            type="text"
            required
            fullWidth
            value={signupFirstName}
            onChange={(e) => setSignupFirstName(e.target.value)}
            disabled={signupLoading}
            sx={{ background: 'rgba(46,204,113,0.06)', borderRadius: 2 }}
          />
          <TextField
            label="Last Name"
            type="text"
            required
            fullWidth
            value={signupLastName}
            onChange={(e) => setSignupLastName(e.target.value)}
            disabled={signupLoading}
            sx={{ background: 'rgba(46,204,113,0.06)', borderRadius: 2 }}
          />
        </Box>
        <TextField
          label="Email Address"
          type="email"
          fullWidth
          required
          margin="normal"
          value={signupEmail}
          onChange={(e) => setSignupEmail(e.target.value)}
          disabled={signupLoading}
          sx={{ background: 'rgba(46,204,113,0.06)', borderRadius: 2, mb: 1 }}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          required
          margin="normal"
          value={signupPassword}
          onChange={(e) => setSignupPassword(e.target.value)}
          disabled={signupLoading}
          sx={{ background: 'rgba(46,204,113,0.06)', borderRadius: 2, mb: 1 }}
        />
        <TextField
          label="Re-type Password"
          type="password"
          fullWidth
          required
          margin="normal"
          value={signupRePassword}
          onChange={(e) => setSignupRePassword(e.target.value)}
          disabled={signupLoading}
          sx={{ background: 'rgba(46,204,113,0.06)', borderRadius: 2, mb: 1 }}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ mt: 2, mb: 1, borderRadius: 3, fontWeight: 700, fontSize: '1.1rem', boxShadow: '0 2px 8px 0 rgba(46,204,113,0.10)' }}
          disabled={signupLoading}
        >
          {signupLoading ? <CircularProgress size={22} /> : 'Sign Up'}
        </Button>
      </form>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<GoogleIcon />}
        onClick={onGoogleLogin}
        sx={{ mt: 1, borderRadius: 3, fontWeight: 700, color: 'secondary.main', borderColor: 'secondary.main', background: 'rgba(46,204,113,0.06)', '&:hover': { background: 'rgba(46,204,113,0.12)' } }}
        disabled={signupLoading}
      >
        Continue with Google
      </Button>
      
      <Box sx={{ textAlign: 'center', mt: 2 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
          Already have an account?
        </Typography>
        <Button
          variant="text"
          onClick={onBackToLogin}
          sx={{ 
            color: 'secondary.main', 
            fontWeight: 600, 
            textDecoration: 'underline',
            '&:hover': {
              backgroundColor: 'rgba(46,204,113,0.08)',
              textDecoration: 'underline'
            }
          }}
        >
          Back to Login
        </Button>
      </Box>
    </FormBox>
  );
};

// --- Main LoginPage Layout ---

import { useEffect } from 'react';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showSignup, setShowSignup] = useState(false);

  // Redirect to home if already logged in
  useEffect(() => {
    if (auth.currentUser) {
      navigate('/', { replace: true });
    }
    // Optionally, listen for auth state changes:
    // const unsubscribe = auth.onAuthStateChanged(user => {
    //   if (user) navigate('/', { replace: true });
    // });
    // return unsubscribe;
  }, [navigate]);

  // Shared Google login handler for both forms
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user already exists in users collection
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (!userDoc.exists()) {
        // User doesn't exist, create new user document
        const nameParts = user.displayName ? user.displayName.split(' ') : ['', ''];
        const firstName = nameParts[0] || '';
        const lastName = nameParts.slice(1).join(' ') || '';
        
        await setDoc(userDocRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || '',
          firstName: firstName,
          lastName: lastName,
          isAdmin: false,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
          provider: 'google',
          photoURL: user.photoURL || ''
        });
      } else {
        // User exists, update last login
        await setDoc(userDocRef, {
          lastLogin: serverTimestamp()
        }, { merge: true });
      }
      
      navigate('/', { replace: true });
    } catch (error) {
      // Optionally handle error globally
      console.error('Google login error:', error);
    }
  };

  return (
    <>
      <BackgroundBox />
      <Box sx={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
        <GlassCard elevation={6}>
          {!showSignup ? (
            <LoginForm 
              onGoogleLogin={handleGoogleLogin} 
              onCreateAccount={() => setShowSignup(true)}
            />
          ) : (
            <SignupForm 
              onGoogleLogin={handleGoogleLogin} 
              onBackToLogin={() => setShowSignup(false)}
            />
          )}
        </GlassCard>
        <Button
          fullWidth
          variant="text"
          onClick={() => navigate('/')}
          sx={{ mt: 3, position: 'absolute', left: 0, right: 0, bottom: 24, width: { xs: '90%', md: 400 }, mx: 'auto', color: 'primary.dark', fontWeight: 700, fontSize: '1.08rem', letterSpacing: 0.5 }}
        >
          Back to Home
        </Button>
      </Box>
    </>
  );
};

export default LoginPage;
// ...existing code...
