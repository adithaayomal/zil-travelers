import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import p12DayCulturalData from '../../data/p12DayCulturalData.jsx';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Chip,
  IconButton,
  TextField,
  Stack,
  Tooltip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Step,
  StepLabel,
  StepContent,
  Stepper,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  AccessTime as AccessTimeIcon,
  Group as GroupIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Check as CheckIcon,
  Lock as LockIcon,
  SupportAgent as SupportAgentIcon,
  EventAvailable as EventAvailableIcon,
  Remove as RemoveIcon,
  Star as StarIcon,
  OpenInNew as OpenInNewIcon,
} from '@mui/icons-material';
import { LocationOn as LocationIcon } from '@mui/icons-material';

// Import images
import airportImage from '../../assets/images/airport.jpg';
import kithulgalaImage from '../../assets/images/kithulgala.jpg';
import ellaImage from '../../assets/images/ella.jpg';
import ella2 from '../../assets/images/ella2.jpg';
import ella3 from '../../assets/images/ella3.jpg';
import yalaImage from '../../assets/images/yala.jpg';
import sigiriyaImage from '../../assets/images/sigiriya.jpg';
import dambullaCaveImage from '../../assets/images/dambulla cave.jpg';
import toothRelicImage from '../../assets/images/TempleofToothRelic.jpg';
import peradeniyaImage from '../../assets/images/peradeniya.jpg';
import colomboImage from '../../assets/images/colombo.jpg';
import nuwaraeliya from '../../assets/images/nuwaraeliya.jpg';
import nuwaraeliya2 from '../../assets/images/nuwaraeliya2.jpg';
import bentota from '../../assets/images/bentota.jpg';
import adamspeak from '../../assets/images/adamspeak.jpg';
import adamspeak2 from '../../assets/images/adamspeak2.jpg';
import arugambay from '../../assets/images/arugambay.jpg';
import arugambay2 from '../../assets/images/arugambay2.jpg';
import arugambay3 from '../../assets/images/arugambay3.jpg';
import yala4 from '../../assets/images/yala4.jpg';
import yala from '../../assets/images/yala3.jpg';  

const PageWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
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

const InclusionCard = styled(Paper)(({ theme }) => ({
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

const StepImage = styled('img')(({ theme }) => ({
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
    height: 300,
  },
}));

const ImageGrid = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(3),
}));

const HotelCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  backgroundColor: '#ffffff',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 12px rgba(52, 152, 219, 0.1)',
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 8px 24px rgba(52, 152, 219, 0.15)',
  },
}));

const HotelLink = styled(Button)(({ theme }) => ({
  textTransform: 'none',
  color: theme.palette.primary.main,
  padding: theme.spacing(1, 2),
  border: '1px solid rgba(52, 152, 219, 0.3)',
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: 'rgba(52, 152, 219, 0.08)',
    borderColor: theme.palette.primary.main,
  },
}));

const StarRating = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: '#FFD700',
});

const P12DayCulturalPage = () => {
  const navigate = useNavigate();
  const [checkInDate, setCheckInDate] = useState('');

  const handleBooking = () => {
    if (checkInDate) {
      // Navigate to book page with package name and selected date
      navigate('/book', {
        state: {
          packageName: destination.name,
          selectedDate: checkInDate,
          price: destination.price // Base price from data
        }
      });
    }
  };

  const destination = p12DayCulturalData;

  return (
    <PageWrapper>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Left Column */}
          <Grid item xs={12} md={8}>
            <TourTitle variant="h1">
              {destination.name}
            </TourTitle>

            {destination.alternativeTourDetails && (
              <StyledPaper elevation={0} sx={{
                borderLeft: '4px solid #3498db',
                background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.02) 0%, rgba(32, 87, 167, 0.02) 100%)',
              }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 600,
                      color: '#3498db'
                    }}>
                      Tour Details
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 600, color: '#3498db' }}>Type:</Box> {destination.alternativeTourDetails.type}
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 600, color: '#3498db' }}>Duration:</Box> {destination.alternativeTourDetails.duration}
                      </Typography>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1" sx={{ 
                      fontWeight: 600,
                      color: '#3498db'
                    }}>
                      Availability & Meals
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 600, color: '#3498db' }}>Status:</Box> {destination.alternativeTourDetails.availabilityDateRange}
                      </Typography>
                      <Typography variant="body2">
                        <Box component="span" sx={{ fontWeight: 600, color: '#3498db' }}>Meal Plan:</Box> {destination.alternativeTourDetails.mealPlan}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </StyledPaper>
            )}

            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
              <HighlightChip
                icon={<LocationIcon />}
                label={destination.startLocation}
              />
              <HighlightChip
                icon={<AccessTimeIcon />}
                label={destination.duration}
              />
              <HighlightChip
                icon={<GroupIcon />}
                label={destination.groupSize}
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
              {destination.description}
            </Typography>



            {destination.attractions && destination.attractions.length > 0 && (
              <HighlightSection elevation={0} sx={{ mb: 2 }}>
                <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                  Attractions on the Tour
                </Typography>
                <Grid container spacing={2}>
                  {destination.attractions.map((attraction, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationIcon sx={{ color: '#3498db' }} />
                        <Typography>{attraction}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </HighlightSection>
            )}
            
            {destination.tourCalculationNote && (
              <Box sx={{ 
                mb: 6, 
                p: 2, 
                border: '1px dashed #3498db', 
                borderRadius: 2, 
                backgroundColor: 'rgba(52, 152, 219, 0.02)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
                }
              }}>
                <Typography variant="body2" sx={{ 
                  fontStyle: 'italic',
                  color: '#3498db'
                }}>
                  {destination.tourCalculationNote}
                </Typography>
              </Box>
            )}

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Pricing
              </Typography>
              
              <Paper elevation={0} sx={{ 
                p: 3, 
                mb: 4,
                background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.02) 0%, rgba(32, 87, 167, 0.05) 100%)',
                border: '1px solid rgba(52, 152, 219, 0.1)',
                borderRadius: 2
              }}>
                <Stack spacing={1}>
                  <Typography variant="subtitle1" sx={{ 
                    fontWeight: 600,
                    color: '#2057a7',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}>
                    <Box component="span" sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(52, 152, 219, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      fontWeight: 700,
                      color: '#3498db'
                    }}>
                      $
                    </Box>
                    PRICES are given per person in DBL or TWIN accommodation
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    All prices are in US Dollars • 3★ Hotel Accommodation
                  </Typography>
                </Stack>
              </Paper>

              <Box sx={{ mb: 4 }}>
                <Paper elevation={0} sx={{
                  p: 2,
                  mb: 2,
                  background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.02) 0%, rgba(32, 87, 167, 0.02) 100%)',
                  border: '1px dashed rgba(52, 152, 219, 0.3)',
                  borderRadius: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    background: 'linear-gradient(to bottom, #3498db, #2057a7)'
                  }
                }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ 
                      color: '#3498db',
                      backgroundColor: 'rgba(52, 152, 219, 0.1)',
                      p: 1,
                      borderRadius: 1
                    }}>
                      <EventAvailableIcon />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ 
                        color: '#3498db',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        letterSpacing: '0.5px',
                        mb: 0.5
                      }}>
                        Standard Season
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        <Chip
                          size="small"
                          label="Jan 11 - Apr 30"
                          sx={{
                            backgroundColor: 'rgba(52, 152, 219, 0.08)',
                            border: '1px dashed rgba(52, 152, 219, 0.3)',
                            borderRadius: 1,
                            '& .MuiChip-label': {
                              fontSize: '0.875rem',
                              color: '#2057a7'
                            }
                          }}
                        />
                        <Chip
                          size="small"
                          label="Nov 1 - Dec 19"
                          sx={{
                            backgroundColor: 'rgba(52, 152, 219, 0.08)',
                            border: '1px dashed rgba(52, 152, 219, 0.3)',
                            borderRadius: 1,
                            '& .MuiChip-label': {
                              fontSize: '0.875rem',
                              color: '#2057a7'
                            }
                          }}
                        />
                      </Box>
                    </Box>
                  </Stack>
                </Paper>
                <TableContainer component={Paper} elevation={0} sx={{ 
                  borderRadius: 2, 
                  border: '1px solid rgba(52, 152, 219, 0.1)',
                  overflow: 'hidden'
                }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: 'rgba(52, 152, 219, 0.05)' }}>
                        <TableCell sx={{ fontWeight: 600 }}>Package Type</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Single</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Double</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>3-4 Guests</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>5-6 Guests</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          <Stack spacing={0.5}>
                            <Typography sx={{ fontWeight: 600 }}>Island Beauty of Sri Lanka</Typography>
                            <Chip 
                              label="8 Days" 
                              size="small"
                              sx={{ 
                                backgroundColor: 'rgba(52, 152, 219, 0.08)',
                                borderRadius: 1,
                                maxWidth: 'fit-content',
                                '& .MuiChip-label': {
                                  fontSize: '0.75rem',
                                  fontWeight: 500,
                                  color: '#2057a7'
                                }
                              }}
                            />
                          </Stack>
                        </TableCell>
                        <TableCell align="right" sx={{ color: '#2057a7' }}>
                          <Box component="span" sx={{ fontSize: '0.75rem', opacity: 0.8 }}>$</Box>1,020
                        </TableCell>
                        <TableCell align="right" sx={{ color: '#2057a7' }}>
                          <Box component="span" sx={{ fontSize: '0.75rem', opacity: 0.8 }}>$</Box>575
                        </TableCell>
                        <TableCell align="right" sx={{ color: '#2057a7' }}>
                          <Box component="span" sx={{ fontSize: '0.75rem', opacity: 0.8 }}>$</Box>520
                        </TableCell>
                        <TableCell align="right" sx={{ color: '#2057a7' }}>
                          <Box component="span" sx={{ fontSize: '0.75rem', opacity: 0.8 }}>$</Box>425
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Paper elevation={0} sx={{
                  p: 2,
                  mb: 2,
                  background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.02) 0%, rgba(32, 87, 167, 0.02) 100%)',
                  border: '1px dashed rgba(52, 152, 219, 0.3)',
                  borderRadius: 2,
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '4px',
                    height: '100%',
                    background: 'linear-gradient(to bottom, #3498db, #2057a7)'
                  }
                }}>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Box sx={{ 
                      color: '#3498db',
                      backgroundColor: 'rgba(52, 152, 219, 0.1)',
                      p: 1,
                      borderRadius: 1
                    }}>
                      <EventAvailableIcon />
                    </Box>
                    <Box>
                      <Typography variant="subtitle2" sx={{ 
                        color: '#3498db',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        fontSize: '0.75rem',
                        letterSpacing: '0.5px',
                        mb: 0.5
                      }}>
                        Peak Season
                      </Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        <Chip
                          size="small"
                          label="Dec 20 - Jan 10"
                          sx={{
                            backgroundColor: 'rgba(52, 152, 219, 0.08)',
                            border: '1px dashed rgba(52, 152, 219, 0.3)',
                            borderRadius: 1,
                            '& .MuiChip-label': {
                              fontSize: '0.875rem',
                              color: '#2057a7'
                            }
                          }}
                        />
                        
                      </Box>
                    </Box>
                  </Stack>
                </Paper>
                <TableContainer component={Paper} elevation={0} sx={{ 
                  borderRadius: 2, 
                  border: '1px solid rgba(52, 152, 219, 0.1)',
                  overflow: 'hidden'
                }}>
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: 'rgba(52, 152, 219, 0.05)' }}>
                        <TableCell sx={{ fontWeight: 600 }}>Package Type</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Single</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>Double</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>3-4 Guests</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>5-6 Guests</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell component="th" scope="row">
                          <Stack spacing={0.5}>
                            <Typography sx={{ fontWeight: 600 }}>Island Beauty of Sri Lanka</Typography>
                            <Chip 
                              label="8 Days" 
                              size="small"
                              sx={{ 
                                backgroundColor: 'rgba(52, 152, 219, 0.08)',
                                borderRadius: 1,
                                maxWidth: 'fit-content',
                                '& .MuiChip-label': {
                                  fontSize: '0.75rem',
                                  fontWeight: 500,
                                  color: '#2057a7'
                                }
                              }}
                            />
                          </Stack>
                        </TableCell>
                        <TableCell align="right" sx={{ color: '#2057a7' }}>
                          <Box component="span" sx={{ fontSize: '0.75rem', opacity: 0.8 }}>$</Box>1,070
                        </TableCell>
                        <TableCell align="right" sx={{ color: '#2057a7' }}>
                          <Box component="span" sx={{ fontSize: '0.75rem', opacity: 0.8 }}>$</Box>600
                        </TableCell>
                        <TableCell align="right" sx={{ color: '#2057a7' }}>
                          <Box component="span" sx={{ fontSize: '0.75rem', opacity: 0.8 }}>$</Box>540
                        </TableCell>
                        <TableCell align="right" sx={{ color: '#2057a7' }}>
                          <Box component="span" sx={{ fontSize: '0.75rem', opacity: 0.8 }}>$</Box>450
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                General Terms and Conditions
              </Typography>
              
              {/* Children Policy */}
              <Paper elevation={0} sx={{ 
                p: 3, 
                mb: 3,
                background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.02) 0%, rgba(32, 87, 167, 0.05) 100%)',
                border: '1px solid rgba(52, 152, 219, 0.1)',
                borderRadius: 2
              }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2057a7' }}>
                  Children's Policy
                </Typography>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Children sharing a room with parents:
                </Typography>
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Chip
                    label="Ages Below 2: FREE"
                    sx={{
                      backgroundColor: 'rgba(52, 152, 219, 0.08)',
                      border: '1px dashed rgba(52, 152, 219, 0.3)',
                      borderRadius: 1
                    }}
                  />
                  <Chip
                    label="50% discount for Ages 2-12"
                    sx={{
                      backgroundColor: 'rgba(52, 152, 219, 0.08)',
                      border: '1px dashed rgba(52, 152, 219, 0.3)',
                      borderRadius: 1
                    }}
                  />
                </Box>
              </Paper>

              {/* Included Items */}
              <Paper elevation={0} sx={{ 
                p: 3, 
                mb: 3,
                background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.02) 0%, rgba(32, 87, 167, 0.05) 100%)',
                border: '1px solid rgba(52, 152, 219, 0.1)',
                borderRadius: 2
              }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2057a7' }}>
                  The Price Includes
                </Typography>
                <Grid container spacing={1}>
                  {[
                    'Accommodation in hotels on HB basis (breakfast + dinner)',
                    'Dinner on the day of arrival, breakfast on the day of departure',
                    'Transfer by air-conditioned car with a Russian-speaking guide',
                    'Entrance tickets to visit the places indicated in the program',
                    'State tax'
                  ].map((item, index) => (
                    <Grid item xs={12} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <CheckIcon sx={{ color: '#3498db', fontSize: '0.9rem' }} />
                        <Typography variant="body2">{item}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>

              {/* Not Included Items */}
              <Paper elevation={0} sx={{ 
                p: 3, 
                mb: 3,
                background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.02) 0%, rgba(32, 87, 167, 0.05) 100%)',
                border: '1px solid rgba(52, 152, 219, 0.1)',
                borderRadius: 2
              }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2057a7' }}>
                  The Price Does Not Include
                </Typography>
                <Grid container spacing={1}>
                  {[
                    'Tips',
                    'Dinner',
                    'Permission for photography and video shooting',
                    'Personal expenses',
                    'Accommodation in a beach hotel before/after the excursion tour',
                    'Meals not specified in the excursion tour table'
                  ].map((item, index) => (
                    <Grid item xs={12} key={index}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <RemoveIcon sx={{ color: '#3498db', fontSize: '0.9rem' }} />
                        <Typography variant="body2">{item}</Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Paper>

              {/* Entrance Fees Note */}
              <Paper elevation={0} sx={{ 
                p: 3,
                background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.02) 0%, rgba(32, 87, 167, 0.05) 100%)',
                border: '1px dashed rgba(52, 152, 219, 0.3)',
                borderRadius: 2
              }}>
                <Typography variant="body1" paragraph>
                  * We can exclude entrance tickets from the tour price upon request, this must be clearly stated at the time of booking/request.
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: 500, color: '#2057a7' }}>
                  Entrance fees for the Island Beauty of Sri Lanka program are USD 75 per person.
                </Typography>
              </Paper>
            </Box>

            <Box sx={{ mb: 6 }}>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Cancellation Policy
              </Typography>
              
              {/* Standard Season Cancellation Policy */}
              <Paper elevation={0} sx={{ 
                p: 3, 
                mb: 3,
                background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.02) 0%, rgba(32, 87, 167, 0.05) 100%)',
                border: '1px solid rgba(52, 152, 219, 0.1)',
                borderRadius: 2
              }}>
                <Stack direction="row" alignItems="flex-start" spacing={2}>
                  <Box sx={{ 
                    color: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    p: 1,
                    borderRadius: 1,
                    mt: 0.5
                  }}>
                    <EventAvailableIcon />
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2057a7' }}>
                      Standard Season Cancellation Terms
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 1 }}>
                        <Chip
                          size="small"
                          label="Nov 1 - Dec 19"
                          sx={{
                            backgroundColor: 'rgba(52, 152, 219, 0.08)',
                            border: '1px dashed rgba(52, 152, 219, 0.3)',
                            borderRadius: 1,
                            '& .MuiChip-label': {
                              fontSize: '0.875rem',
                              color: '#2057a7'
                            }
                          }}
                        />
                        <Chip
                          size="small"
                          label="Jan 11 - Apr 30"
                          sx={{
                            backgroundColor: 'rgba(52, 152, 219, 0.08)',
                            border: '1px dashed rgba(52, 152, 219, 0.3)',
                            borderRadius: 1,
                            '& .MuiChip-label': {
                              fontSize: '0.875rem',
                              color: '#2057a7'
                            }
                          }}
                        />
                      </Box>
                    </Box>
                    <Stack spacing={1}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2057a7', mb: 0.5 }}>
                          22+ Days Prior to Arrival
                        </Typography>
                        <Typography variant="body2">No cancellation charge</Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2057a7', mb: 0.5 }}>
                          21-15 Days Prior to Arrival
                        </Typography>
                        <Typography variant="body2">50% of the total booking amount will be charged</Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2057a7', mb: 0.5 }}>
                          14 Days or Less Prior to Arrival
                        </Typography>
                        <Typography variant="body2">100% of the total booking amount will be charged</Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </Paper>

              {/* Peak Season Cancellation Policy */}
              <Paper elevation={0} sx={{ 
                p: 3, 
                mb: 3,
                background: 'linear-gradient(135deg, rgba(32, 87, 167, 0.05) 0%, rgba(52, 152, 219, 0.02) 100%)',
                border: '1px solid rgba(52, 152, 219, 0.1)',
                borderRadius: 2
              }}>
                <Stack direction="row" alignItems="flex-start" spacing={2}>
                  <Box sx={{ 
                    color: '#2057a7',
                    backgroundColor: 'rgba(32, 87, 167, 0.1)',
                    p: 1,
                    borderRadius: 1,
                    mt: 0.5
                  }}>
                    <EventAvailableIcon />
                  </Box>
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, color: '#2057a7' }}>
                      Peak Season Cancellation Terms
                    </Typography>
                    <Box sx={{ mb: 2 }}>
                      <Chip
                        size="small"
                        label="Dec 20 - Jan 10"
                        sx={{
                          backgroundColor: 'rgba(32, 87, 167, 0.08)',
                          border: '1px dashed rgba(32, 87, 167, 0.3)',
                          borderRadius: 1,
                          '& .MuiChip-label': {
                            fontSize: '0.875rem',
                            color: '#2057a7'
                          }
                        }}
                      />
                    </Box>
                    <Stack spacing={1}>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2057a7', mb: 0.5 }}>
                          61+ Days Prior to Arrival
                        </Typography>
                        <Typography variant="body2">No cancellation charge</Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2057a7', mb: 0.5 }}>
                          60-31 Days Prior to Arrival
                        </Typography>
                        <Typography variant="body2">50% of the total booking amount will be charged</Typography>
                      </Box>
                      <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#2057a7', mb: 0.5 }}>
                          30 Days or Less Prior to Arrival
                        </Typography>
                        <Typography variant="body2">100% of the total booking amount will be charged</Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </Paper>
            </Box>

            <Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Your Itinerary
              </Typography>

              <CustomStepper orientation="vertical">
                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 1: Arrival in Colombo - Kitulgala (White Water Rafting Base)
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <StepImage src={kithulgalaImage} alt="Kitulgala White Water Rafting" />
                    <Typography variant="body1" color="text.secondary" paragraph>
                      You'll be greeted upon arrival and journey westward to Kitulgala, Sri Lanka's premier white-water rafting hub on the Kelani River. Set within dense rainforest, Kitulgala first gained fame as the filming location for The Bridge on the River Kwai.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      This afternoon, you'll feel the rush of rafting through rapids (grades 1–6), followed by a cooling trek and a jump into natural plunge pools—thrills set amid lush wilderness. Your overnight is in a charming riverside lodge.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Airport pickup and transfer to Kitulgala
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        White-water rafting through rapids (grades 1-6)
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Cooling trek through rainforest
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Jump into natural plunge pools
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight stay in riverside lodge
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 2: Kitulgala Adventure - Adam's Peak
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={adamspeak} alt="Adam's Peak Sacred Mountain" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={adamspeak2} alt="Adam's Peak Trek" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      After breakfast, swap white-water for elevation: journey toward Nallathanniya and begin the trek up Adam's Peak. This sacred climb—ascending roughly 5,600 steps in the quiet of night—culminates in a breathtaking dawn silhouette and legendary 'footprint' shrine.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      The spiritual and panoramic experience is one of Sri Lanka's most iconic. Descend afterward and rest in a cozy mountain inn.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Journey to Nallathanniya (Adam's Peak base)
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Night trek up Adam's Peak (5,600 steps)
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Sunrise at sacred footprint shrine
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Breathtaking panoramic views at dawn
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight stay in mountain inn
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 3: Adam's Peak - Ella
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <StepImage src={ellaImage} alt="ella" />
                        
                    
                    <Typography variant="body1" color="text.secondary" paragraph>
                      From the cool hill country, travel to Ella—a town cloaked in mist and charm. Rest up or choose a relaxing village stroll amid rolling tea terraces, preparing for the active days ahead.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Accommodation is in a boutique stay that captures the hill station's cozy character.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Travel from Adam's Peak to Ella
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Village stroll among tea terraces
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Rest and acclimatize to hill station atmosphere
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Enjoy misty mountain views
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight in boutique hill station accommodation
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 4: Ella Exploration
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={ella2} alt="Little Adam's Peak" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={ella3} alt="Nine Arch Bridge" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Today the hills open up: climb Little Adam's Peak or the more challenging Ella Rock for sweeping panoramas. Discover hidden waterfalls, cross the iconic Nine Arch Bridge, or soar through tea country on the Flying Ravana zipline.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Thrilling options all set against Ella's verdant backdrop.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Climb Little Adam's Peak for panoramic views
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Optional: Challenge Ella Rock hike
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Visit iconic Nine Arch Bridge
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Discover hidden waterfalls
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Optional: Flying Ravana zipline through tea country
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight stay in Ella
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 5: Ella - Arugam Bay (Surfing)
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={arugambay} alt="Arugam Bay Surfing" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={arugambay2} alt="Eastern Shore Beach" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Begin the day with a scenic drive to the eastern shore, arriving at Arugam Bay, Sri Lanka's top surf destination. Known for its consistently excellent waves, A-Bay ranks among Southeast Asia's best surf beaches.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Whether you're a first-timer or seasoned rider, the local surf schools offer lessons, rentals, and unforgettable barrel rides. Spend the evening beachside, surfboard at rest.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Scenic drive to eastern shore
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Arrive at Arugam Bay surf destination
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Surf lessons for beginners or advanced sessions
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Surfboard rentals and barrel riding
                      </Typography>
                      <Typography component="li" variant="body1">
                        Beachside evening and overnight stay
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 6: Surf & Surf Culture
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={arugambay3} alt="Surf Culture Arugam Bay" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={bentota} alt="Sri Lankan Beach Culture" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Wake to the rhythmic ocean and head out for sunrise surf sessions or a relaxed beach day. Browse artisanal shops, soak in the laidback surf-town scene, or venture inland to local temples and villages enriched with coastal life and lore.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Sunrise surf sessions
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Relaxed beach day option
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Browse artisanal shops in surf town
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Experience laidback surf culture
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Visit local temples and coastal villages
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight stay in Arugam Bay
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 7: Arugam Bay - Yala National Park
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <StepImage src={yalaImage} alt="Yala National Park Safari" />
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Depart for Yala National Park, arriving in time for an afternoon safari. This renowned wildlife reserve boasts some of the highest leopard densities on the planet—alongside elephants, sloth bears, and endemic birds.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Roam in search of elusive big cats beneath an open savannah sky.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Depart Arugam Bay for Yala National Park
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Afternoon safari in renowned wildlife reserve
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Search for leopards (highest density globally)
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Spot elephants, sloth bears, and endemic birds
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight stay near Yala
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 8: Full-Day Yala Safari - Cultural Triangle
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={yala4} alt="Yala Wildlife" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={yala} alt="Cultural Triangle" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Early morning, delve deeper into Yala's wilderness, chasing sunlit sightings of wildlife, before heading northward toward the Cultural Triangle—a region saturated in ancient heritage, crowned by Sigiriya's monumental Lion Rock.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Early morning full safari in Yala
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Sunlit wildlife photography opportunities
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Journey north to Cultural Triangle
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Approach Sigiriya Lion Rock region
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight in Cultural Triangle area
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 9: Cultural Triangle (Sigiriya, Dambulla)
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={sigiriyaImage} alt="Sigiriya Rock Fortress" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={dambullaCaveImage} alt="Dambulla Cave Temple" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Begin with a climb to Sigiriya Rock Fortress, peering over water gardens and frescoed rock faces. Nearby, explore the cave-clad serenity of Dambulla's golden temple, adorned with centuries-old murals and Buddha statues carved into stone.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Your accommodation lies within the ancient heartlands.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Climb Sigiriya Rock Fortress
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        View ancient water gardens and frescoes
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Explore Dambulla Cave Temple complex
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Admire centuries-old murals and Buddha statues
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight in Cultural Triangle accommodation
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 10: Cultural Triangle - Kandy
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={toothRelicImage} alt="Temple of Sacred Tooth Relic" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={peradeniyaImage} alt="Royal Botanical Gardens" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Venture into Kandy, Sri Lanka's spiritual epicenter. Through the day, visit the Temple of the Sacred Tooth Relic, followed by lush strolls through Peradeniya's Royal Botanical Gardens and a vibrant evening cultural performance of dance and drums.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Journey to Kandy, spiritual epicenter
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Visit Temple of Sacred Tooth Relic
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Stroll through Royal Botanical Gardens Peradeniya
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Evening cultural performance with dance and drums
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight stay in Kandy
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 11: Kandy - Colombo
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={nuwaraeliya} alt="Tea Estate Train Journey" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={colomboImage} alt="Colombo City" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Take a morning train through sweeping tea estates or explore Kandy's charming lakeside before rolling down to Colombo. Finish with a taste of Sri Lanka's capital—its spice-scented markets, colonial architecture, and serene temple by Beira Lake.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Overnight in the city.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Optional morning train through tea estates
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Explore Kandy lakeside before departure
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Journey to Colombo capital city
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Visit spice-scented markets and colonial architecture
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Serene temple visit by Beira Lake
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight stay in Colombo
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 12: Colombo Leisure & Departure
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <StepImage src={airportImage} alt="Airport Departure" />
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Relish a final morning of shopping, browsing galleries, or sipping fresh brews in Colombo's cafés. Then, when it's time, you'll be transferred to the airport to catch your flight home—full of new stories and memories.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Final morning leisure in Colombo
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Shopping and gallery browsing
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Coffee and fresh brews in city cafés
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Last-minute souvenir shopping
                      </Typography>
                      <Typography component="li" variant="body1">
                        Airport transfer and departure
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>
              </CustomStepper>

              <Paper elevation={0} sx={{ 
                p: 2, 
                mt: 3,
                background: 'rgba(52, 152, 219, 0.02)',
                border: '1px dashed rgba(52, 152, 219, 0.3)',
                borderRadius: 2
              }}>
                <Typography variant="body2" sx={{ color: '#2057a7', fontStyle: 'italic' }}>
                  *Note: Your guide reserves the right to change the order of visiting places according to the excursion program.
                </Typography>
              </Paper>
            </Box>
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
                <PriceTag>${destination.price}</PriceTag>
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
                  {checkInDate ? 'Book Now' : 'Select Date to Book'}
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
        
        {/* Hotel Accommodations */}
        <StyledPaper>
          <Typography variant="h5" gutterBottom sx={{ 
            fontWeight: 700, 
            color: '#2057a7',
            borderBottom: '2px solid rgba(52, 152, 219, 0.3)',
            paddingBottom: 2,
            marginBottom: 3 
          }}>
            Hotel Accommodations
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 4, color: 'text.secondary' }}>
            During your 12-day cultural and adventure journey, you will be accommodated in carefully selected hotels ranging from riverside lodges to boutique hill stations and beachfront properties. All accommodations are chosen for their unique character and proximity to adventure activities.
          </Typography>

          {/* Kitulgala Hotels - Days 1-2 */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ 
              mb: 3,
              color: '#3498db',
              borderLeft: '4px solid #3498db',
              pl: 2,
              fontWeight: 600
            }}>
              Kitulgala (Days 1-2)
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  name: 'Kithulgala Rest House',
                  link: 'https://www.booking.com/hotel/lk/kithulgala-rest-house.html',
                },
                {
                  name: 'Borderlands Camp',
                  link: 'https://www.borderlandscamp.com/',
                },
              ].map((hotel) => (
                <Grid item xs={12} sm={6} md={4} key={hotel.name}>
                  <HotelCard>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {hotel.name}
                    </Typography>
                    <StarRating>
                      {[...Array(3)].map((_, i) => (
                        <StarIcon key={i} fontSize="small" />
                      ))}
                      <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                        Riverside Lodge
                      </Typography>
                    </StarRating>
                    <Box sx={{ mt: 2 }}>
                      <HotelLink
                        href={hotel.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<OpenInNewIcon />}
                      >
                        Visit Website
                      </HotelLink>
                    </Box>
                  </HotelCard>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Hill Country Hotels - Days 3-4 */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ 
              mb: 3,
              color: '#3498db',
              borderLeft: '4px solid #3498db',
              pl: 2,
              fontWeight: 600
            }}>
              Hill Country - Ella (Days 3-4)
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  name: 'Ella Flower Garden Resort',
                  link: 'https://www.ellaflowergarden.com/',
                },
                {
                  name: '98 Acres Resort & Spa',
                  link: 'https://www.98acres.com/',
                },
                {
                  name: 'Zion View Green Ella',
                  link: 'https://www.zionviewgreen.com/',
                },
              ].map((hotel) => (
                <Grid item xs={12} sm={6} md={4} key={hotel.name}>
                  <HotelCard>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {hotel.name}
                    </Typography>
                    <StarRating>
                      {[...Array(4)].map((_, i) => (
                        <StarIcon key={i} fontSize="small" />
                      ))}
                      <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                        Boutique Hill Station
                      </Typography>
                    </StarRating>
                    <Box sx={{ mt: 2 }}>
                      <HotelLink
                        href={hotel.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<OpenInNewIcon />}
                      >
                        Visit Website
                      </HotelLink>
                    </Box>
                  </HotelCard>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Arugam Bay Hotels - Days 5-6 */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ 
              mb: 3,
              color: '#3498db',
              borderLeft: '4px solid #3498db',
              pl: 2,
              fontWeight: 600
            }}>
              Arugam Bay (Days 5-6)
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  name: 'Stardust Beach Hotel',
                  link: 'https://www.stardustbeach.lk/',
                },
                {
                  name: 'Galaxy Hotel Arugam Bay',
                  link: 'https://www.galaxyhotel.lk/',
                },
              ].map((hotel) => (
                <Grid item xs={12} sm={6} md={4} key={hotel.name}>
                  <HotelCard>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {hotel.name}
                    </Typography>
                    <StarRating>
                      {[...Array(3)].map((_, i) => (
                        <StarIcon key={i} fontSize="small" />
                      ))}
                      <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                        Surf Lodge
                      </Typography>
                    </StarRating>
                    <Box sx={{ mt: 2 }}>
                      <HotelLink
                        href={hotel.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<OpenInNewIcon />}
                      >
                        Visit Website
                      </HotelLink>
                    </Box>
                  </HotelCard>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Yala Area Hotels - Days 7-8 */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ 
              mb: 3,
              color: '#3498db',
              borderLeft: '4px solid #3498db',
              pl: 2,
              fontWeight: 600
            }}>
              Yala Area (Days 7-8)
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  name: 'Jetwing Yala',
                  link: 'https://www.jetwinghotels.com/jetwing-yala/',
                },
                {
                  name: 'Cinnamon Wild Yala',
                  link: 'https://www.cinnamonhotels.com/cinnamon-wild-yala/',
                },
              ].map((hotel) => (
                <Grid item xs={12} sm={6} md={4} key={hotel.name}>
                  <HotelCard>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {hotel.name}
                    </Typography>
                    <StarRating>
                      {[...Array(4)].map((_, i) => (
                        <StarIcon key={i} fontSize="small" />
                      ))}
                      <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                        Safari Lodge
                      </Typography>
                    </StarRating>
                    <Box sx={{ mt: 2 }}>
                      <HotelLink
                        href={hotel.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<OpenInNewIcon />}
                      >
                        Visit Website
                      </HotelLink>
                    </Box>
                  </HotelCard>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Cultural Triangle Hotels - Day 9 */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ 
              mb: 3,
              color: '#3498db',
              borderLeft: '4px solid #3498db',
              pl: 2,
              fontWeight: 600
            }}>
              Cultural Triangle (Day 9)
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  name: 'Sigiriya Village',
                  link: 'https://www.colomboforthotels.com/sigiriya-village/',
                },
                {
                  name: 'Kassapa Lions Rock',
                  link: 'https://www.kassapalionsrock.com/',
                },
              ].map((hotel) => (
                <Grid item xs={12} sm={6} md={4} key={hotel.name}>
                  <HotelCard>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {hotel.name}
                    </Typography>
                    <StarRating>
                      {[...Array(4)].map((_, i) => (
                        <StarIcon key={i} fontSize="small" />
                      ))}
                      <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                        Heritage Hotel
                      </Typography>
                    </StarRating>
                    <Box sx={{ mt: 2 }}>
                      <HotelLink
                        href={hotel.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<OpenInNewIcon />}
                      >
                        Visit Website
                      </HotelLink>
                    </Box>
                  </HotelCard>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Kandy Hotels - Day 10 */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ 
              mb: 3,
              color: '#3498db',
              borderLeft: '4px solid #3498db',
              pl: 2,
              fontWeight: 600
            }}>
              Kandy (Day 10)
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  name: 'Oakray Regency',
                  link: 'https://www.oakrayhotels.com/oak-ray-regency/',
                },
                {
                  name: 'Hotel Suisse',
                  link: 'https://www.hotelsuisse.lk/',
                },
              ].map((hotel) => (
                <Grid item xs={12} sm={6} md={4} key={hotel.name}>
                  <HotelCard>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {hotel.name}
                    </Typography>
                    <StarRating>
                      {[...Array(4)].map((_, i) => (
                        <StarIcon key={i} fontSize="small" />
                      ))}
                      <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                        Hill Capital Hotel
                      </Typography>
                    </StarRating>
                    <Box sx={{ mt: 2 }}>
                      <HotelLink
                        href={hotel.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<OpenInNewIcon />}
                      >
                        Visit Website
                      </HotelLink>
                    </Box>
                  </HotelCard>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Colombo Hotels - Day 11 */}
          <Box>
            <Typography variant="h6" sx={{ 
              mb: 3,
              color: '#3498db',
              borderLeft: '4px solid #3498db',
              pl: 2,
              fontWeight: 600
            }}>
              Colombo (Day 11)
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  name: 'Fairway Colombo',
                  link: 'https://www.fairwaycolombo.com',
                },
                {
                  name: 'Ramada Colombo',
                  link: 'https://www.wyndhamhotels.com/',
                },
                {
                  name: 'Mandarina Colombo',
                  link: 'https://www.mandarinacolombo.com',
                },
              ].map((hotel) => (
                <Grid item xs={12} sm={6} md={4} key={hotel.name}>
                  <HotelCard>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                      {hotel.name}
                    </Typography>
                    <StarRating>
                      {[...Array(3)].map((_, i) => (
                        <StarIcon key={i} fontSize="small" />
                      ))}
                      <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                        3-Star Rating
                      </Typography>
                    </StarRating>
                    <Box sx={{ mt: 2 }}>
                      <HotelLink
                        href={hotel.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        endIcon={<OpenInNewIcon />}
                      >
                        Visit Website
                      </HotelLink>
                    </Box>
                  </HotelCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        </StyledPaper>
      </Container>
    </PageWrapper>
  );
};

export default P12DayCulturalPage;
