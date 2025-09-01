import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';

// Pages
import Home from './pages/Home';
import ToursPage from './pages/Tours';


import NotFound from './pages/NotFound';
import LoginPage from './pages/Login';
import AccountPage from './pages/Account';
import AdminPage from './pages/Admin';
import BookPage from './pages/Book';

import About from './pages/About';

//tours
import TalesOfThePeakPage from './pages/tours/TalesOfThePeakPage';
import IslandBeauty from './pages/tours/IslandBeauty';
import p7DayClassic from './pages/tours/p7DayClassic';
import p10DayWildLife from './pages/tours/p10DayWildLife';
import p12DayCultural from './pages/tours/p12DayCultural';



// Protected Route component
import ProtectedRoute from './components/auth/ProtectedRoute';

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#3498db',
      light: '#5dade2',
      dark: '#2980b9',
    },
    secondary: {
      main: '#2ecc71',
      light: '#54d98c',
      dark: '#27ae60',
    },
    background: {
      default: '#ffffff',
      paper: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 25,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 24px',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 15,
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#ffffff',
          margin: 0,
          padding: 0,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tours" element={<ToursPage />} />
              
              <Route path="/tours/tales-of-the-peak" element={<TalesOfThePeakPage />} />
              <Route path="/tours/island-beauty" element={<IslandBeauty />} />
              <Route path="/tours/7-day-classic" element={<p7DayClassic />} />
              <Route path="/tours/10-day-wildLife" element={<p10DayWildLife />} />
              <Route path="/tours/12-day-cultural" element={<p12DayCultural />} />
              
              <Route path="/login" element={<LoginPage />} />
              <Route path="/about" element={<About />} />

              
              {/* Protected Routes */}
              <Route 
                path="/account" 
                element={
                  <ProtectedRoute>
                    <AccountPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/book" 
                element={
                  <ProtectedRoute>
                    <BookPage />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
