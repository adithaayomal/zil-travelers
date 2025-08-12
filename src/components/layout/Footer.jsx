import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import {
  Box,
  Container,
  Grid,
  Typography,
  TextField,
  Button,
  IconButton
} from '@mui/material';
import {
  Facebook as FacebookIcon,
  Instagram as InstagramIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Phone as PhoneIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon
} from '@mui/icons-material';

const FooterWrapper = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  opacity: 0,
  transition: 'opacity 0.5s ease',
  padding: theme.spacing(6, 0),
  marginTop: 'auto',
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const FooterLink = styled(Link)(({ theme }) => ({
  color: 'inherit',
  textDecoration: 'none',
  display: 'block',
  marginBottom: theme.spacing(1),
  '&:hover': {
    color: theme.palette.secondary.light,
  },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: 'white',
  marginRight: theme.spacing(1),
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const NewsletterForm = styled('form')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const Footer = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY;

      if (scrollTop + windowHeight > documentHeight - 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <FooterWrapper sx={{ opacity: isVisible ? 1 : 0 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <FooterSection>
              <Typography variant="h6" gutterBottom>
                Popular Packages
              </Typography>
              <FooterLink to="/destinations/gem-of-srilanka">Gem of Sri Lanka Tour</FooterLink>
              <FooterLink to="/destinations/cultural-triangle">Cultural Triangle Tour</FooterLink>
              <FooterLink to="/destinations/hill-country">Hill Country Express</FooterLink>
              <FooterLink to="/destinations/beach-hopping">Beach Hopping Tour</FooterLink>
            </FooterSection>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FooterSection>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/destinations">Destinations</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </FooterSection>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FooterSection>
              <Typography variant="h6" gutterBottom>
                Contact Info
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <PhoneIcon sx={{ mr: 1 }} />
                <Typography>+94 77 123 4567</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <EmailIcon sx={{ mr: 1 }} />
                <Typography>info@zil-travelers.com</Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <LocationIcon sx={{ mr: 1 }} />
                <Typography>123 Temple Road, Colombo 03, Sri Lanka</Typography>
              </Box>
            </FooterSection>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <FooterSection>
              <Typography variant="h6" gutterBottom>
                Newsletter
              </Typography>
              <NewsletterForm onSubmit={handleNewsletterSubmit}>
                <TextField
                  variant="outlined"
                  placeholder="Your email address"
                  size="small"
                  fullWidth
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    input: { color: 'white' }
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  sx={{ whiteSpace: 'nowrap' }}
                >
                  Subscribe
                </Button>
              </NewsletterForm>
              <Box sx={{ mt: 2 }}>
                <SocialIcon component="a" href="#" target="_blank">
                  <FacebookIcon />
                </SocialIcon>
                <SocialIcon component="a" href="#" target="_blank">
                  <InstagramIcon />
                </SocialIcon>
                <SocialIcon component="a" href="#" target="_blank">
                  <TwitterIcon />
                </SocialIcon>
                <SocialIcon component="a" href="#" target="_blank">
                  <LinkedInIcon />
                </SocialIcon>
              </Box>
            </FooterSection>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          align="center"
          sx={{
            mt: 4,
            pt: 2,
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          © {new Date().getFullYear()} Zil Travelers. All rights reserved.
        </Typography>
      </Container>
    </FooterWrapper>
  );
};

export default Footer;
