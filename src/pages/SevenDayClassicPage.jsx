import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  TextField,
  Stack,
  Tooltip,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  AccessTime as AccessTimeIcon,
  Group as GroupIcon,
  Check as CheckIcon,
  Check,
  Lock as LockIcon,
  SupportAgent as SupportAgentIcon,
  EventAvailable as EventAvailableIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { LocationOn as LocationIcon } from '@mui/icons-material';

// Import images
import sigiriyaImage from '../assets/images/sigiriya.jpg';
import ellaImage from '../assets/images/ella.jpg';
import kandyImage from '../assets/images/kandy.jpg';

const PageWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  textAlign: 'left',
  marginBottom: theme.spacing(6),
  padding: theme.spacing(6),
  background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.02) 0%, rgba(32, 87, 167, 0.05) 100%)',
  border: '1px solid rgba(52, 152, 219, 0.1)',
  borderRadius: theme.spacing(3),
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
  },
}));

const TourTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  marginBottom: theme.spacing(3),
  background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  [theme.breakpoints.down('sm')]: {
    fontSize: '2rem',
  },
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  backgroundColor: '#ffffff',
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: '0 4px 20px rgba(52, 152, 219, 0.05)',
  '&:hover': {
    boxShadow: '0 6px 24px rgba(52, 152, 219, 0.1)',
  },
}));

const HighlightSection = styled(StyledPaper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.05) 0%, rgba(32, 87, 167, 0.05) 100%)',
  border: '1px solid rgba(52, 152, 219, 0.1)',
  borderRadius: theme.shape.borderRadius * 2,
}));

const BookingCard = styled(StyledPaper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(0),
  background: 'linear-gradient(135deg, #ffffff 0%, rgba(52, 152, 219, 0.05) 100%)',
  border: '1px solid rgba(52, 152, 219, 0.1)',
  height: 'fit-content',
  '& .MuiButton-root': {
    background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
    color: 'white',
    fontWeight: 600,
    '&:hover': {
      background: 'linear-gradient(135deg, #2057a7 0%, #3498db 100%)',
      transform: 'translateY(-2px)',
      boxShadow: '0 6px 20px rgba(52, 152, 219, 0.2)',
    },
  },
}));

const HighlightChip = styled(Chip)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(52, 152, 219, 0.08)',
  border: '1px solid rgba(52, 152, 219, 0.2)',
  '& .MuiSvgIcon-root': {
    color: '#3498db',
  },
  '&:hover': {
    backgroundColor: 'rgba(52, 152, 219, 0.12)',
  },
}));

const PriceTag = styled(Typography)(({ theme }) => ({
  fontSize: '2.5rem',
  fontWeight: 700,
  background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginBottom: theme.spacing(1),
  display: 'flex',
  alignItems: 'center',
  '&::before': {
    content: '"$"',
    fontSize: '1.5rem',
    marginRight: theme.spacing(0.5),
    opacity: 0.8,
  },
}));

const FeatureCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  background: '#ffffff',
  border: '1px solid rgba(52, 152, 219, 0.1)',
  borderRadius: theme.shape.borderRadius,
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(52, 152, 219, 0.15)',
  },
}));

const GalleryImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: 200,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(2),
  boxShadow: '0 4px 12px rgba(52, 152, 219, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: '0 6px 16px rgba(52, 152, 219, 0.2)',
  },
  [theme.breakpoints.up('md')]: {
    height: 250,
  },
}));

const tourData = {
  name: '7-Day Classic Sri Lanka Tour',
  description: 'Experience the best of Sri Lanka in this comprehensive 7-day journey through ancient cities, lush landscapes, and cultural treasures. From the historic rock fortress of Sigiriya to the misty hills of Ella, this tour covers all the must-see destinations.',
  price: 899,
  duration: '7 Days / 6 Nights',
  startLocation: 'Colombo International Airport',
  groupSize: '2-15 People',
  highlights: [
    'Sigiriya Rock Fortress',
    'Ancient City of Polonnaruwa',
    'Temple of the Tooth - Kandy',
    'Hill Country & Tea Plantations',
    'Ella Rock & Nine Arch Bridge',
    'Yala National Park Safari',
    'Galle Dutch Fort'
  ],
  inclusions: [
    'Airport transfers',
    'Accommodation in 3-star hotels',
    'Daily breakfast',
    'Transportation in AC vehicle',
    'English-speaking guide',
    'Entrance fees to attractions',
    'Safari jeep in Yala National Park'
  ],
  itinerary: [
    {
      day: 1,
      title: 'Arrival & Colombo City Tour',
      description: 'Airport pickup and explore Colombo\'s colonial architecture, markets, and temples.',
      location: 'Colombo'
    },
    {
      day: 2,
      title: 'Cultural Triangle - Sigiriya',
      description: 'Visit Pinnawala Elephant Orphanage and climb the magnificent Sigiriya Rock Fortress.',
      location: 'Sigiriya'
    },
    {
      day: 3,
      title: 'Ancient Polonnaruwa & Dambulla',
      description: 'Explore ancient ruins of Polonnaruwa and the Golden Cave Temple of Dambulla.',
      location: 'Dambulla'
    },
    {
      day: 4,
      title: 'Kandy - Cultural Capital',
      description: 'Visit Temple of the Tooth Relic, Royal Botanical Gardens, and enjoy cultural dance show.',
      location: 'Kandy'
    },
    {
      day: 5,
      title: 'Hill Country Journey to Ella',
      description: 'Scenic train ride through tea plantations to the charming hill town of Ella.',
      location: 'Ella'
    },
    {
      day: 6,
      title: 'Wildlife Safari at Yala',
      description: 'Early morning safari in Yala National Park - home to leopards, elephants, and diverse wildlife.',
      location: 'Yala'
    },
    {
      day: 7,
      title: 'Galle Fort & Departure',
      description: 'Explore the UNESCO World Heritage Galle Dutch Fort before airport transfer.',
      location: 'Galle - Airport'
    }
  ]
};

const SevenDayClassicPage = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [availabilityChecked, setAvailabilityChecked] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);
  const navigate = useNavigate();

  const handleCheckAvailability = () => {
    if (checkInDate && checkOutDate) {
      setAvailabilityChecked(true);
      setIsAvailable(true);
    }
  };

  const handleBookNow = () => {
    navigate('/book', {
      state: {
        packageName: tourData.name,
        packagePrice: tourData.price,
        selectedDate: checkInDate,
        duration: tourData.duration
      }
    });
  };

  return (
    <PageWrapper>
      <Container maxWidth="xl">
        <Grid container spacing={6}>
          {/* Left Column */}
          <Grid item xs={12} lg={8}>
            <HeaderSection>
              <TourTitle variant="h1">
                {tourData.name}
              </TourTitle>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
                <HighlightChip
                  icon={<LocationIcon />}
                  label={tourData.startLocation}
                />
                <HighlightChip
                  icon={<AccessTimeIcon />}
                  label={tourData.duration}
                />
                <HighlightChip
                  icon={<GroupIcon />}
                  label={tourData.groupSize}
                />
              </Box>

              <Typography 
                variant="body1" 
                paragraph 
                sx={{ 
                  fontSize: '1.1rem',
                  lineHeight: 1.8,
                  color: 'text.secondary',
                  mb: 4
                }}
              >
                {tourData.description}
              </Typography>
            </HeaderSection>

            {/* Gallery */}
            <StyledPaper sx={{ mb: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Tour Gallery
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <GalleryImage src={sigiriyaImage} alt="Sigiriya Rock Fortress" />
                </Grid>
                <Grid item xs={12} md={6}>
                  <GalleryImage src={kandyImage} alt="Kandy Temple" />
                </Grid>
                <Grid item xs={12}>
                  <GalleryImage src={ellaImage} alt="Ella Hill Country" />
                </Grid>
              </Grid>
            </StyledPaper>

            {/* Highlights */}
            <HighlightSection>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Tour Highlights
              </Typography>
              <Grid container spacing={2}>
                {tourData.highlights.map((highlight, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <StarIcon sx={{ color: '#3498db' }} />
                      <Typography>{highlight}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </HighlightSection>

            {/* Itinerary */}
            <StyledPaper>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Day-by-Day Itinerary
              </Typography>
              <Grid container spacing={3}>
                {tourData.itinerary.map((day, index) => (
                  <Grid item xs={12} key={index}>
                    <FeatureCard>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Box sx={{
                          minWidth: 40,
                          height: 40,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontWeight: 700
                        }}>
                          {day.day}
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#2057a7', mb: 1 }}>
                            {day.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                            {day.description}
                          </Typography>
                          <Chip 
                            label={day.location} 
                            size="small" 
                            sx={{ 
                              backgroundColor: 'rgba(52, 152, 219, 0.08)',
                              color: '#2057a7'
                            }}
                          />
                        </Box>
                      </Box>
                    </FeatureCard>
                  </Grid>
                ))}
              </Grid>
            </StyledPaper>

            {/* Inclusions */}
            <StyledPaper>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                What's Included
              </Typography>
              <Grid container spacing={1}>
                {tourData.inclusions.map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Check sx={{ color: '#3498db', fontSize: '1.2rem' }} />
                      <Typography variant="body2">{item}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </StyledPaper>
          </Grid>

          {/* Right Column - Booking Card */}
          <Grid item xs={12} lg={4} sx={{ mt: { xs: 4, lg: 12 } }}>
            <BookingCard elevation={3}>
              <Typography variant="h5" gutterBottom sx={{ 
                fontWeight: 700,
                color: '#3498db'
              }}>
                Book This Tour From
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <PriceTag>{tourData.price}</PriceTag>
                <Typography variant="subtitle2" sx={{ color: '#3498db' }}>
                  per person, including all taxes
                </Typography>
              </Box>

              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                    Select Travel Dates
                  </Typography>
                  <Stack spacing={2}>
                    <TextField
                      label="Check-in Date"
                      type="date"
                      value={checkInDate}
                      onChange={(e) => setCheckInDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#3498db',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#2057a7',
                          },
                        },
                      }}
                    />
                    <TextField
                      label="Check-out Date"
                      type="date"
                      value={checkOutDate}
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      fullWidth
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          '&:hover fieldset': {
                            borderColor: '#3498db',
                          },
                          '&.Mui-focused fieldset': {
                            borderColor: '#2057a7',
                          },
                        },
                      }}
                    />
                  </Stack>
                </Box>

                {!availabilityChecked && (
                  <Button
                    variant="contained"
                    size="large"
                    fullWidth
                    onClick={handleCheckAvailability}
                    disabled={!checkInDate || !checkOutDate}
                    sx={{
                      py: 1.5,
                      textTransform: 'none',
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #2057a7 0%, #3498db 100%)',
                      }
                    }}
                  >
                    Check Availability
                  </Button>
                )}

                {availabilityChecked && isAvailable && (
                  <>
                    <Alert 
                      severity="success" 
                      sx={{ 
                        borderRadius: 2,
                        '& .MuiAlert-message': {
                          color: '#2e7d32',
                          fontWeight: 500
                        }
                      }}
                    >
                      Tour is available for selected dates!
                    </Alert>
                    <Button
                      variant="contained"
                      size="large"
                      fullWidth
                      onClick={handleBookNow}
                      sx={{
                        py: 1.5,
                        textTransform: 'none',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        background: 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 100%)',
                        }
                      }}
                    >
                      Book Now
                    </Button>
                  </>
                )}
              </Stack>

              <Box sx={{ mt: 4 }}>
                <Stack direction="row" spacing={3} justifyContent="center">
                  <Box sx={{ textAlign: 'center' }}>
                    <Tooltip title="Secure payment">
                      <LockIcon sx={{ fontSize: 28, mb: 1, color: '#3498db' }} />
                    </Tooltip>
                    <Typography variant="caption" display="block" sx={{ color: '#3498db' }}>
                      Secure Payment
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Tooltip title="24/7 support">
                      <SupportAgentIcon sx={{ fontSize: 28, mb: 1, color: '#3498db' }} />
                    </Tooltip>
                    <Typography variant="caption" display="block" sx={{ color: '#3498db' }}>
                      24/7 Support  
                    </Typography>
                  </Box>
                  <Box sx={{ textAlign: 'center' }}>
                    <Tooltip title="Free cancellation">
                      <EventAvailableIcon sx={{ fontSize: 28, mb: 1, color: '#3498db' }} />
                    </Tooltip>
                    <Typography variant="caption" display="block" sx={{ color: '#3498db' }}>
                      Free Cancellation
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </BookingCard>
          </Grid>
        </Grid>
      </Container>
    </PageWrapper>
  );
};

export default SevenDayClassicPage;
