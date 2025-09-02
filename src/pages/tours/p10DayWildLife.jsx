import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import p10DayWildLifeData from '../../data/p10DayWildLifeData.jsx';
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
import pinnawalaImage from '../../assets/images/pinnawala.jpeg';
import sigiriyaImage from '../../assets/images/sigiriya.jpg';
import dambullaCaveImage from '../../assets/images/dambulla cave.jpg';
import toothRelicImage from '../../assets/images/TempleofToothRelic.jpg';
import peradeniyaImage from '../../assets/images/peradeniya.jpg';
import negombo from '../../assets/images/negombo.jpeg';
import nuwaraeliya from '../../assets/images/nuwaraeliya.jpg';
import nuwaraeliya2 from '../../assets/images/nuwaraeliya2.jpg';
import bentota from '../../assets/images/bentota.jpg';
import bentota2 from '../../assets/images/bentota2.jpg';
import bentota3 from '../../assets/images/bentota3.jpg';
import bentota4 from '../../assets/images/bentota4.jpg';
import colomboshop from '../../assets/images/colomboshop.jpg';
import wilpattu from '../../assets/images/wilpattu.jpg';
import wilpattu2 from '../../assets/images/wilpattu2.jpg';
import minneriya from '../../assets/images/minneriya.jpg';
import minneriya2 from '../../assets/images/minneriya2.jpg';
import train from '../../assets/images/train.png';
import galle from '../../assets/images/galle.jpg';
import galle2 from '../../assets/images/galle2.jpg';
import galle3 from '../../assets/images/galle3.jpg';
import yala from '../../assets/images/yala.jpg';
import yala2 from '../../assets/images/yala3.jpg';

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

const P10DayWildLifePage = () => {
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

  const destination = p10DayWildLifeData;

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
                      Day 1 - Arrival in Colombo - Soft Landing by the Coast
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <StepImage src={airportImage} alt="Bandaranaike International Airport" />
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Upon landing at Bandaranaike International Airport, you'll be welcomed and whisked away to a nearby tranquil coastal spot—perhaps Kalpitiya Lagoon or Negombo—for a gentle and scenic introduction to Sri Lanka.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      After settling into your hotel, you'll have the chance to unwind or take a peaceful stroll by the lagoon or beach, soaking in the sights and sounds of local life. Optional additions include a sunset catamaran sail that lets you drift across calm waters and watch the day melt into evening. This soft landing eases you into island time beautifully.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Meet with Walkers Tours representative upon arrival at airport
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Transfer to nearby tranquil coastal spot (Kalpitiya Lagoon or Negombo)
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Check-in at coastal hotel and settle in
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Peaceful stroll by the lagoon or beach, soaking in local life
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Optional sunset catamaran sail across calm waters
                      </Typography>
                      <Typography component="li" variant="body1">
                        Rest and overnight stay at coastal hotel
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 2 - Colombo - Wilpattu Safari
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <StepImage src={wilpattu} alt="Wilpattu National Park" />

                    <Typography variant="body1" color="text.secondary" paragraph>
                      Following breakfast, set out on a scenic drive through Sri Lanka's verdant countryside toward Wilpattu National Park. Here, during a late afternoon safari, you'll traverse monsoon-fed scrublands and open lakes—known as "Willus"—in search of leopards, sloth bears, elephants, crocodiles, and vibrant birdlife.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      The untouched wilderness and low visitor numbers guarantee an immersive wildlife encounter. Wilpattu is Sri Lanka's largest and oldest national park, famous for its natural lakes and diverse ecosystem that provides excellent opportunities for wildlife photography and nature observation.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Breakfast at hotel followed by scenic drive
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Drive through Sri Lanka's verdant countryside toward Wilpattu
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Arrive at Wilpattu National Park and check-in at safari lodge
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Late afternoon safari through monsoon-fed scrublands
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Explore the unique Willus (natural open lakes)
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Search for leopards, sloth bears, elephants, and crocodiles
                      </Typography>
                      <Typography component="li" variant="body1">
                        Return to lodge for dinner and overnight stay
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 3 - Full Safari in Wilpattu
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <StepImage src={wilpattu2} alt="Wilpattu National Park" />
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Rise early for a full day of safari exploration. After entering the park, enjoy a simple, packed breakfast amid nature before continuing. Spot leopards stealthily moving through the bush, catch sloth bears scavenging, and photograph herds of elephants near waterholes.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      You'll return to your lodge for a relaxing evening immersed in tranquil wilderness. The extended safari time allows for deeper exploration of the park's diverse habitats and increases your chances of spotting the elusive leopard, for which Wilpattu is particularly famous.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Early morning rise for full day safari exploration
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Enter the park for extended wildlife viewing
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Enjoy packed breakfast amid pristine nature
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Spot leopards moving stealthily through the bush
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Observe sloth bears scavenging in their natural habitat
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Photograph elephant herds gathering near waterholes
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Experience low visitor numbers for immersive encounters
                      </Typography>
                      <Typography component="li" variant="body1">
                        Return to lodge for relaxing evening and overnight stay
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 4 – Safari to Cultural Triangle (Sigiriya)
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={sigiriyaImage} alt="Sigiriya Lion Rock" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={dambullaCaveImage} alt="Village Experience" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Begin with breakfast and depart for the Cultural Triangle. On the way, enjoy a rural village visit and traditional lunch. In the afternoon, reach Sigiriya and ascend its ancient Lion Rock Fortress at sunset—watch the sky turn golden over water gardens and frescoed rock surfaces for a magical experience.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Breakfast at the lodge
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Depart for the Cultural Triangle
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Rural village visit and traditional lunch
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Arrive in Sigiriya
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Sunset ascent of Lion Rock Fortress
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight stay in Sigiriya
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 5 – Sigiriya - Minneriya Elephant Safari - Kandy
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <StepImage src={minneriya} alt="Minneriya National Park" />
                    <Typography variant="body1" color="text.secondary" paragraph>
                      After an early breakfast, climb Sigiriya Rock to explore frescoes and panoramic views of the surrounding plains. Later, head to Minneriya or Kaudulla National Park for an afternoon safari, timed to witness the famous "elephant gathering"—hundreds of pachyderms converging around waterholes. As evening falls, continue to Kandy for an overnight stay, enriched by colorful experiences.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Early breakfast at hotel
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Climb Sigiriya Rock for frescoes and panoramic views
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Afternoon safari in Minneriya or Kaudulla National Park
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Witness the "elephant gathering" at waterholes
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Continue to Kandy for overnight stay
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 6 – Dambulla - Train to Hill Country (Optional Extension)
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <StepImage src={train} alt="train" />
                    <Typography variant="body1" color="text.secondary" paragraph>
                      You may choose to visit the Dambulla Cave Temple, uncovering ancient murals and sacred Buddha statues before enjoying the scenic train ride into Sri Lanka’s misty highlands. Pass vast tea plantations and colonial towns before arriving in the serene hill station—Ella or Nuwara Eliya—for sunset views and a night under mountain skies.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Optional visit to Dambulla Cave Temple
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Scenic train ride to Ella or Nuwara Eliya
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Pass tea plantations and colonial towns
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Arrive in hill country for sunset views
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight stay in Ella or Nuwara Eliya
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 7 – Transfer to Yala Safari, Evening Drive
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <StepImage src={yala} alt="Yala National Park" />
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Journey south toward Yala National Park, known for its high leopard density and diverse ecosystems. Arrive in time for an evening safari in the quieter blocks—3 or 5—where wildlife sightings feel personal rather than crowded. This half-day game drive sets the tone for an unforgettable wilderness experience under the stars.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Journey south toward Yala National Park
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Check-in at safari lodge near Yala
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Evening safari in quieter blocks (3 or 5)
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Personal wildlife sightings away from crowds
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Experience high leopard density ecosystem
                      </Typography>
                      <Typography component="li" variant="body1">
                        Return to lodge for overnight stay under stars
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 8 – Full-Day Safari in Yala
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <StepImage src={yala2} alt="Yala National Park Safari" />
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Wake before dawn for a full-day safari in Yala. Venture through diverse terrain in search of elusive leopards, wild elephants, buffalo herds, and myriad birds. The park's variety ensures thrilling and varied wildlife glimpses. Return to your lodge for some rest, then perhaps enjoy a relaxed afternoon exploring nearby surroundings.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Wake before dawn for full-day safari
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Venture through diverse terrain of Yala
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Search for elusive leopards and wild elephants
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Spot buffalo herds and myriad bird species
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Return to lodge for rest and relaxation
                      </Typography>
                      <Typography component="li" variant="body1">
                        Optional afternoon exploration of nearby surroundings
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 9 – Yala to Beach & Galle Fort
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={galle} alt="Galle Fort" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={galle2} alt="Galle Fort Ramparts" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Depart after breakfast for Galle Fort on the southern coast. Spend the afternoon walking along historic ramparts, weaving through cobbled lanes lined with colonial architecture, and experiencing the lively fusion of Dutch, Portuguese, and local cultures in this UNESCO World Heritage Site. Enjoy evening coastal views before resting at your beachside accommodation.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Depart after breakfast for Galle Fort
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Walk along historic ramparts of UNESCO site
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Explore cobbled lanes with colonial architecture
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Experience fusion of Dutch, Portuguese, and local cultures
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Enjoy evening coastal views
                      </Typography>
                      <Typography component="li" variant="body1">
                        Check-in at beachside accommodation
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 10 – Leisure & Departure
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <StepImage src={galle3} alt="Beach Leisure" />
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Your final morning is yours to savor—relax on the beach, stroll through Galle's charming streets, or pick up final souvenirs. When your time draws to a close, you'll be transferred back to the airport with memories enriched by wildlife, history, and seaside serenity.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Final morning leisure time
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Relax on the beach or stroll through Galle streets
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Pick up final souvenirs and gifts
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Check-out from beachside accommodation
                      </Typography>
                      <Typography component="li" variant="body1">
                        Transfer to Bandaranaike International Airport for departure
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
            During your tour, you will be accommodated in carefully selected 3-star hotels or similar category properties. All hotels are chosen for their strategic locations, comfort, and service quality.
          </Typography>

          {/*  Hotels */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ 
              mb: 3,
              color: '#3498db',
              borderLeft: '4px solid #3498db',
              pl: 2,
              fontWeight: 600
            }}>
              Sigiriya - Dambulla - Habarana
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  name: 'Danawwa Resort',
                  link: 'https://www.danawwaresort.com/',
                },
                {
                  name: 'Sigiriya Village',
                  link: 'https://www.colomboforthotels.com/sigiriya-village/',
                },
                {
                  name: 'Pelwehera Village Resort',
                  link: 'https://sites.google.com/view/pelwehera-village-resort/',
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

          {/* Kandy Hotels */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ 
              mb: 3,
              color: '#3498db',
              borderLeft: '4px solid #3498db',
              pl: 2,
              fontWeight: 600
            }}>
              Kandy
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  name: 'Oakray Regency',
                  link: 'https://www.oakrayhotels.com/oak-ray-regency/',
                },
                {
                  name: 'Oakray Serene Garden',
                  link: 'https://www.oakrayhotels.com/serenegarden/',
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

          {/* Colombo Hotels */}
          <Box>
            <Typography variant="h6" sx={{ 
              mb: 3,
              color: '#3498db',
              borderLeft: '4px solid #3498db',
              pl: 2,
              fontWeight: 600
            }}>
              Colombo
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

export default P10DayWildLifePage;
