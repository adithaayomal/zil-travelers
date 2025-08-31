import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Paper, 
  Grid, 
  Avatar,
  Card,
  CardContent,
  TextField,
  Button,
  Stack,
  Divider,
  Alert
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Send as SendIcon,
  AccessTime as AccessTimeIcon,
} from '@mui/icons-material';
import logo from '../assets/logozil.png';

const AboutWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%)',
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
}));

const TeamAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 16px rgba(52, 152, 219, 0.15)',
}));

const ContactCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, #ffffff 0%, rgba(52, 152, 219, 0.05) 100%)',
  border: '1px solid rgba(52, 152, 219, 0.1)',
  borderRadius: theme.spacing(2),
  boxShadow: '0 8px 32px rgba(52, 152, 219, 0.1)',
  height: 'fit-content',
}));

const ContactButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
  color: 'white',
  fontWeight: 600,
  borderRadius: theme.spacing(1.5),
  textTransform: 'none',
  padding: theme.spacing(1.5, 3),
  '&:hover': {
    background: 'linear-gradient(135deg, #2057a7 0%, #3498db 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 20px rgba(52, 152, 219, 0.3)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1.5),
    backgroundColor: 'rgba(52, 152, 219, 0.02)',
    '&:hover': {
      backgroundColor: 'rgba(52, 152, 219, 0.04)',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#3498db',
      },
    },
    '&.Mui-focused': {
      backgroundColor: 'rgba(52, 152, 219, 0.06)',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: '#2057a7',
        borderWidth: 2,
      },
    },
  },
  '& .MuiInputLabel-root': {
    fontWeight: 500,
    '&.Mui-focused': {
      color: '#2057a7',
    },
  },
}));

const About = () => {
  const [contactForm, setContactForm] = useState({
    subject: '',
    email: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleContactChange = (e) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form submitted:', contactForm);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setContactForm({ subject: '', email: '', message: '' });
    }, 3000);
  };

  return (
    <AboutWrapper>
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* Left Column - About Content */}
          <Grid item xs={12} lg={8}>
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 3 }}>
          <Avatar src={logo} alt="Zil Travelers Logo" sx={{ width: 64, height: 64}} />
          <Typography variant="h3" fontWeight={700} color="primary.main">
            Zil Travelers
          </Typography>
        </Box>
        
        <Typography variant="body1" sx={{ mb: 2 }}>
          Zil Travelers is a passionate and dedicated travel company based in Sri Lanka, created with the vision of showcasing the natural beauty, cultural heritage, and hospitality of the island at an affordable price. We specialize in offering customized travel packages, guided tours, and authentic local experiences with a strong focus on safety, quality service, and customer satisfaction.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          As a new business, we are building our brand by combining fresh energy with a deep love for our country. We aim to support Sri Lanka’s growing tourism industry while empowering local communities and preserving the natural environment.
        </Typography>
        <Typography variant="h5" fontWeight={600} color="primary" sx={{ mb: 2 }}>
          Our Experience
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Although Zil Travelers is new, our team consists of young, energetic, and well-trained tourism enthusiasts who possess strong local knowledge, multilingual communication skills, and a passion for providing excellent service. We have researched key tourist locations, safety practices, and budget-friendly accommodations to ensure our guests enjoy the best of Sri Lanka.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          We continuously update our knowledge of travel trends, customer preferences, and eco-friendly practices to deliver tours that exceed expectations.
        </Typography>
        <Typography variant="h5" fontWeight={600} color="primary" sx={{ mb: 2 }}>
          Vision
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          To be a trusted travel company offering safe and affordable experiences that showcase the true beauty of Sri Lanka.
        </Typography>
        <Typography variant="h5" fontWeight={600} color="primary" sx={{ mb: 2 }}>
          Mission
        </Typography>
        <ul style={{ margin: 0, paddingLeft: '1.5em', marginBottom: '1.5em' }}>
          <li>Provide budget-friendly and secure travel services.</li>
          <li>Deliver personalized and quality experiences.</li>
          <li>Promote sustainable and responsible tourism.</li>
          <li>Support local communities and culture.</li>
        </ul>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Zil Travelers is a new travel company in Sri Lanka offering safe and affordable tours. We aim to give tourists the best local experiences while promoting Sri Lanka’s beauty, culture, and hospitality.
        </Typography>
        <Typography variant="body1" sx={{ mb: 2 }}>
          Though newly launched, our team is passionate, knowledgeable, and trained to deliver quality service with local expertise and a strong focus on safety and customer satisfaction.
        </Typography>
      </Box>
    </Grid>

    {/* Right Column - Contact Details */}
    <Grid item xs={12} lg={4}>
      <Stack spacing={3}>
        {/* Contact Information Card */}
        <ContactCard>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#2057a7', mb: 3 }}>
              Get in Touch
            </Typography>
            
            <Stack spacing={2.5}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  backgroundColor: 'rgba(52, 152, 219, 0.1)',
                  borderRadius: '50%',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <PhoneIcon sx={{ color: '#3498db', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2057a7' }}>
                    Phone
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    +94 123 456 789
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  backgroundColor: 'rgba(52, 152, 219, 0.1)',
                  borderRadius: '50%',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <EmailIcon sx={{ color: '#3498db', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2057a7' }}>
                    Email
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    info@ziltravelers.com
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  backgroundColor: 'rgba(52, 152, 219, 0.1)',
                  borderRadius: '50%',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <LocationIcon sx={{ color: '#3498db', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2057a7' }}>
                    Location
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Colombo, Sri Lanka
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ 
                  backgroundColor: 'rgba(52, 152, 219, 0.1)',
                  borderRadius: '50%',
                  p: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <AccessTimeIcon sx={{ color: '#3498db', fontSize: 20 }} />
                </Box>
                <Box>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2057a7' }}>
                    Business Hours
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    9 AM - 6 PM (Sri Lanka Time)
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </CardContent>
        </ContactCard>

        {/* Send Message Card */}
        <ContactCard>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'rgba(32, 87, 167, 0.8)', mb: 3 }}>
              Send Us a Message
            </Typography>
            
            {submitted ? (
              <Alert severity="success" sx={{ borderRadius: 2 }}>
                Thank you! Your message has been sent successfully.
              </Alert>
            ) : (
              <form onSubmit={handleContactSubmit}>
                <Stack spacing={2.5}>
                  <StyledTextField
                    label="Your Email"
                    name="email"
                    type="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    fullWidth
                    required
                  />
                  
                  <StyledTextField
                    label="Subject"
                    name="subject"
                    value={contactForm.subject}
                    onChange={handleContactChange}
                    fullWidth
                    required
                    placeholder="What would you like to discuss?"
                  />
                  
                  <StyledTextField
                    label="Message"
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    multiline
                    rows={4}
                    fullWidth
                    required
                    placeholder="Tell us about your travel plans or any questions you have..."
                  />
                  
                  <ContactButton
                    type="submit"
                    fullWidth
                    endIcon={<SendIcon />}
                  >
                    Send Message
                  </ContactButton>
                </Stack>
              </form>
            )}
          </CardContent>
        </ContactCard>
      </Stack>
    </Grid>
  </Grid>
    </Container>
  </AboutWrapper>
  );
};

export default About;
