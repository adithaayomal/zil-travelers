import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Box,
  Container,
  Grid,
  Typography,
  useTheme,
  useMediaQuery
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationOnIcon
} from '@mui/icons-material';
import logo from '../../assets/images/logozil.png';

const FooterContainer = styled('footer')(({ theme }) => ({
  background: 'linear-gradient(135deg, #2c3e50 0%, #34495e 50%, #2c3e50 100%)',
  color: '#ecf0f1',
  padding: theme.spacing(6, 0, 3, 0),
  marginTop: 'auto',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(135deg, #3498db 0%, #2ecc71 100%)',
  }
}));

const FooterSection = styled(Box)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: '#bdc3c7',
  textDecoration: 'none',
  fontSize: '0.9rem',
  fontWeight: 400,
  transition: 'all 0.3s ease',
  display: 'inline-block',
  position: 'relative',
  '&:hover': {
    color: '#3498db',
    transform: 'translateX(4px)',
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    left: '-12px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '6px',
    height: '6px',
    backgroundColor: '#3498db',
    borderRadius: '50%',
    opacity: 0,
    transition: 'opacity 0.3s ease',
  },
  '&:hover::before': {
    opacity: 1,
  }
}));

const SocialIcon = styled('a')(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '40px',
  height: '40px',
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '50%',
  color: '#bdc3c7',
  textDecoration: 'none',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  backdrop: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  '&:hover': {
    backgroundColor: '#3498db',
    color: '#ffffff',
    transform: 'translateY(-3px) scale(1.1)',
    boxShadow: '0 8px 25px rgba(52, 152, 219, 0.4)',
  },
}));

const ContactInfo = styled(Box)(({ theme }) => ({
  '& .MuiTypography-root': {
    color: '#bdc3c7',
    fontSize: '0.9rem',
  }
}));

const Footer = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <FooterContainer>
      <Container maxWidth="lg">
        <Grid container spacing={{ xs: 3, md: 4 }}>
          {/* Company Info */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterSection>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box
                  component="img"
                  src={logo}
                  alt="Zil Travelers Logo"
                  sx={{ 
                    height: { xs: 32, md: 40 }, 
                    width: { xs: 32, md: 40 }, 
                    mr: 1.5, 
                    borderRadius: '50%' 
                  }}
                />
                <Typography 
                  variant="h6" 
                  sx={{ 
                    color: 'white', 
                    fontWeight: 700,
                    fontSize: { xs: '1.1rem', md: '1.25rem' }
                  }}
                >
                  ZilTravelers
                </Typography>
              </Box>
              <Typography 
                variant="body2" 
                sx={{ 
                  color: '#bdc3c7', 
                  lineHeight: 1.6,
                  fontSize: { xs: '0.875rem', md: '1rem' }
                }}
              >
                Your gateway to unforgettable Sri Lankan adventures. 
                Experience authentic culture, stunning landscapes, and warm hospitality.
              </Typography>
            </FooterSection>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <FooterSection>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'white', 
                  mb: 2, 
                  fontWeight: 600,
                  fontSize: { xs: '1rem', md: '1.1rem' }
                }}
              >
                Quick Links
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <FooterLink component={Link} to="/">Home</FooterLink>
                <FooterLink component={Link} to="/tours">Tours</FooterLink>
                <FooterLink component={Link} to="/about">About</FooterLink>
                <FooterLink component={Link} to="/destinations">Destinations</FooterLink>
              </Box>
            </FooterSection>
          </Grid>

          {/* Tours */}
          <Grid item xs={12} sm={6} md={3}>
            <FooterSection>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'white', 
                  mb: 2, 
                  fontWeight: 600,
                  fontSize: { xs: '1rem', md: '1.1rem' }
                }}
              >
                Popular Tours
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <FooterLink component={Link} to="/tours/gem-of-srilanka">Gem of Sri Lanka</FooterLink>
                <FooterLink component={Link} to="/tours/tales-of-the-peak">Tales of the Peak</FooterLink>
                <FooterLink component={Link} to="/tours/colombo-night-vibes">Colombo Night Vibes</FooterLink>
                <FooterLink component={Link} to="/tours/seven-day-classic">7-Day Classic</FooterLink>
              </Box>
            </FooterSection>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} sm={6} md={4}>
            <FooterSection>
              <Typography 
                variant="h6" 
                sx={{ 
                  color: 'white', 
                  mb: 2, 
                  fontWeight: 600,
                  fontSize: { xs: '1rem', md: '1.1rem' }
                }}
              >
                Contact Us
              </Typography>
              <ContactInfo>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <LocationOnIcon sx={{ mr: 1.5, fontSize: 20, color: '#3498db' }} />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontSize: { xs: '0.875rem', md: '1rem' } 
                    }}
                  >
                    Colombo, Sri Lanka
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                  <PhoneIcon sx={{ mr: 1.5, fontSize: 20, color: '#27ae60' }} />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontSize: { xs: '0.875rem', md: '1rem' } 
                    }}
                  >
                    +94 76 397 4648
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon sx={{ mr: 1.5, fontSize: 20, color: '#e74c3c' }} />
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      fontSize: { xs: '0.875rem', md: '1rem' } 
                    }}
                  >
                    info@zil-travelers.com
                  </Typography>
                </Box>
              </ContactInfo>

              {/* Social Media Icons */}
              <Box sx={{ mt: 2 }}>
                <Typography 
                  variant="subtitle2" 
                  sx={{ 
                    color: 'white', 
                    mb: 1, 
                    fontWeight: 500,
                    fontSize: { xs: '0.875rem', md: '1rem' }
                  }}
                >
                  Follow Us
                </Typography>
                <Box sx={{ display: 'flex', gap: 1.5 }}>
                  <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                    <FacebookIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                  </SocialIcon>
                  <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                    <TwitterIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                  </SocialIcon>
                  <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                    <InstagramIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                  </SocialIcon>
                  <SocialIcon href="#" target="_blank" rel="noopener noreferrer">
                    <LinkedInIcon sx={{ fontSize: { xs: 20, md: 24 } }} />
                  </SocialIcon>
                </Box>
              </Box>
            </FooterSection>
          </Grid>
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            mt: 4,
            pt: 3,
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', md: 'center' },
            gap: { xs: 2, md: 0 }
          }}
        >
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#95a5a6',
              textAlign: { xs: 'center', md: 'left' },
              fontSize: { xs: '0.8rem', md: '0.875rem' }
            }}
          >
            © 2024 ZilTravelers. All rights reserved. | Discover Sri Lanka with us.
          </Typography>
          
          <Box 
            sx={{ 
              display: 'flex', 
              gap: { xs: 2, md: 3 },
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center'
            }}
          >
            <FooterLink 
              href="#" 
              sx={{ 
                fontSize: { xs: '0.8rem', md: '0.875rem' } 
              }}
            >
              Privacy Policy
            </FooterLink>
            <FooterLink 
              href="#" 
              sx={{ 
                fontSize: { xs: '0.8rem', md: '0.875rem' } 
              }}
            >
              Terms of Service
            </FooterLink>
          </Box>
        </Box>
      </Container>
    </FooterContainer>
  );
};

export default Footer;
