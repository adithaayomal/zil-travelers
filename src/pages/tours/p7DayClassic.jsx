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
                      Day 1 - Bandaranaike International Airport to Negombo 
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <StepImage src={airportImage} alt="Bandaranaike International Airport" />
                    <Typography variant="body1" color="text.secondary" paragraph>
                      You will be met on arrival at the Bandaranaike International Airport by our Walkers Tours representative who will assist you with your luggage and guide you to your vehicle where your personal chauffeur awaits.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Transfer from Bandaranaike International Airport to Negombo and check-in at the hotel. Visit Negombo Beach in the evening to enjoy the coastal atmosphere and beautiful sunset views.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Meet Walkers Tours representative at airport with luggage assistance
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Transfer to Negombo hotel and check-in
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Visit Negombo Beach in the evening
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Rest & enjoy your stay at the hotel
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight stay at the hotel
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 2 - Negombo – Pinnawala – Dambulla 
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={pinnawalaImage} alt="Pinnawala Elephant Orphanage" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={negombo} alt="Dambulla Rock Temple" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Breakfast at the hotel before leaving for Dambulla. En route, visit the Pinnawala Elephant Orphanage (Optional – Entrance Fee Applies). Pinnawala Elephant Orphanage was launched to provide shelter and nourishment to abandoned, injured and maimed elephants. The ideology behind this project revolves around the care of abandoned baby elephants, who cannot survive without their mothers.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Visit the Dambulla Rock Temple (Optional – Entrance Fee Supplement). Dambulla rock temple was built by King Walagambahu in the 1st century BC and is a World heritage site. It is the most impressive of Sri Lanka's cave temples. The complex of five caves with over 2000 sq. meters of painted walls and ceilings, is the largest area of paintings found in the world. It contains over 150 images of the Buddha of which the largest is the colossal figure of the Buddha out of rock and spanning 14 meters.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Breakfast at the hotel
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Leave for Dambulla
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        En route visit the Pinnawala Elephant Orphanage (Optional – Entrance Fee Applies)
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Visit the Dambulla Rock Temple (Optional – Entrance Fee Supplement)
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Check-in at the hotel in Dambulla
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight stay at the hotel
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 3 - Dambulla
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={sigiriyaImage} alt="Sigiriya Rock Fortress" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={dambullaCaveImage} alt="Minneriya National Park" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Have breakfast at the hotel before climbing the Sigiriya Rock Fortress (Optional – Entrance Fee Applies). Climb the 5th century rock fortress which is a world heritage site built by king Kashyapa (477-495 AD). The Lion Rock is a citadel of unusual beauty rising 200 meters from the scrub jungle. The rock was the innermost stronghold of the 70-hectare fortified town. A moat, Rampart and extensive gardens including the renowned water gardens ring the base of the rock.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Visit the world-renowned frescoes of the 'Heavenly Maidens' of Sigiriya, which are in a sheltered pocket of the rock approached by a spiral stairway. These frescoes are painted in earth pigments on plaster. Later, visit the Minneriya National Park and go on a Jeep Safari. Those who love to witness the grace and appeal of the mighty giants of the jungles-as they mingle and gather in their natural habitat-should certainly make a visit to the Minneriya National Park in Sri Lanka.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Have breakfast at the hotel
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Climb the Sigiriya Rock Fortress (Optional – Entrance Fee Applies)
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Visit the world-renowned frescoes of the 'Heavenly Maidens'
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Visit the Minneriya National Park and go on a Jeep Safari
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Return to the hotel in Dambulla
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight stay at the hotel
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 4 - Dambulla – Kandy
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={toothRelicImage} alt="Kandy City" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={peradeniyaImage} alt="Spice Garden Matale" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Have breakfast at the hotel and leave for Kandy. En Route visit the Spice Garden in Matale. Sri Lanka is famous for its spices and spices gardens. These spice gardens offer tourists memorable visits to various spice plantations in Sri Lanka. During early historical times Sri Lanka Known as Taprobane, was world renowned for its quality spices. During ancient times the Greeks, Romans and the Arabic maintained their links with Sri Lanka through the spice trade.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Commence a city tour of Kandy. Kandy is the charming hill capital of Sri Lanka and the island's second largest city. At an elevation of 465 meters above sea level, Kandy is located 129 Km North-East of Colombo. Nestling midst low hills and looped by the Mahaweli river; Kandy is the country's religious and cultural center and a World Heritage City. Visit the Kandy Viewpoint (Arthur's Seat, Kandy) to capture the picturesque view of Kandy city, and visit a Gem Lapidary in Kandy.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Have breakfast at the hotel
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Leave for Kandy
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        En Route visit the Spice Garden in Matale
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Commence a city tour of Kandy
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Visit the Kandy Viewpoint (Arthur's Seat, Kandy)
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Visit a Gem Lapidary in Kandy
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Proceed to the hotel in Kandy
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight stay at the hotel
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 5 - Kandy – Nuwara Eliya 
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={nuwaraeliya} alt="Royal Botanical Gardens Peradeniya" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={nuwaraeliya2} alt="Nuwara Eliya City" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Have breakfast at the hotel and visit the Royal Botanical Gardens in Peradeniya (Optional – Entrance Fee Supplement Given). This botanical garden was first built as a pleasure garden by a Sinhala king and was expanded by the British. It is 147 acres in extent and provides an amazing variety of trees, plants and flowers.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Leave for Nuwara Eliya and commence a city tour. Nuwara Eliya is the heart of Sri Lankan hill country, it is the home of the famous Ceylon Tea and the rolling mountains are a carpet of velvety green tea plantations, interspersed with gushing streams and tumbling waterfalls. The salubrious climate, misty glens and the decidedly British character make Nuwara Eliya a must on any Sri Lankan travel itinerary. Witness the historical landmarks and absorb its colonial heritage. Stroll around Lake Gregory and take in the serene and calming atmosphere.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Have breakfast at the hotel
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Visit the Royal Botanical Gardens in Peradeniya (Optional – Entrance Fee Supplement)
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Leave for Nuwara Eliya
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Commence a city tour of Nuwara Eliya
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Witness the historical landmarks and colonial heritage
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Stroll around Lake Gregory
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Proceed to the hotel in Nuwara Eliya and relax in the cool climate
                      </Typography>
                      <Typography component="li" variant="body1">
                        Overnight stay at the hotel
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 6 - Nuwara Eliya – Bentota 
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={bentota} alt="Tea Plantation" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={bentota2} alt="Kitulgala White Water Rafting" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Have breakfast at the Hotel and visit a Tea Plantation to see how tea is plucked and a Factory to witness the processing of the raw green leaf to the graded product. Experience the fascinating journey from plantation to your cup, learning about the world-famous Ceylon Tea production process.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Proceed to Bentota via Kitulgala to do White Water Rafting (Optional – Supplement Given). Named after the abundant sago palm (locally known as Kithul) cultivations in the area, the serenity of Kitulgala's environs could almost trick the visitors into doubting its popularity as the prime getaway for adventure sports. Leave for Bentota and check-in at the hotel to rest and enjoy your stay.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Have breakfast at the Hotel
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Visit a Tea Plantation to see tea plucking process
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Visit a Tea Factory to witness processing of raw green leaf
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Proceed to Bentota via Kitulgala
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        White Water Rafting in Kitulgala (Optional – Supplement Given)
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Continue journey to Bentota
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Check-in at the hotel in Bentota
                      </Typography>
                      <Typography component="li" variant="body1">
                        Rest & enjoy your stay at the hotel - Overnight stay
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 7 - Bentota
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={bentota3} alt="Kosgoda Turtle Hatchery" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={bentota4} alt="Balapitiya River Cruise" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Have breakfast at the Hotel and visit Kosgoda turtle hatchery (Optional - Entrance Fee Applies). Kosgoda is famous for its turtle hatchery operated by the Wildlife Protection Society of Sri Lanka. Several species of turtles, especially the endangered hawksbill, is protected here. Most vulnerable of all are their eggs which are left uncovered on beaches all around the coast. These eggs are brought to the hatcheries by the fishermen. Visitors are shown the huge tanks filled with newborn but lively hatchlings.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Proceed to Balapitiya for a river cruise (Optional – Entrance Fee Applies). Balapitiya is where one could just sit back and observe how ecology and culture combine under the sun! Cut through the clear water of Madu River and head towards Kotu Duwa, the small island housing a temple that dates to ancient Sinhalese kings. Sail through tunnels of shady mangroves alongside Madu River to witness the tranquility of this bio-diversity hot spot which boasts of reptiles, mollusks and over 70 species of freshwater fish.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Have breakfast at the Hotel
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Visit the Kosgoda turtle hatchery (Optional - Entrance Fee Applies)
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Observe endangered hawksbill turtles and newborn hatchlings
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Proceed to Balapitiya for a river cruise (Optional – Entrance Fee Applies)
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Cruise through Madu River and visit Kotu Duwa temple island
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Experience mangrove tunnels and biodiversity hotspot
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Return to the hotel in Bentota
                      </Typography>
                      <Typography component="li" variant="body1">
                        Rest & enjoy your stay at the hotel - Overnight stay
                      </Typography>
                    </Box>
                  </StepContent>
                </Step>

                <Step active={true}>
                  <StepLabel>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                      Day 8 - Bentota – Colombo – Airport
                    </Typography>
                  </StepLabel>
                  <StepContent>
                    <ImageGrid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <StepImage src={airportImage} alt="Colombo City" />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <StepImage src={colomboshop} alt="Colombo Shopping" />
                      </Grid>
                    </ImageGrid>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      Breakfast at the hotel and leave for Colombo. As the vibrant capital of Sri Lanka, Colombo pulsates with the essence of our island, offering a lively mix of cultural, shopping, and dining delights. Central to the city's charm is the scenic Beira Lake, home to the tranquil Seema Malaka and nearby Gangaramaya Temples, set against the backdrop of Colombo's modern skyline.
                    </Typography>
                    <Typography variant="body1" color="text.secondary" paragraph>
                      For a journey back in time, the National Museum is a must-visit. Housed in a renovated colonial governor's mansion, it is located near the verdant Viharamahadevi Park and the historic Independence Square. Visit Shopping Centers such as Crescat Boulevard and One Galle Face Mall before departing to the airport in time for your flight out of Sri Lanka.
                    </Typography>
                    <Box component="ul" sx={{ pl: 2, mb: 2 }}>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Breakfast at the hotel
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Leave for Colombo
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Commence shopping and city tour of Colombo
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Visit Beira Lake, Seema Malaka and Gangaramaya Temples
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Explore National Museum near Viharamahadevi Park
                      </Typography>
                      <Typography component="li" variant="body1" sx={{ mb: 1 }}>
                        Shopping at Crescat Boulevard and One Galle Face Mall
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

export default GemOfSriLankaPage;
