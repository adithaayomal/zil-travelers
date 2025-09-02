import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { collection, addDoc, Timestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { 
  Box, 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Paper, 
  MenuItem, 
  Alert,
  Grid,
  Card,
  CardContent,
  Chip,
  Stack,
  Divider,
  InputAdornment,
  Avatar,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  TourOutlined as TourIcon,
  CalendarToday as CalendarIcon,
  Group as GroupIcon,
  Message as MessageIcon,
  CheckCircle as CheckCircleIcon,
  Lock as LockIcon,
  SupportAgent as SupportAgentIcon,
  EventAvailable as EventAvailableIcon,
} from '@mui/icons-material';

// Styled Components
const PageWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
}));

const BookingPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: theme.spacing(3),
  background: 'linear-gradient(135deg, #ffffff 0%, rgba(52, 152, 219, 0.02) 100%)',
  border: '1px solid rgba(52, 152, 219, 0.1)',
  boxShadow: '0 20px 60px rgba(52, 152, 219, 0.08)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(3),
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: theme.spacing(1.5),
    backgroundColor: 'rgba(52, 152, 219, 0.02)',
    transition: 'all 0.3s ease',
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

const BookingButton = styled(Button)(({ theme }) => ({
  padding: theme.spacing(2, 4),
  borderRadius: theme.spacing(2),
  background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
  color: 'white',
  fontWeight: 700,
  fontSize: '1.1rem',
  textTransform: 'none',
  boxShadow: '0 6px 20px rgba(52, 152, 219, 0.3)',
  transition: 'all 0.3s ease',
  '&:hover': {
    background: 'linear-gradient(135deg, #2057a7 0%, #3498db 100%)',
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 25px rgba(52, 152, 219, 0.4)',
  },
  '&:disabled': {
    background: '#cccccc',
    color: '#666666',
    transform: 'none',
    boxShadow: 'none',
  },
}));

const InfoCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.05) 0%, rgba(32, 87, 167, 0.08) 100%)',
  border: '1px solid rgba(52, 152, 219, 0.1)',
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(3),
}));

const FeatureBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(2),
  backgroundColor: 'rgba(52, 152, 219, 0.05)',
  borderRadius: theme.spacing(1.5),
  border: '1px solid rgba(52, 152, 219, 0.1)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: 'rgba(52, 152, 219, 0.08)',
    transform: 'translateY(-2px)',
  },
}));

const BookPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(auth.currentUser);
  const [packages, setPackages] = useState([]);

  // Get pre-filled data from navigation state
  const bookingData = location.state || {};

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

  // Update form when booking data changes
  useEffect(() => {
    if (bookingData.packageName || bookingData.selectedDate) {
      setForm(prev => ({
        ...prev,
        package: bookingData.packageName || prev.package,
        date: bookingData.selectedDate || prev.date,
        email: user?.email || prev.email
      }));
    }
  }, [bookingData.packageName, bookingData.selectedDate, user?.email]);

  const [form, setForm] = useState({
    name: '',
    email: user?.email || '',
    phone: '',
    package: bookingData.packageName || '',
    date: bookingData.selectedDate || '',
    persons: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

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
    
    if (!agreedToTerms) {
      setError('Please agree to the Terms and Conditions and Cancellation Policy to proceed.');
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
      setAgreedToTerms(false);
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
    <PageWrapper>
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* Left Column - Booking Form */}
          <Grid item xs={12} lg={7}>
            <BookingPaper elevation={0}>
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                
                <Typography variant="h4" sx={{ 
                  fontWeight: 700, 
                  mb: 2,
                }}>
                  Book Your Adventure
                </Typography>
                
                <Box
                  sx={{
                    width: '80px',
                    height: '4px',
                    background: 'linear-gradient(135deg, #3498db 0%, #2ecc71 100%)',
                    borderRadius: '2px',
                    margin: '0 auto',
                    mb: 2,
                  }}
                />
                
                <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400 }}>
                  Fill out the form below and our travel experts will contact you within 24 hours.
                </Typography>
              </Box>

              {(bookingData.packageName || bookingData.selectedDate) && (
                <InfoCard>
                  <CardContent>
                    <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
                      Selected Package Details
                    </Typography>
                    
                    <Box
                      sx={{
                        width: '80px',
                        height: '4px',
                        background: 'linear-gradient(135deg, #3498db 0%, #2ecc71 100%)',
                        borderRadius: '2px',
                        mb: 2,
                      }}
                    />
                    <Stack spacing={1}>
                      {bookingData.packageName && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <TourIcon sx={{ color: '#3498db', fontSize: 20 }} />
                          <Typography variant="body1" sx={{ fontWeight: 500 }}>
                            {bookingData.packageName}
                          </Typography>
                        </Box>
                      )}
                      {bookingData.selectedDate && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <CalendarIcon sx={{ color: '#3498db', fontSize: 20 }} />
                          <Typography variant="body1">
                            {new Date(bookingData.selectedDate).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </Typography>
                        </Box>
                      )}
                      {bookingData.price && (
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Typography variant="body1" sx={{ 
                            fontWeight: 600,
                            color: '#27ae60',
                            fontSize: '1.1rem'
                          }}>
                            Starting from ${bookingData.price} per person
                          </Typography>
                        </Box>
                      )}
                    </Stack>
                  </CardContent>
                </InfoCard>
              )}
              
              {submitted ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <CheckCircleIcon sx={{ fontSize: 80, color: '#27ae60', mb: 2 }} />
                  <Typography variant="h4" sx={{ fontWeight: 600, color: '#27ae60', mb: 2 }}>
                    Inquiry Submitted Successfully!
                  </Typography>
                  
                  <Box
                    sx={{
                      width: '80px',
                      height: '4px',
                      background: 'linear-gradient(135deg, #3498db 0%, #2ecc71 100%)',
                      borderRadius: '2px',
                      margin: '0 auto',
                      mb: 2,
                    }}
                  />
                  <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
                    Thank you for your interest! Our travel experts will review your request and contact you within 24 hours with detailed information and availability.
                  </Typography>
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/tours')}
                    sx={{ borderRadius: 2, fontWeight: 600 }}
                  >
                    Browse More Tours
                  </Button>
                </Box>
              ) : (
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        label="Full Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        fullWidth
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PersonIcon sx={{ color: '#3498db' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        label="Email Address"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        type="email"
                        fullWidth
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <EmailIcon sx={{ color: '#3498db' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        label="Phone Number"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        type="tel"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <PhoneIcon sx={{ color: '#3498db' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <StyledTextField
                        label="Number of Travelers"
                        name="persons"
                        value={form.persons}
                        onChange={handleChange}
                        type="number"
                        fullWidth
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <GroupIcon sx={{ color: '#3498db' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        select
                        label="Select Travel Package"
                        name="package"
                        value={form.package}
                        onChange={handleChange}
                        fullWidth
                        required
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <TourIcon sx={{ color: '#3498db' }} />
                            </InputAdornment>
                          ),
                        }}
                      >
                        {packages.length === 0 ? (
                          <MenuItem disabled>Loading packages...</MenuItem>
                        ) : (
                          packages.map(pkg => (
                            <MenuItem key={pkg.id} value={pkg.label}>
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <Typography>{pkg.label}</Typography>
                                {pkg.price && (
                                  <Typography sx={{ color: '#27ae60', fontWeight: 600 }}>
                                    ${pkg.price}
                                  </Typography>
                                )}
                              </Box>
                            </MenuItem>
                          ))
                        )}
                      </StyledTextField>
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        label="Preferred Travel Date"
                        name="date"
                        value={form.date}
                        onChange={handleChange}
                        type="date"
                        fullWidth
                        required
                        InputLabelProps={{ shrink: true }}
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarIcon sx={{ color: '#3498db' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <StyledTextField
                        label="Additional Message or Special Requests"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        multiline
                        rows={4}
                        fullWidth
                        placeholder="Tell us about any special requirements, dietary restrictions, or preferences..."
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1 }}>
                              <MessageIcon sx={{ color: '#3498db' }} />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                  
                  {/* Terms and Conditions Checkbox */}
                  <Box sx={{ mt: 3, mb: 2 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={agreedToTerms}
                          onChange={(e) => setAgreedToTerms(e.target.checked)}
                          sx={{
                            color: '#3498db',
                            '&.Mui-checked': {
                              color: '#2057a7',
                            },
                          }}
                        />
                      }
                      label={
                        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                          I agree to the{' '}
                          <Typography
                            component="span"
                            sx={{
                              color: '#3498db',
                              textDecoration: 'underline',
                              cursor: 'pointer',
                              '&:hover': {
                                color: '#2057a7',
                              },
                            }}
                            onClick={() => {
                              // You can add navigation to terms page or open modal
                              window.open('/terms-and-conditions', '_blank');
                            }}
                          >
                            Terms and Conditions
                          </Typography>
                          {' '}and{' '}
                          <Typography
                            component="span"
                            sx={{
                              color: '#3498db',
                              textDecoration: 'underline',
                              cursor: 'pointer',
                              '&:hover': {
                                color: '#2057a7',
                              },
                            }}
                            onClick={() => {
                              // You can add navigation to cancellation policy page or open modal
                              window.open('/cancellation-policy', '_blank');
                            }}
                          >
                            Cancellation Policy
                          </Typography>
                        </Typography>
                      }
                    />
                  </Box>
                  
                  {error && (
                    <Alert severity="error" sx={{ mt: 3, borderRadius: 2 }}>
                      {error}
                    </Alert>
                  )}
                  
                  <Box sx={{ mt: 4, textAlign: 'center' }}>
                    <BookingButton
                      type="submit" 
                      size="large"
                      disabled={loading || !agreedToTerms}
                      sx={{ 
                        minWidth: 200, 
                        borderRadius: 20, 
                        maxHeight: 45,
                        ...((!agreedToTerms && !loading) && {
                          background: '#cccccc',
                          color: '#666666',
                          '&:hover': {
                            background: '#cccccc',
                            transform: 'none',
                            boxShadow: 'none',
                          },
                        }),
                      }}
                    >
                      {loading ? 'Submitting Inquiry...' : 'Submit Booking Inquiry'}
                    </BookingButton>
                  </Box>
                </form>
              )}
            </BookingPaper>
          </Grid>

          {/* Right Column - Features & Trust Indicators */}
          <Grid item xs={12} lg={5}>
            <Stack spacing={3}>
              {/* Contact Information Card */}
              <Card sx={{ 
                background: 'linear-gradient(135deg, rgba(32, 87, 167, 0.05) 0%, rgba(52, 152, 219, 0.08) 100%)',
                border: '1px solid rgba(52, 152, 219, 0.1)',
                borderRadius: 3
              }}>
                <CardContent>
                  <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
                    Need Help?
                  </Typography>
                  
                  <Box
                    sx={{
                      width: '80px',
                      height: '4px',
                      background: 'linear-gradient(135deg, #3498db 0%, #2ecc71 100%)',
                      borderRadius: '2px',
                      mb: 2,
                    }}
                  />
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
                    Our travel experts are ready to assist you in planning your perfect Sri Lankan adventure.
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <SupportAgentIcon sx={{ color: '#3498db', mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Call us: +94 123 456 789
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon sx={{ color: '#3498db', mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Email: info@ziltravelers.com
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <EventAvailableIcon sx={{ color: '#3498db', mr: 1 }} />
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Available: 9 AM - 6 PM (Sri Lanka Time)
                    </Typography>
                  </Box>
                </CardContent>
              </Card>

              {/* Process Steps Card */}
              <Card sx={{ 
                background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.02) 0%, rgba(32, 87, 167, 0.05) 100%)',
                border: '1px solid rgba(52, 152, 219, 0.1)',
                borderRadius: 3
              }}>
                <CardContent>
                  <Typography variant="h4" sx={{ fontWeight: 600, mb: 2 }}>
                    What Happens Next?
                  </Typography>
                  
                  <Box
                    sx={{
                      width: '80px',
                      height: '4px',
                      background: 'linear-gradient(135deg, #3498db 0%, #2ecc71 100%)',
                      borderRadius: '2px',
                      mb: 3,
                    }}
                  />
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Chip 
                        label="1" 
                        size="small" 
                        sx={{ 
                          backgroundColor: '#3498db', 
                          color: 'white', 
                          fontWeight: 700,
                          minWidth: 24,
                          height: 24
                        }} 
                      />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Inquiry Review
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          We will review your requirements and check availability.
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Chip 
                        label="2" 
                        size="small" 
                        sx={{ 
                          backgroundColor: '#3498db', 
                          color: 'white', 
                          fontWeight: 700,
                          minWidth: 24,
                          height: 24
                        }} 
                      />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Personalized Quote
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          You will receive a detailed itinerary and pricing.
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Chip 
                        label="3" 
                        size="small" 
                        sx={{ 
                          backgroundColor: '#3498db', 
                          color: 'white', 
                          fontWeight: 700,
                          minWidth: 24,
                          height: 24
                        }} 
                      />
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                          Book & Explore
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          Our team will contact you to finalize your booking.
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  );
};

export default BookPage;
