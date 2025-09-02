import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gemOfSriLankaData from '../../data/p7DayClassicData.jsx';
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
import galle from '../../assets/images/galle.jpg';

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

const GemOfSriLankaPage = () => {
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

  const destination = gemOfSriLankaData;

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
                      Day 1: Arrival in Colombo - Negombo
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <StepImage src={negombo} alt="Bandaranaike International Airport" />
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Upon arrival at Bandaranaike International Airport, you will be greeted by your driver and transferred to Negombo, a coastal town known for its fishing industry and serene beaches. After checking into your hotel, you can unwind and take a leisurely stroll along Negombo Beach, enjoying the gentle sea breeze and the stunning sunset over the Indian Ocean. This is the perfect introduction to Sri Lanka, allowing you to relax and acclimate after your journey. Dinner can be enjoyed at the hotel or at one of the local seaside restaurants, sampling fresh seafood delicacies. Overnight stay will be in Negombo.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Meet your driver at Bandaranaike International Airport
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Transfer to Negombo and check-in at hotel
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Leisurely stroll along Negombo Beach and enjoy the sunset
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Dinner at hotel or local seaside restaurant (fresh seafood recommended)
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight stay in Negombo
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 2: Negombo - Pinnawala - Dambulla
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={pinnawalaImage} alt="Pinnawala Elephant Orphanage" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={dambullaCaveImage} alt="Dambulla Cave Temple" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      After breakfast at the hotel, you will depart for Dambulla. En route, a stop will be made at the Pinnawala Elephant Orphanage (Optional – Entrance Fee Applies), which provides care for orphaned and injured elephants. Here, you can observe the elephants being fed and bathed in the river, a truly memorable wildlife experience. Continuing to Dambulla, you will visit the Dambulla Cave Temple (Optional – Entrance Fee Supplement), a UNESCO World Heritage Site renowned for its impressive cave complexes filled with over 2000 square meters of painted walls and ceilings. The temple houses more than 150 Buddha statues, including a colossal 14-meter reclining Buddha carved from rock. After sightseeing, check into your hotel in Dambulla and relax for the evening. Overnight stay in Dambulla.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Breakfast at the hotel
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Depart for Dambulla
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Stop at Pinnawala Elephant Orphanage (Optional – Entrance Fee Applies)
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Observe elephants being fed and bathed in the river
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Visit Dambulla Cave Temple (Optional – Entrance Fee Supplement)
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Explore cave complexes and Buddha statues
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Check-in at hotel in Dambulla and relax
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight stay in Dambulla
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 3: Dambulla - Sigiriya - Kandy
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={sigiriyaImage} alt="Sigiriya Rock Fortress" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={toothRelicImage} alt="Dambulla Cave Temple" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Breakfast at the hotel prepares you for a full day of exploration. Begin with the Sigiriya Rock Fortress (Optional – Entrance Fee Applies), the iconic "Lion Rock" built by King Kashyapa in the 5th century. This UNESCO World Heritage Site rises 200 meters above the surrounding plains and features beautifully preserved frescoes known as the "Heavenly Maidens," extensive water gardens, and ancient ruins. After descending from the fortress, you will drive to Kandy, the cultural capital of Sri Lanka. In the evening, enjoy a traditional Kandyan dance performance, showcasing the island’s vibrant cultural heritage. Overnight stay in Kandy.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Breakfast at the hotel
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Visit Sigiriya Rock Fortress (Optional – Entrance Fee Applies)
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Explore frescoes, water gardens, and ruins
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Drive to Kandy
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Evening: Traditional Kandyan dance performance
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
                      Day 4: Kandy - Nuwara Eliya
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={nuwaraeliya} alt="Temple of the Sacred Tooth Relic" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={nuwaraeliya2} alt="Royal Botanical Gardens Peradeniya" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Start the day with a visit to the Temple of the Sacred Tooth Relic, one of the most revered Buddhist sites in the world, housing a sacred relic of the Buddha. Next, you will visit the Royal Botanical Gardens in Peradeniya (Optional – Entrance Fee Supplement), famous for its extensive collection of tropical plants, orchids, and towering palm trees. Afterward, depart for Nuwara Eliya, a picturesque hill station often referred to as "Little England" due to its colonial architecture and temperate climate. Stroll around Gregory Lake or explore the town’s historical landmarks to soak in the cool, refreshing atmosphere. Overnight stay in Nuwara Eliya.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Visit Temple of the Sacred Tooth Relic
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Visit Royal Botanical Gardens in Peradeniya (Optional – Entrance Fee Supplement)
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Depart for Nuwara Eliya
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Stroll around Gregory Lake or explore historical landmarks
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight stay in Nuwara Eliya
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 5: Nuwara Eliya - Bentota
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={bentota2} alt="Nuwara Eliya" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={bentota} alt="Bentota Beach" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Following breakfast, visit a tea plantation and factory to learn about the process of turning freshly plucked tea leaves into the world-famous Ceylon tea. Afterward, depart for Bentota, a scenic coastal town known for its pristine beaches and relaxed atmosphere. Check into your hotel and spend the afternoon at leisure, enjoying the beach or hotel amenities. Overnight stay in Bentota.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Breakfast at the hotel
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Visit a tea plantation and factory
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Depart for Bentota
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Check-in at hotel and enjoy the beach or amenities
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight stay in Bentota
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 6: Bentota - Galle - Bentota
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={galle} alt="Galle Fort" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={bentota4} alt="Bentota Beach" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      After breakfast, take a day trip to Galle Fort (Optional – Entrance Fee Applies), a UNESCO World Heritage Site and one of Sri Lanka's best-preserved colonial fortifications. Walk through its cobbled streets, explore the old ramparts, and enjoy the historic architecture reflecting Dutch, Portuguese, and British influences. After exploring Galle, return to Bentota for a relaxing evening by the beach. Overnight stay in Bentota.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Breakfast at the hotel
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Day trip to Galle Fort (Optional – Entrance Fee Applies)
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Walk through cobbled streets and explore ramparts
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Return to Bentota for a relaxing evening by the beach
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight stay in Bentota
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 7: Bentota - Colombo - Departure
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={colomboshop} alt="Colombo City" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={airportImage} alt="Bandaranaike International Airport" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      On the final day, after breakfast, depart for Colombo. Experience a city tour of Sri Lanka’s bustling capital, visiting key landmarks such as the Gangaramaya Temple, Beira Lake, and the National Museum, which houses a rich collection of artifacts illustrating Sri Lanka’s history. Depending on your flight schedule, enjoy some last-minute shopping at local markets or modern malls such as Crescat Boulevard or One Galle Face Mall before being transferred to Bandaranaike International Airport for your departure.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Breakfast at the hotel
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Depart for Colombo
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        City tour: Gangaramaya Temple, Beira Lake, National Museum
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Last-minute shopping at local markets or malls
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

          {/* Negombo Hotels */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ 
              mb: 3,
              color: '#3498db',
              borderLeft: '4px solid #3498db',
              pl: 2,
              fontWeight: 600
            }}>
              Negombo
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  name: 'Hotel Cloud 9 Negombo',
                  link: 'https://www.booking.com/hotel/lk/cloud-nine-negombo.html',
                },
                {
                  name: 'Serendib Village Guest House',
                  link: 'https://serendibvillage.com/',
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

          {/* Dambulla Hotels */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ 
              mb: 3,
              color: '#3498db',
              borderLeft: '4px solid #3498db',
              pl: 2,
              fontWeight: 600
            }}>
              Dambulla
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  name: 'Athena Lake by Seedevi',
                  link: 'https://athenalake.com/',
                },
                {
                  name: 'Liyya Water Villas',
                  link: 'https://liyyawatervillas.com-srilanka.com/',
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
                  name: 'Queen’s Hotel',
                  link: 'http://www.queenshotel.lk',
                },
                {
                  name: 'Oriole Kandy Hotel',
                  link: 'https://oriole.kandy-hotels.com/en/',
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

          {/* Nuwara Eliya Hotels */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ 
              mb: 3,
              color: '#3498db',
              borderLeft: '4px solid #3498db',
              pl: 2,
              fontWeight: 600
            }}>
              Nuwara Eliya
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  name: 'Dewdrops at Lake Gregory',
                  link: 'https://www.booking.com/hotel/lk/see-lake-holiday-resort.html',
                },
                {
                  name: 'Misthill Rest – Lavish Villa',
                  link: 'https://misthillrest.com/',
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

          {/* Bentota Hotels */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ 
              mb: 3,
              color: '#3498db',
              borderLeft: '4px solid #3498db',
              pl: 2,
              fontWeight: 600
            }}>
              Bentota
            </Typography>
            <Grid container spacing={3}>
              {[
                {
                  name: 'Villa 80',
                  link: 'https://villa80.com/',
                },
                {
                  name: 'Lagoon Bentota Resort',
                  link: 'https://lagoonbenthotaresort.com/',
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

export default GemOfSriLankaPage;
