import React from 'react';
import { Box, Container, Typography, Paper, Grid, Avatar } from '@mui/material';
import { styled } from '@mui/material/styles';
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

const About = () => (
  <AboutWrapper>
    <Container maxWidth="md">
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

      
    </Container>
  </AboutWrapper>
);

export default About;
