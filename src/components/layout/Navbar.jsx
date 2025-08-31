import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/images/logozil.png';
import { styled } from '@mui/material/styles';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  InputBase,
  Box,
  useTheme,
  useMediaQuery,
  Avatar,
  Menu,
  MenuItem,
  Chip
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { useAuth } from '../../contexts/AuthContext';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #3498db 0%, #2ecc71 100%)',
  boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  maxHeight: '64px',
  backdropFilter: 'blur(10px)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(255, 255, 255, 0.1)',
    zIndex: -1
  }
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '30px',
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: '40ch',
  },
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'rgba(255, 255, 255, 0.8)'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1.5, 1, 1.5, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.7)',
      opacity: 1
    }
  },
}));

const NavLink = styled(Link)(({ theme }) => ({
  color: 'white',
  textDecoration: 'none',
  marginRight: theme.spacing(4),
  fontFamily: '"Poppins", "Roboto", sans-serif',
  fontWeight: 500,
  fontSize: '1rem',
  position: 'relative',
  transition: 'all 0.3s ease',
  '&:hover': {
    color: 'rgba(255, 255, 255, 0.9)',
    transform: 'translateY(-2px)',
    '&::after': {
      width: '100%',
      opacity: 1
    }
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -5,
    left: 0,
    width: '0%',
    height: '2px',
    backgroundColor: '#2ecc71',
    transition: 'all 0.3s ease',
    opacity: 0
  }
}));

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const open = Boolean(anchorEl);

  // Use AuthContext for authentication
  const { currentUser, userRole, isAdmin, userData, logout, hasAnyAdminRole } = useAuth();

  const isLoggedIn = !!currentUser;
  const displayName = currentUser?.displayName || currentUser?.email?.split('@')[0] || '';
  const photoURL = currentUser?.photoURL;

  // Determine menu items based on login status
  let menuItems = [
    { text: 'Home', path: '/' },
    { text: 'Tours', path: '/tours' },
    { text: 'About', path: '/about' },

  ];
  
  if (isLoggedIn) {
    menuItems.push(
      { text: 'Account', path: '/account' },
      { text: 'Book', path: '/book' }
    );
    
    // Add admin menu for users with admin roles
    if (hasAnyAdminRole()) {
      menuItems.push({ text: 'Admin', path: '/admin' });
    }
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // ...existing code...

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };  const drawer = (
    <List>
      {menuItems.map((item) => (
        <ListItem 
          button 
          key={item.text} 
          component={Link} 
          to={item.path}
          onClick={handleDrawerToggle}
        >
          <ListItemText primary={item.text} />
        </ListItem>
      ))}
    </List>
  );

  return (
    <>
      <StyledAppBar position="sticky">
        <Toolbar>
          {isMobile && (
            <IconButton
              color="inherit"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ 
                mr: 2,
                color: 'white',
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.1)'
                }
              }}
            >
              <MenuIcon />
            </IconButton>
          )}

          <Box sx={{ display: 'flex', alignItems: 'center', mr: 3 }}>
            <Box
              component={Link}
              to="/"
              sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none', mr: 1 }}
            >
              <Box
                component="img"
                src={logo}
                alt="Zil Travelers Logo"
                sx={{ height: 38, width: 38, mr: 1, borderRadius: '50%', background: 'transparent' }}
              />
              <Typography
                variant="h5"
                sx={{
                  flexGrow: 0,
                  textDecoration: 'none',
                  fontFamily: '"Poppins", "Roboto", sans-serif',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  color: '#ffffff',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    color: '#e0e0e0'
                  }
                }}
              >
                ZilTravelers
              </Typography>
            </Box>
          </Box>

          {!isMobile && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              


              
              {/* Admin button on right side for admin users */}
              {isLoggedIn && hasAnyAdminRole() && (
                <Button
                  key="admin"
                  component={Link}
                  to="/admin"   
                  variant="outlined"
                  color="primary"
                  sx={{
                    borderRadius: '30px',
                    fontWeight: 600,
                    fontSize: '1rem',
                    marginRight: 2,
                    
                    px: 2.5,
                    py: 1,
                    ml: 2,
                    textTransform: 'none',
                    transition: 'all 0.3s',
                   borderColor: 'trasparent',
                   borderWidth: '0px',
                    color: '#0f62afff',
                    '&:hover': {
                      borderWidth: '0px',
                      
                    }
                  }}
                >
                  Admin
                </Button>
              )}

              {menuItems.filter(item => item.text !== 'Admin').map((item) => (
                <NavLink key={item.text} to={item.path}>
                  {item.text}
                </NavLink>
              ))}
            </Box>
          )}

          <Box sx={{ flexGrow: 1 }} />

          {/* Welcome message and logout for authenticated users */}
          {isLoggedIn && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip 
                label={userRole || 'user'} 
                size="small" 
                color={hasAnyAdminRole() ? 'error' : 'primary'}
                sx={{ mr: 1, fontSize: '0.75rem', display: { xs: 'none', sm: 'inline-flex' } }}
              />
              <Typography variant="subtitle2" sx={{ color: '#065ea7ff', fontWeight: 500, mr: 2, display: { xs: 'none', sm: 'block' } }}>
                Hello, {displayName}
              </Typography>
              <Button
                onClick={handleLogout}
                variant="outlined"
                color="inherit"
                sx={{
                  borderRadius: '30px',
                  fontWeight: 700,
                  color: 'red',
                  borderColor: 'rgba(255, 0, 0, 0.7)',
                  fontSize: '0.875rem',
                  px: 2.5,
                  textTransform: 'none',
                  transition: 'all 0.3s',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 58, 58, 1)',
                    borderColor: 'white',
                    color: 'white',
                  }
                }}
              >
                Logout
              </Button>
            </Box>
          )}

          {/* Login button for unauthenticated users */}
          {!isLoggedIn && (
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="primary"
              sx={{
                borderRadius: '30px',
                fontWeight: 700,
                fontSize: '1rem',
                boxShadow: '0 2px 8px rgba(52,152,219,0.18)',
                px: 3,
                py: 1,
                ml: 2,
                textTransform: 'none',
                transition: 'all 0.3s',
                '&:hover': {
                  backgroundColor: '#1976d2',
                  transform: 'scale(1.05)'
                }
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </StyledAppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 260,
            background: 'linear-gradient(135deg, #3498db 0%, #2ecc71 100%)',
            color: '#fff',

         
            border: 'none',
            paddingTop: 2,
            paddingBottom: 2,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
           
          },
        }}
      >
        
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
