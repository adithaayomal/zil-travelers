import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase';
import { Box, Container, Typography, TextField, Button, Paper, MenuItem, Alert } from '@mui/material';

const packages = [
  { label: 'Colombo City Tour', value: 'colombo-city-tour' },
  { label: 'Gem of Sri Lanka', value: 'gem-of-srilanka' },
  { label: 'Tales of the Peak', value: 'tales-of-the-peak' },
  { label: 'Sri Lanka Grand Tour Experience', value: 'sri-lanka-grand-tour' },
];

const BookPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((u) => {
      setUser(u);
      if (!u) navigate('/login', { replace: true });
    });
    if (!auth.currentUser) navigate('/login', { replace: true });
    return () => unsubscribe();
  }, [navigate]);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    package: '',
    date: '',
    persons: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setError('');
    if (!form.name || !form.email || !form.package || !form.date || !form.persons) {
      setError('Please fill all required fields.');
      return;
    }
    // Here you would send the inquiry to your backend or Firestore
    setSubmitted(true);
  };

  if (!user) return null;

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" fontWeight={700} gutterBottom align="center" color="primary">
          Book a Package Inquiry
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center" sx={{ mb: 3 }}>
          Fill out the form below to inquire about booking a travel package. Our team will contact you soon.
        </Typography>
        {submitted ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            Thank you for your inquiry! We will get back to you soon.
          </Alert>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              label="Full Name"
              name="name"
              value={form.name}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Email"
              name="email"
              value={form.email}
              onChange={handleChange}
              type="email"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Phone Number"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="tel"
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              select
              label="Select Package"
              name="package"
              value={form.package}
              onChange={handleChange}
              fullWidth
              required
              sx={{ mb: 2 }}
            >
              {packages.map(pkg => (
                <MenuItem key={pkg.value} value={pkg.value}>{pkg.label}</MenuItem>
              ))}
            </TextField>
            <TextField
              label="Preferred Date"
              name="date"
              value={form.date}
              onChange={handleChange}
              type="date"
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Number of Persons"
              name="persons"
              value={form.persons}
              onChange={handleChange}
              type="number"
              fullWidth
              required
              sx={{ mb: 2 }}
            />
            <TextField
              label="Additional Message"
              name="message"
              value={form.message}
              onChange={handleChange}
              multiline
              rows={3}
              fullWidth
              sx={{ mb: 2 }}
            />
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <Button type="submit" variant="contained" color="success" fullWidth sx={{ py: 1.5, fontWeight: 700, borderRadius: 3 }}>
              Submit Inquiry
            </Button>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default BookPage;
