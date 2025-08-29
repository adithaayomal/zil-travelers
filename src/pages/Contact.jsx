import React, { useState } from 'react';
import { Box, Container, Typography, Grid, TextField, Button, Paper, Avatar, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const ContactWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #e3f2fd 0%, #f8f9fa 100%)',
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
}));

const ContactInfoBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  background: 'rgba(255,255,255,0.95)',
  marginBottom: theme.spacing(4),
}));

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form data to your backend or email service
  };

  return (
    <ContactWrapper>
      <Container maxWidth="md">
        <Typography variant="h3" fontWeight={700} color="primary.main" sx={{ mb: 4, textAlign: 'center' }}>
          Contact Us
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <ContactInfoBox elevation={3}>
              <Stack spacing={3}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}><EmailIcon /></Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>Email</Typography>
                    <Typography variant="body2" color="text.secondary">info@ziltravelers.com</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}><PhoneIcon /></Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>Phone</Typography>
                    <Typography variant="body2" color="text.secondary">+94 77 123 4567</Typography>
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Avatar sx={{ bgcolor: 'primary.main' }}><LocationOnIcon /></Avatar>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={600}>Address</Typography>
                    <Typography variant="body2" color="text.secondary">Colombo, Sri Lanka</Typography>
                  </Box>
                </Box>
              </Stack>
            </ContactInfoBox>
          </Grid>
          <Grid item xs={12} md={7}>
            <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, background: 'rgba(255,255,255,0.97)' }}>
              <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                Send Us a Message
              </Typography>
              {submitted ? (
                <Typography color="success.main" sx={{ fontWeight: 600, fontSize: '1.1rem' }}>
                  Thank you for reaching out! We will get back to you soon.
                </Typography>
              ) : (
                <form onSubmit={handleSubmit}>
                  <TextField
                    label="Your Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Your Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    type="email"
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                  />
                  <TextField
                    label="Message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    multiline
                    rows={4}
                    fullWidth
                    required
                    sx={{ mb: 2 }}
                  />
                  <Button type="submit" variant="contained" color="primary" fullWidth sx={{ py: 1.5, fontWeight: 700, borderRadius: 3 }}>
                    Send Message
                  </Button>
                </form>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </ContactWrapper>
  );
};

export default Contact;
