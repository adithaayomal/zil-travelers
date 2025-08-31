import { useState } from 'react';
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
  Rating
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Shield as ShieldIcon,
  MonetizationOn as MoneyIcon,
  Timer as TimerIcon,
  Favorite as HeartIcon,
  Place as PlaceIcon,
  LocalOffer as LocalOfferIcon
} from '@mui/icons-material';
import Slideshow from '../components/home/Slideshow';
import colomboImage from '../assets/images/colombo.jpg';
import colombo2Image from '../assets/images/colombo2.jpg';
import talesOfThePeakData from '../data/talesOfThePeakData';
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

// Sample destinations data
const featuredDestinations = [
  {
    id: 'gem-of-srilanka',
    name: '4-Day Gem of Sri Lanka Tour',
    description: 'Experience the stunning highlights of Sri Lanka with our carefully curated tour covering iconic destinations',
    location: 'Colombo, Sri Lanka',
    price: 299,
    rating: 4.5,
    imageUrl: colomboImage
  },
  {
    id: 'colombo-night-vibes',
    name: 'Colombo Night Vibes Tour',
    description: 'Explore the vibrant nightlife of Colombo with local street food and cultural performances',
    location: 'Colombo, Sri Lanka',
    price: 199,
    rating: 4.8,
    imageUrl: colombo2Image
  },
 {
    id: 'tales-of-the-peak',
    name: talesOfThePeakData.name,
    price: talesOfThePeakData.price,
    duration: talesOfThePeakData.duration,
    location: talesOfThePeakData.startLocation,
    imageUrl: talesOfThePeakData.images?.itinerary?.sigiriya || colomboImage,
    rating: 4.7,
    tags: talesOfThePeakData.highlights
  }
];

const HomePage = () => {
  const [destinations] = useState(featuredDestinations);

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

      {/* Popular Destinations Section */}
      <Box sx={{ background: '#f8f9fa', py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <SectionTitle variant="h3" align="center" sx={{ fontSize: { xs: '2rem', md: '3rem' } }}>
            Popular Tours
          </SectionTitle>
          <Grid container spacing={4} justifyContent="center">
            {destinations.map((destination) => (
              <Grid item xs={12} sm={6} md={4} key={destination.id}>
                <DestinationCard 
                  component={Link} 
                  to={`/tours/${destination.id}`} 
                  sx={{ 
                    textDecoration: 'none',
                    maxWidth: { xs: '100%', sm: 340 },
                    mx: 'auto'
                  }}
                >
                  <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                    <CardMedia
                      component="img"
                      height="280"
                      image={destination.imageUrl}
                      alt={destination.name}
                    />
                    <PriceTag>
                      <LocalOfferIcon sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'text-bottom' }} />
                      From ${destination.price}
                    </PriceTag>
                  </Box>
                  <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
                    <Typography 
                      gutterBottom 
                      variant="h6" 
                      component="h2" 
                      color="primary"
                      sx={{ fontSize: { xs: '1.1rem', sm: '1.25rem' }, fontWeight: 600 }}
                    >
                      {destination.name}
                    </Typography>
                    <Box display="flex" alignItems="center" mb={1}>
                      <PlaceIcon sx={{ color: 'text.secondary', mr: 1, fontSize: 18 }} />
                      <Typography variant="body2" color="text.secondary">
                        {destination.location}
                      </Typography>
                    </Box>
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      paragraph
                      sx={{ 
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        display: '-webkit-box',
                        overflow: 'hidden',
                        WebkitBoxOrient: 'vertical',
                        WebkitLineClamp: 3
                      }}
                    >
                      {destination.description}
                    </Typography>
                    <Box display="flex" alignItems="center" justifyContent="space-between">
                      <Rating value={destination.rating} precision={0.5} size="small" readOnly />
                      <Typography variant="body2" color="text.secondary">
                        ({destination.rating}/5)
                      </Typography>
                    </Box>
                  </CardContent>
                </DestinationCard>
              </Grid>
            ))}
          </Grid>
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
            to="/tours"
            variant="contained"
            size="large"
            sx={{
              background: 'white',
              color: '#3498db',
              px: { xs: 3, md: 4 },
              py: { xs: 1.5, md: 2 },
              fontSize: { xs: '1rem', md: '1.1rem' },
              fontWeight: 600,
              borderRadius: 3,
              boxShadow: '0 6px 20px rgba(0,0,0,0.1)',
              '&:hover': {
                background: 'rgba(255,255,255,0.9)',
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
              }
            }}
          >
            Explore All Destinations
          </Button>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
