import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  useTheme,
  Chip,
  useMediaQuery,
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Rating
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  Place as PlaceIcon,
  AccessTime as AccessTimeIcon,
  Star as StarIcon,
  ArrowForward as ArrowForwardIcon,
  LocalOffer as LocalOfferIcon
} from '@mui/icons-material';
import colomboImage from '../assets/images/colombo.jpg';
import colombo2Image from '../assets/images/colombo2.jpg';
  
import talesOfThePeakData from '../data/talesOfThePeakData';
import bentota from '../assets/images/bentota.jpg';



const PageWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 25%, #ffffff 100%)',
  position: 'relative',
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(8),
  maxWidth: '800px',
  margin: '0 auto',
  position: 'relative',
  zIndex: 1,
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(4),
}));

const StyledChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.3),
  borderRadius: '20px',
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  color: theme.palette.primary.main,
  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
  fontWeight: 500,
  fontSize: '0.75rem',
  height: '28px',
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
    transform: 'translateY(-1px)',
    boxShadow: `0 4px 8px ${alpha(theme.palette.primary.main, 0.2)}`,
  },
  transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const ProfessionalButton = styled(Button)(({ theme }) => ({
  borderRadius: '50px',
  padding: '12px 32px',
  fontSize: '0.95rem',
  fontWeight: 600,
  textTransform: 'none',
  background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
  color: '#ffffff',
  boxShadow: '0 4px 20px rgba(0, 29, 48, 0.3)',
  border: 'none',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
    transition: 'left 0.5s',
  },
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 30px rgba(52, 152, 219, 0.4)',
    background: 'linear-gradient(135deg, #2980b9 0%, #3498db 100%)',
    '&::before': {
      left: '100%',
    },
  },
  '&:active': {
    transform: 'translateY(0px)',
  },
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
}));

const ProfessionalCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '20px',
  overflow: 'hidden',
  boxShadow: '0 8px 40px rgba(0, 0, 0, 0.12)',
  background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
  border: '1px solid rgba(255, 255, 255, 0.8)',
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
    transform: 'translateY(-10px)',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.25)',
    '& .card-image': {
      transform: 'scale(1.05)',
    }
  },
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 280,
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
  color: 'black',
  padding: '8px 16px',
  borderRadius: '25px',
  fontWeight: 500,
  fontSize: '1.1rem',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.3)',
  zIndex: 2,
  backdropFilter: 'blur(10px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  transition: 'all 0.3s ease',
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

// Local destination data
const destinationsData = [
  {
    id: 'tales-of-the-peak',
    name: talesOfThePeakData.name,
    price: '450 - $1070',
    duration: talesOfThePeakData.duration,
    location: talesOfThePeakData.startLocation,
    imageUrl: talesOfThePeakData.images?.itinerary?.sigiriya || colomboImage,
    rating: 4.7,
    tags: ['Nature','Temples','Landsapes'],
    description: 'Explore Sri Lanka’s legendary peaks, temples, and breathtaking landscapes in this immersive tour.'
  },
  {
    id: 'island-beauty',
    name: 'Island Beauty of Sri Lanka',
    price: 0,
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
    price: 0,
    duration: '7 Days',
    location: 'Cultural Triangle | Polonnaruwa | Nuwara Eliya | Bentota',
    imageUrl: colombo2Image,
    rating: 4.8,
    tags: ['Cultural', 'Architecture', 'Beach'],
    description: 'Embark on a journey through Sri Lanka’s rich cultural heritage, stunning architecture, and beautiful beaches in this classic tour.'
  },

  
  {
    id: '10-day-wild-life-and-beach-adventure',
    name: '10 Day Wild Life and Beach Adventure',
    price: 0,
    duration: '10 Days',
    location: 'Wilpattu | Yala | Cultural Triangle',
    imageUrl: talesOfThePeakData.images?.itinerary?.sigiriya || colomboImage,
    rating: 4.8,
    tags: ['Architecture', 'Adventure', 'Culture'],
    description: 'Embark on a thrilling journey through Sri Lanka’s diverse wildlife and stunning landscapes in this unforgettable tour.'
  },
  {
    id: '12-day-wild-life-and-cultural-adventure',
    name: '12 Day Wild Life and Cultural Adventure',
    price: 0,
    duration: '12 Days',
    location: 'Ella | Arugam Bay | Yala | Adam\'s Peak',
    imageUrl: colombo2Image,
    rating: 4.8,
    tags: ['Culture', 'Rafting', 'Adventure'],
    description: 'Experience the energy of Colombo after dark with food, music, and local nightlife.'
  },
];


// Professional Tour Card Component
const TourCard = ({ destination }) => {
  const theme = useTheme();
  
  return (
    <ProfessionalCard>
      <Box sx={{ position: 'relative' }}>
        <StyledCardMedia
          className="card-image"
          image={destination.imageUrl}
          title={destination.name}
          sx={{
            transition: 'transform 0.3s ease',
          }}
        />
        
        <PriceBadge className="price-badge">
          ${destination.price}
        </PriceBadge>
        
        <RatingBadge>
          <StarIcon sx={{ color: '#f39c12', fontSize: 18 }} />
          <Typography variant="body2" sx={{ fontWeight: 600, color: '#2c3e50' }}>
            {destination.rating}
          </Typography>
        </RatingBadge>
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        {/* Category Chip */}
        <Box sx={{ mb: 1.5 }}>
          <Chip
            label="Featured Tour"
            size="small"
            sx={{
              background: 'linear-gradient(135deg, #e8f5e8 0%, #f0f8f0 100%)',
              color: '#2e7d32',
              fontWeight: 600,
              border: '1px solid #81c784',
              borderRadius: '15px',
            }}
          />
        </Box>

        {/* Tour Title */}
        <Typography
          variant="h5"
          component="h3"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            color: '#2c3e50',
            fontSize: { xs: '1.1rem', md: '1.3rem' },
            lineHeight: 1.3,
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {destination.name}
        </Typography>

        {/* Location and Duration */}
        <Box sx={{ mb: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
            <PlaceIcon sx={{ color: '#3498db', fontSize: 16, mr: 1 }} />
            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500, fontSize: '0.85rem' }}>
              {destination.location}
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon sx={{ color: '#e67e22', fontSize: 16, mr: 1 }} />
            <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500, fontSize: '0.85rem' }}>
              {destination.duration}
            </Typography>
          </Box>
        </Box>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            color: '#4a5568',
            mb: 1.5,
            lineHeight: 1.5,
            fontSize: '0.9rem',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {destination.description}
        </Typography>

        {/* Tags */}
        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {destination.tags && destination.tags.slice(0, 3).map((tag) => (
            <StyledChip key={tag} label={tag} size="small" />
          ))}
        </Box>
      </CardContent>

      <CardActions sx={{ p: 2, pt: 0 }}>
        <ProfessionalButton
          component={Link}
          to={`/tours/${destination.id}`}
          fullWidth
          endIcon={<ArrowForwardIcon />}
          size="large"
        >
          Explore Tour
        </ProfessionalButton>
      </CardActions>
    </ProfessionalCard>
  );
};

const DestinationsPage = () => {
  const [destinations] = useState(destinationsData);
  const theme = useTheme();

  return (
    <PageWrapper>
      {/* Professional Header Section */}
      <HeaderSection>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            sx={{
              
              mb: 2,
              
            }}
          >
           Pick Your Tour
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
          <Typography
            variant="body1"
            sx={{
              color: '#718096',
              textAlign: 'center',
              fontSize: '1rem',
              margin: '0 auto',
            }}
          >
            From ancient temples to pristine beaches, experience the magic of Sri Lanka with our carefully curated tours
          </Typography>
        </Container>
      </HeaderSection>

      {/* Professional Card Grid Layout */}
      <Container 
        maxWidth="lg" 
        sx={{ 
          pb: 8,
          background: 'transparent !important',
          backgroundColor: 'transparent !important',
          backgroundImage: 'none !important',
          px: { xs: 2, md: 4 },
          '&.MuiContainer-root': {
            background: 'transparent !important',
            backgroundColor: 'transparent !important',
          }
        }}
      >
        <Grid container spacing={3}>
          
          {destinations.map((destination) => (
            <Grid item xs={12} sm={6} lg={4} key={destination.id}>
              <TourCard destination={destination} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Call to Action Section */}
      <Container maxWidth="lg" sx={{ textAlign: 'center', py: 8, mt: 4 }}>
        <Box
          sx={{
            background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.1) 0%, rgba(46, 204, 113, 0.1) 100%)',
            borderRadius: '24px',
            padding: { xs: 4, md: 6 },
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: '#2c3e50',
              mb: 2,
              fontSize: { xs: '1.8rem', md: '2.2rem' },
            }}
          >
            Ready for Your Adventure?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#64748b',
              mb: 4,
              fontSize: '1.1rem',
              maxWidth: '500px',
              margin: '0 auto 2rem auto',
            }}
          >
            Let us create a personalized journey that matches your dreams and preferences
          </Typography>
          <ProfessionalButton
            component={Link}
            to="/contact"
            size="large"
            endIcon={<ArrowForwardIcon />}
          >
            Plan Your Custom Tour
          </ProfessionalButton>
        </Box>
      </Container>
    </PageWrapper>
  );
};

export default DestinationsPage;
