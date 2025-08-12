import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Box sx={{ 
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        backgroundColor: 'background.default'
      }}>
        <Navbar />
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {children}
        </Box>
        <Footer />
      </Box>
    </>
  );
};

export default Layout;
