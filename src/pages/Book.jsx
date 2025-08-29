import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { collection, addDoc, Timestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { Box, Container, Typography, TextField, Button, Paper, MenuItem, Alert } from '@mui/material';

const BookPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(auth.currentUser);
  const [packages, setPackages] = useState([]);

  // Fetch packages from Firestore
  useEffect(() => {
    const q = query(collection(db, 'packages'), orderBy('name'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const packagesData = snapshot.docs.map(doc => ({ 
        id: doc.id, 
        value: doc.data().name.toLowerCase().replace(/\s+/g, '-'),
        label: doc.data().name,
        ...doc.data() 
      }));
      setPackages(packagesData);
    });
    return () => unsubscribe();
  }, []);

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
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (!form.name || !form.email || !form.package || !form.date || !form.persons) {
      setError('Please fill all required fields.');
      setLoading(false);
      return;
    }
    
    try {
      // Save booking to Firebase
      await addDoc(collection(db, 'bookings'), {
        ...form,
        userId: user.uid,
        userEmail: user.email,
        status: 'pending',
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      
      setSubmitted(true);
      setForm({
        name: '',
        email: '',
        phone: '',
        package: '',
        date: '',
        persons: '',
        message: ''
      });
    } catch (err) {
      console.error('Error saving booking:', err);
      setError('Failed to submit booking. Please try again.');
    } finally {
      setLoading(false);
    }
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
              {packages.length === 0 ? (
                <MenuItem disabled>Loading packages...</MenuItem>
              ) : (
                packages.map(pkg => (
                  <MenuItem key={pkg.id} value={pkg.label}>
                    {pkg.label} {pkg.price && `- $${pkg.price}`}
                  </MenuItem>
                ))
              )}
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
            <Button 
              type="submit" 
              variant="contained" 
              color="success" 
              fullWidth 
              disabled={loading}
              sx={{ py: 1.5, fontWeight: 700, borderRadius: 3 }}
            >
              {loading ? 'Submitting...' : 'Submit Inquiry'}
            </Button>
          </form>
        )}
      </Paper>
    </Container>
  );
};

export default BookPage;
