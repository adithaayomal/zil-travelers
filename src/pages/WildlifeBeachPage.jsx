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
  Step,
  StepLabel,
  StepContent,
  Stepper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  AccessTime as AccessTimeIcon,
  Group as GroupIcon,
  Check as CheckIcon,
  Lock as LockIcon,
  SupportAgent as SupportAgentIcon,
  EventAvailable as EventAvailableIcon,
  Nature as NatureIcon,
  BeachAccess as BeachIcon,
} from '@mui/icons-material';
import { LocationOn as LocationIcon } from '@mui/icons-material';

// Import images
import bentotaImage from '../assets/images/bentota.jpg';
import negomboImage from '../assets/images/negombo.jpg';
import gegoryImage from '../assets/images/gegory.jpg';

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
  position: 'sticky',
  top: '100px', // Adjust this value based on your navbar height
  padding: theme.spacing(4),
  marginTop: theme.spacing(0),
  background: 'linear-gradient(135deg, #ffffff 0%, rgba(52, 152, 219, 0.05) 100%)',
  border: '1px solid rgba(52, 152, 219, 0.1)',
  zIndex: 10,
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

const CustomStepper = styled(Stepper)(({ theme }) => ({
  '.MuiStepConnector-line': {
    borderColor: '#3498db',
    borderLeftWidth: 2,
  },
  '.MuiStepContent-root': {
    borderColor: '#3498db',
    borderLeftWidth: 2,
  },
  '.MuiStepLabel-root': {
    '.MuiStepLabel-iconContainer': {
      '.MuiSvgIcon-root': {
        color: '#3498db',
        width: 32,
        height: 32,
      },
    },
  },
  padding: theme.spacing(2),
  backgroundColor: 'rgba(52, 152, 219, 0.02)',
  borderRadius: theme.shape.borderRadius * 2,
  border: '1px solid rgba(52, 152, 219, 0.1)',
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

const ActivityCard = styled(Paper)(({ theme }) => ({
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
    height: 280,
  },
}));

const tourData = {
  name: 'Wildlife & Beach Paradise Tour',
  description: 'Combine the thrill of wildlife safaris with the relaxation of pristine beaches in this perfect Sri Lankan adventure. Experience incredible wildlife encounters in national parks and unwind on some of the most beautiful beaches in South Asia.',
  price: 749,
  duration: '6 Days / 5 Nights',
  startLocation: 'Colombo International Airport',
  groupSize: '2-12 People',
  highlights: [
    'Yala National Park Safari',
    'Udawalawe Elephant Park',
    'Bentota Beach Resort',
    'Negombo Lagoon Boat Tour',
    'Mirissa Whale Watching',
    'Galle Dutch Fort',
    'Turtle Hatchery Visit'
  ],
  activities: [
    {
      title: 'Wildlife Safari Adventures',
      description: 'Spot leopards, elephants, and exotic birds in their natural habitat',
      icon: NatureIcon
    },
    {
      title: 'Beach Paradise',
      description: 'Relax on golden sandy beaches with crystal clear waters',
      icon: BeachIcon
    },
    {
      title: 'Water Sports',
      description: 'Enjoy snorkeling, diving, and various water activities',
      icon: BeachIcon
    },
    {
      title: 'Cultural Experiences',
      description: 'Visit traditional fishing villages and local markets',
      icon: LocationIcon
    }
  ],
  inclusions: [
    'Airport transfers',
    'Accommodation (3-star hotels & beach resorts)',
    'Daily breakfast',
    'Safari jeep with driver/guide',
    '2 wildlife park safaris',
    'Whale watching boat trip',
    'Entrance fees to attractions',
    'Transportation in AC vehicle'
  ],
  itinerary: [
    {
      day: 1,
      title: 'Arrival & Negombo',
      description: 'Airport pickup, check-in at beach hotel, and relaxing evening by the lagoon.',
      activities: ['Airport transfer', 'Hotel check-in', 'Negombo lagoon sunset tour']
    },
    {
      day: 2,
      title: 'Yala National Park Safari',
      description: 'Full day safari in Sri Lanka\'s most famous national park, known for leopards.',
      activities: ['Early morning safari', 'Wildlife photography', 'Picnic lunch in park']
    },
    {
      day: 3,
      title: 'Udawalawe & Elephant Transit Home',
      description: 'Visit elephant orphanage and enjoy another exciting safari experience.',
      activities: ['Elephant orphanage visit', 'Udawalawe safari', 'Local village tour']
    },
    {
      day: 4,
      title: 'Mirissa Beach & Whale Watching',
      description: 'Early morning whale watching cruise followed by beach relaxation.',
      activities: ['Whale watching cruise', 'Beach relaxation', 'Sunset at Mirissa']
    },
    {
      day: 5,
      title: 'Galle Fort & Bentota Beach',
      description: 'Explore historic Galle Fort and enjoy water sports at Bentota.',
      activities: ['Galle Fort exploration', 'Water sports at Bentota', 'Turtle hatchery']
    },
    {
      day: 6,
      title: 'Departure',
      description: 'Final beach morning and transfer to airport for departure.',
      activities: ['Beach relaxation', 'Souvenir shopping', 'Airport transfer']
    }
  ]
};

const WildlifeBeachPage = () => {
  const [checkInDate, setCheckInDate] = useState('');
  const navigate = useNavigate();

  const handleBooking = () => {
    if (checkInDate) {
      // Navigate to book page with package name and selected date
      navigate('/book', {
        state: {
          packageName: tourData.name,
          selectedDate: checkInDate,
          price: tourData.price
        }
      });
    }
  };

  return (
    <PageWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
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

            {/* Gallery */}
            <StyledPaper sx={{ mb: 4 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                Experience Gallery
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <GalleryImage src={bentotaImage} alt="Bentota Beach" />
                  <Typography variant="subtitle2" align="center" sx={{ color: 'text.secondary' }}>
                    Bentota Beach Paradise
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <GalleryImage src={negomboImage} alt="Negombo Lagoon" />
                  <Typography variant="subtitle2" align="center" sx={{ color: 'text.secondary' }}>
                    Negombo Lagoon Tours
                  </Typography>
                </Grid>
                <Grid item xs={12} md={4}>
                  <GalleryImage src={gegoryImage} alt="Wildlife Safari" />
                  <Typography variant="subtitle2" align="center" sx={{ color: 'text.secondary' }}>
                    Wildlife Safari Adventure
                  </Typography>
                </Grid>
              </Grid>
            </StyledPaper>

            {/* Activities */}
            <HighlightSection>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Tour Activities
              </Typography>
              <Grid container spacing={3}>
                {tourData.activities.map((activity, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <ActivityCard>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                        <Box sx={{
                          width: 48,
                          height: 48,
                          borderRadius: '50%',
                          background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white'
                        }}>
                          <activity.icon />
                        </Box>
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: 600, color: '#2057a7', mb: 1 }}>
                            {activity.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {activity.description}
                          </Typography>
                        </Box>
                      </Box>
                    </ActivityCard>
                  </Grid>
                ))}
              </Grid>
            </HighlightSection>

            {/* Detailed Itinerary */}
            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Your Itinerary
              </Typography>

              <CustomStepper orientation="vertical">
                {tourData.itinerary.map((day, index) => (
                  <Step active={true} key={index}>
                    <StepLabel>
                      <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Day {day.day}: {day.title}
                      </Typography>
                    </StepLabel>
                    <StepContent>
                      <Typography variant="body1" color="text.secondary" paragraph>
                        {day.description}
                      </Typography>
                      <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                        {day.activities.map((activity, idx) => (
                          <Typography component="li" variant="body1" sx={{ mb: 1 }} key={idx}>
                            {activity}
                          </Typography>
                        ))}
                      </Box>
                    </StepContent>
                  </Step>
                ))}
              </CustomStepper>
            </Box>

            {/* Inclusions */}
            <StyledPaper>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                What's Included
              </Typography>
              <Grid container spacing={1}>
                {tourData.inclusions.map((item, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <CheckIcon sx={{ color: '#3498db', fontSize: '1.2rem' }} />
                      <Typography variant="body2">{item}</Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </StyledPaper>
          </Grid>

          {/* Right Column - Booking Card */}
          <Grid item xs={12} md={4} sx={{ mt: { xs: 4, md: 12 }, position: 'relative', zIndex: 1 }}>
            <BookingCard elevation={3}>
              <Typography variant="h5" gutterBottom sx={{ 
                fontWeight: 700,
                color: '#3498db'
              }}>
                Book This Tour
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <PriceTag>${tourData.price}</PriceTag>
                <Typography variant="subtitle2" sx={{ color: '#3498db' }}>
                  per person, including all taxes
                </Typography>
              </Box>

              <Stack spacing={2.5}>
                <Box>
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 600 }}>
                    Select Travel Date
                  </Typography>
                  <TextField
                    label="Travel Date"
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
                </Box>

                <Button
                  variant="contained"
                  size="large"
                  fullWidth
                  onClick={handleBooking}
                  disabled={!checkInDate}
                  sx={{
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #2057a7 0%, #3498db 100%)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(52, 152, 219, 0.2)',
                    },
                    '&:disabled': {
                      background: '#cccccc',
                      color: '#666666',
                    }
                  }}
                >
                  {checkInDate ? 'Book This Package' : 'Select Date to Book'}
                </Button>
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

export default WildlifeBeachPage;
