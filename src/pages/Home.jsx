import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Rating,
  IconButton,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Shield as ShieldIcon,
  MonetizationOn as MoneyIcon,
  Timer as TimerIcon,
  Favorite as HeartIcon,
  Place as PlaceIcon,
  LocalOffer as LocalOfferIcon,
  ArrowBackIos as ArrowBackIosIcon,
  ArrowForwardIos as ArrowForwardIosIcon,
  AccessTime as AccessTimeIcon,
  Star as StarIcon
} from '@mui/icons-material';
import Slideshow from '../components/home/Slideshow';
import colomboImage from '../assets/images/colombo.jpg';
import colombo2Image from '../assets/images/colombo2.jpg';
import talesOfThePeakData from '../data/talesOfThePeakData';
import bentota from '../assets/images/bentota.jpg';


import sigiriyaImage from '../assets/images/sigiriya.jpg';
import adamsPeakImage from '../assets/images/adamspeak.jpg';

import nuwaraEliyaImage from '../assets/images/nuwaraeliya.jpg';
import yalaImage from '../assets/images/yala.jpg';
import ellaImage from '../assets/images/ella.jpg';
import wilpattuImage from '../assets/images/wilpattu.jpg';
import dambullaImage from '../assets/images/dambulla cave.jpg';
import kithulgalaImage from '../assets/images/kithulgala.jpg';
  

// Styled components
const HeroSection = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '80vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  textAlign: 'center',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0, 0, 0, 0.4)',
    zIndex: 1
  }
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4),
  textAlign: 'center',
  height: '100%',
  background: 'white',
  borderRadius: theme.shape.borderRadius,
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
  },
  '& svg': {
    fontSize: '3.5rem',
    background: 'linear-gradient(45deg, #3498db, #2ecc71)',
    borderRadius: '50%',
    padding: theme.spacing(2),
    color: 'white',
    marginBottom: theme.spacing(2),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  position: 'relative',
  marginBottom: theme.spacing(8),
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: -16,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '60px',
    height: '4px',
    background: 'linear-gradient(45deg, #3498db, #2ecc71)',
    borderRadius: '2px',
  }
}));

const PriceTag = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 20,
  right: 20,
  background: 'linear-gradient(45deg, #3498db, #2ecc71)',
  color: 'white',
  padding: '8px 15px',
  borderRadius: '20px',
  fontWeight: 'bold',
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
  zIndex: 1
}));

const DestinationCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s ease',
  borderRadius: '15px',
  overflow: 'hidden',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
  '&:hover': {
    transform: 'translateY(-10px)',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
    '& .MuiCardMedia-root': {
      transform: 'scale(1.1)',
    }
  },
  '& .MuiCardMedia-root': {
    transition: 'transform 0.6s ease',
  }
}));

const CarouselContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  overflow: 'visible', // Allow cards to be fully visible
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '30px 90px 40px 90px', // Top, left/right, bottom padding for card edges
  [theme.breakpoints.down('md')]: {
    padding: '25px 70px 35px 70px',
  },
  [theme.breakpoints.down('sm')]: {
    padding: '20px 60px 30px 60px',
  },
}));

const CarouselTrack = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(3),
  justifyContent: 'flex-start',
  willChange: 'transform', // Optimize for animations
}));

const CarouselArrow = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  color: '#3498db',
  width: 56,
  height: 56,
  zIndex: 10,
  border: '2px solid rgba(52, 152, 219, 0.2)',
  transition: 'all 0.2s ease', // Faster transition
  cursor: 'pointer',
  userSelect: 'none',
  '&:hover': {
    backgroundColor: '#3498db',
    color: '#fff',
    transform: 'translateY(-50%) scale(1.05)', // Smaller scale for smoother feel
  },
  '&:active': {
    transform: 'translateY(-50%) scale(0.95)', // Active state feedback
  },
  '&.left': {
    left: 15,
  },
  '&.right': {
    right: 15,
  },
  [theme.breakpoints.down('md')]: {
    width: 48,
    height: 48,
    '&.left': {
      left: 12,
    },
    '&.right': {
      right: 12,
    },
  },
  [theme.breakpoints.down('sm')]: {
    width: 44,
    height: 44,
    '&.left': {
      left: 10,
    },
    '&.right': {
      right: 10,
    },
  },
}));

const TourCard = styled(Card)(({ theme }) => ({
  minWidth: 320,
  maxWidth: 320,
  height: 450,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '20px',
  overflow: 'hidden',
  background: 'transparent',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(135deg, #3498db 0%, #2ecc71 100%)',
    zIndex: 1,
  },
  '&:hover': {
    transform: 'translateY(-15px)',
    '& .card-image': {
      transform: 'scale(1.08)',
    }
  },
  [theme.breakpoints.down('md')]: {
    minWidth: 300,
    maxWidth: 300,
    height: 420,
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 200,
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)',
    zIndex: 1,
  },
}));

const PriceBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 16,
  right: 16,
  background: '#fff',
  color: '#3498db',
  padding: '8px 16px',
  borderRadius: '25px',
  fontWeight: 600,
  fontSize: '0.9rem',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
  zIndex: 2,
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
}));

const RatingBadge = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 16,
  left: 16,
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  padding: '6px 12px',
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  zIndex: 2,
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.3),
  borderRadius: '20px',
  backgroundColor: 'rgba(52, 152, 219, 0.08)',
  color: '#3498db',
  border: '1px solid rgba(52, 152, 219, 0.2)',
  fontWeight: 500,
  fontSize: '0.75rem',
  height: '24px',
}));

// Tours data from Tours.jsx
const toursData = [
  {
    id: 'tales-of-the-peak',
    name: talesOfThePeakData.name,
    price: '450 - $1070',
    duration: talesOfThePeakData.duration,
    location: talesOfThePeakData.startLocation,
    imageUrl: talesOfThePeakData.images?.itinerary?.sigiriya || colomboImage,
    rating: 4.7,
    tags: ['Nature', 'Temples', 'Landscapes'],
    description: 'Explore Sri Lanka\'s legendary peaks, temples, and breathtaking landscapes in this immersive tour.'
  },
  {
    id: 'island-beauty',
    name: 'Island Beauty of Sri Lanka',
    price: '$575',
    duration: '8 Days',
    location: 'Dambulla | Kandy | Nuwara Eliya | Bentota',
    imageUrl: bentota,
    rating: 4.5,
    tags: ['Cultural', 'City Tour', 'Architecture', 'Beach'],
    description: "Discover the pristine beaches, lush landscapes, and vibrant culture of Sri Lanka's coastal regions on this unforgettable journey."
  },
  {
    id: '7-day-classic',
    name: '7 Day Classic',
    price: '$520',
    duration: '7 Days',
    location: 'Cultural Triangle | Polonnaruwa | Nuwara Eliya | Bentota',
    imageUrl: nuwaraEliyaImage,
    rating: 4.8,
    tags: ['Cultural', 'Architecture', 'Beach'],
    description: 'Embark on a journey through Sri Lanka\'s rich cultural heritage, stunning architecture, and beautiful beaches in this classic tour.'
  },
  {
    id: '10-day-wildlife',
    name: '10 Day Wildlife and Beach Adventure',
    price: '$680',
    duration: '10 Days',
    location: 'Wilpattu | Yala | Cultural Triangle',
    imageUrl: wilpattuImage,
    rating: 4.8,
    tags: ['Architecture', 'Adventure', 'Culture'],
    description: 'Embark on a thrilling journey through Sri Lanka\'s diverse wildlife and stunning landscapes in this unforgettable tour.'
  },
  {
    id: '12-day-cultural',
    name: '12 Day Wild Life and Cultural Adventure',
    price: '$850',
    duration: '12 Days',
    location: 'Ella | Arugam Bay | Yala | Adam\'s Peak',
    imageUrl: kithulgalaImage,
    rating: 4.8,
    tags: ['Culture', 'Rafting', 'Adventure'],
    description: 'Experience the ultimate cultural and adventure tour with wildlife safaris, cultural sites, and thrilling activities.'
  },
];

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [tours] = useState(toursData);
  const [isAnimating, setIsAnimating] = useState(false);
  const [enableTransition, setEnableTransition] = useState(true);
  
  // Responsive slides per view - 1 on mobile, 3 on desktop
  const getSlidesPerView = () => {
    if (window.innerWidth < 768) return 1; // Mobile: 1 card
    return 3; // Desktop/Tablet: 3 cards
  };
  
  const [slidesPerView, setSlidesPerView] = useState(getSlidesPerView());
  
  React.useEffect(() => {
    const handleResize = () => {
      setSlidesPerView(getSlidesPerView());
      setCurrentSlide(0); // Reset to first slide on resize
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth infinite loop navigation with throttling
  const nextSlide = () => {
    if (isAnimating) return; // Prevent rapid clicks
    setIsAnimating(true);
    setCurrentSlide(prev => prev + 1);
    
    // Reset animation lock after transition
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevSlide = () => {
    if (isAnimating) return; // Prevent rapid clicks
    setIsAnimating(true);
    setCurrentSlide(prev => prev - 1);
    
    // Reset animation lock after transition
    setTimeout(() => setIsAnimating(false), 300);
  };

  // Reset position when getting too far from center for seamless infinite loop
  React.useEffect(() => {
    if (Math.abs(currentSlide) > tours.length) {
      // Disable transition for seamless reset
      setEnableTransition(false);
      
      // Reset to equivalent position closer to center
      const resetPosition = currentSlide > 0 ? 
        currentSlide - tours.length : 
        currentSlide + tours.length;
      
      setCurrentSlide(resetPosition);
      
      // Re-enable transitions after a brief delay
      setTimeout(() => setEnableTransition(true), 50);
    }
  }, [currentSlide, tours.length]);

  // Efficient infinite array - only create what we need for smooth infinite scrolling
  const getVisibleTours = () => {
    const extendedTours = [];
    const bufferSize = 20; // Larger buffer for true infinite scrolling
    
    for (let i = -bufferSize; i < tours.length + bufferSize; i++) {
      const tourIndex = ((i % tours.length) + tours.length) % tours.length;
      extendedTours.push({
        ...tours[tourIndex],
        uniqueKey: `${tours[tourIndex].id}-${i}`
      });
    }
    return extendedTours;
  };

  const visibleTours = getVisibleTours();
  const bufferOffset = 20; // Match the buffer size

  const getCardWidth = () => {
    return slidesPerView === 1 ? 300 : 320;
  };

  const getCardGap = () => {
    return slidesPerView === 1 ? 20 : 24;
  };

  const TourCardComponent = ({ tour }) => (
    <TourCard sx={{ minWidth: getCardWidth() }}>
      <Box sx={{ position: 'relative' }}>
        <StyledCardMedia
          className="card-image"
          image={tour.imageUrl}
          title={tour.name}
          sx={{
            transition: 'transform 0.3s ease',
          }}
        />
        
        <PriceBadge className="price-badge">
          {tour.price}
        </PriceBadge>
        
        <RatingBadge>
          <StarIcon sx={{ color: '#f39c12', fontSize: 16 }} />
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50', fontSize: '0.8rem' }}>
            {tour.rating}
          </Typography>
        </RatingBadge>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          component="h3"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: '#2c3e50',
            fontSize: '1.1rem',
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {tour.name}
        </Typography>

        <Box sx={{ mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <PlaceIcon sx={{ color: '#3498db', fontSize: 14, mr: 1 }} />
            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500, fontSize: '0.75rem' }}>
              {tour.location}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon sx={{ color: '#e67e22', fontSize: 14, mr: 1 }} />
            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500, fontSize: '0.75rem' }}>
              {tour.duration}
            </Typography>
          </Box>
        </Box>

        <Typography
          variant="body2"
          sx={{
            color: '#4a5568',
            mb: 1,
            lineHeight: 1.4,
            fontSize: '0.8rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {tour.description}
        </Typography>

        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {tour.tags && tour.tags.slice(0, 2).map((tag) => (
            <StyledChip key={tag} label={tag} size="small" />
          ))}
        </Box>
        
        <Button
          component={Link}
          to={`/tours/${tour.id}`}
          variant="contained"
          size="small"
          sx={{
            background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
            color: '#fff',
            textTransform: 'none',
            fontWeight: 600,
            borderRadius: '25px',
            fontSize: '0.8rem',
            px: 2,
            py: 0.5,
            '&:hover': {
              background: 'linear-gradient(135deg, #32a8f7ff 0%, #3498db 100%)',
              transform: 'translateY(-1px)',
            }
          }}
        >
          Explore Tour
        </Button>
      </CardContent>
    </TourCard>
  );

  return (
    <Box sx={{ minHeight: '100vh' }}>
      <HeroSection>
        <Slideshow />
      </HeroSection>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 10 } }}>
        <SectionTitle variant="h3" align="center" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
          Why Choose Zil Travelers
        </SectionTitle>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard>
              <ShieldIcon />
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                Safe Travel
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                Your safety is our top priority with trusted partners and experienced guides
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard>
              <MoneyIcon />
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                Best Price
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                Unbeatable prices and exclusive deals for unforgettable experiences
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard>
              <TimerIcon />
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                Quick Support
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                24/7 dedicated support for all your travel needs
              </Typography>
            </FeatureCard>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FeatureCard>
              <HeartIcon />
              <Typography variant="h6" gutterBottom sx={{ fontSize: { xs: '1.1rem', md: '1.25rem' } }}>
                Local Experience
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.875rem', md: '1rem' } }}>
                Authentic local experiences and cultural immersion
              </Typography>
            </FeatureCard>
          </Grid>
        </Grid>
      </Container>

      {/* Popular Tours Section */}
      <Box sx={{ py: { xs: 8, md: 12 }, px: { xs: 2, md: 4 } }}>
        <Container maxWidth="lg" sx={{ overflow: 'visible' }}>
          <SectionTitle variant="h3" align="center" sx={{ fontSize: { xs: '2rem', md: '3rem' }, mb: 6 }}>
            Popular Tours
          </SectionTitle>
          
          <CarouselContainer>
            <CarouselArrow 
              className="left"
              onClick={prevSlide}
            >
              <ArrowBackIosIcon />
            </CarouselArrow>
            
            <CarouselArrow 
              className="right"
              onClick={nextSlide}
            >
              <ArrowForwardIosIcon />
            </CarouselArrow>
            
            <Box sx={{ 
              overflow: 'visible', // Allow card edges to be visible
              width: '100%',
              position: 'relative',
              padding: '10px', // Additional padding around cards
              // Add clipping only on sides to prevent horizontal scroll
              clipPath: 'inset(0 0 0 0)', // No clipping, full visibility
            }}>
              <CarouselTrack 
                sx={{ 
                  transform: `translateX(-${(bufferOffset + currentSlide) * (getCardWidth() + getCardGap())}px)`,
                  width: `${visibleTours.length * (getCardWidth() + getCardGap())}px`,
                  gap: `${getCardGap()}px`,
                  transition: enableTransition ? 'transform 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)' : 'none',
                }}
              >
                {visibleTours.map((tour) => (
                  <TourCardComponent key={tour.uniqueKey} tour={tour} />
                ))}
              </CarouselTrack>
            </Box>
          </CarouselContainer>
        </Container>
      </Box>

      {/* Call to Action Section */}
      <Box 
        sx={{ 
          py: { xs: 6, md: 10 }, 
          background: 'linear-gradient(135deg, #3498db 0%, #2ecc71 100%)',
          color: 'white',
          textAlign: 'center'
        }}
      >
        <Container maxWidth="md">
          <Typography 
            variant="h3" 
            gutterBottom 
            sx={{ 
              fontWeight: 700,
              fontSize: { xs: '2rem', md: '3rem' },
              mb: { xs: 2, md: 3 }
            }}
          >
            Ready for Your Next Adventure?
          </Typography>
          <Typography 
            variant="h6" 
            paragraph 
            sx={{ 
              mb: { xs: 3, md: 4 },
              fontSize: { xs: '1.1rem', md: '1.25rem' }
            }}
          >
            Start planning your dream vacation today
          </Typography>
          <Button
            component={Link}
            to="/book"
            variant="contained"
            size="large"
            sx={{
              background: 'white',
              color: '#3498db',
              px: { xs: 3, md: 4 },
              py: { xs: 1.5, md: 2 },
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontWeight: 600,
              borderRadius: 10,
              boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
              '&:hover': {
                background: 'rgba(255,255,255,0.9)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
              }
            }}
          >
            Book Your Trip
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
