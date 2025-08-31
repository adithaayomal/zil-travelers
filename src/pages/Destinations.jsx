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
  Rating,
  useTheme,
  Chip,
  Divider,
  useMediaQuery
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import {
  LocalOffer as LocalOfferIcon,
  Place as PlaceIcon,
  AccessTime as AccessTimeIcon,
  Star as StarIcon
} from '@mui/icons-material';
import colomboImage from '../assets/images/colombo.jpg';
import colombo2Image from '../assets/images/colombo2.jpg';
import colomboExtendedTourData from '../data/colomboExtendedTourData';
import talesOfThePeakData from '../data/talesOfThePeakData';
import pinnawalaImage from '../assets/images/pinnawala2.jpg';


const PageWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(8),
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(8),
  maxWidth: '800px',
  margin: '0 auto',
  padding: theme.spacing(4, 2),
}));

const DestinationCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 340,
  margin: '0 0',
  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows[8],
  },
}));

const TagChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
  },
}));

// Local destination data
const destinationsData = [
  {
    id: 'gem-of-srilanka',
    name: 'Gem of Sri Lanka',
    price: 425,
    duration: '4 Days',
    location: 'Colombo, Sri Lanka',
    imageUrl: pinnawalaImage,
    rating: 4.5,
    tags: ['Cultural', 'City Tour', 'Architecture'],
    description: "Discover Colombo's architectural heritage through exclusive tours of Geoffrey Bawa's masterpieces, immerse in rich cultural experiences, and explore the city's blend of colonial charm and modern vibrancy with expert guides."
    
  },
  {
    id: 'colombo-night-vibes',
    name: 'Colombo Night Vibes Tour',
    price: 199,
    duration: '1 Night',
    location: 'Colombo, Sri Lanka',
    imageUrl: colombo2Image,
    rating: 4.8,
    tags: ['Night Tour', 'Food', 'Culture'],
    description: 'Experience the energy of Colombo after dark with food, music, and local nightlife.'
  },
  {
    id: 'colombo-extended-tour',
    name: colomboExtendedTourData.name,
    price: colomboExtendedTourData.price,
    duration: colomboExtendedTourData.duration,
    location: colomboExtendedTourData.startLocation,
    imageUrl: colomboImage, // Using colomboImage as a placeholder
    rating: 4.5, // Placeholder rating
    tags: colomboExtendedTourData.highlights, // Using highlights as tags
    description: 'A comprehensive journey through Colombo’s history, markets, and colonial architecture.'
  },
  {
    id: 'tales-of-the-peak',
    name: talesOfThePeakData.name,
    price: talesOfThePeakData.price,
    duration: talesOfThePeakData.duration,
    location: talesOfThePeakData.startLocation,
    imageUrl: talesOfThePeakData.images?.itinerary?.sigiriya || colomboImage,
    rating: 4.7,
    tags: talesOfThePeakData.highlights,
    description: 'Explore Sri Lanka’s legendary peaks, temples, and breathtaking landscapes in this immersive tour.'
  }
];


// Diagonal split destination card - Mobile-First Responsive
const DiagonalDestination = ({ destination, reverse }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: reverse ? 'row-reverse' : 'row' },
        minHeight: { xs: 'auto', md: 400 },
        width: '100vw',
        maxWidth: '100vw',
        mb: { xs: 4, md: 8 },
        position: 'relative',
        boxShadow: { xs: '0 4px 20px rgba(52, 152, 219, 0.1)', md: 'none' },
        borderRadius: { xs: 2, md: 0 },
        overflow: 'hidden',
        background: '#fff',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        mx: { xs: 2, md: 0 },
      }}
    >
      {/* Image side */}
      <Box
        sx={{
          flex: { xs: 'none', md: '0 0 70%' },
          height: { xs: 200, sm: 250, md: 400 },
          minWidth: 0,
          position: 'relative',
          clipPath: { 
            xs: 'none',
            md: reverse
              ? 'polygon(0 100%, 100% 100%, 100% 0, 20% 0)'
              : 'polygon(0 100%, 100% 100%, 80% 0, 0 0)'
          },
          zIndex: 1,
          transition: 'clip-path 0.3s',
        }}
      >
        <Box
          component="img"
          src={destination.imageUrl}
          alt={destination.name}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Box>
      
      {/* Info side */}
      <Box
        sx={{
          flex: { xs: 'none', md: '0 0 30%' },
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: { xs: 'flex-start', md: reverse ? 'flex-start' : 'flex-end' },
          px: { xs: 3, sm: 4, md: 8 },
          py: { xs: 3, sm: 4, md: 8 },
          textAlign: { xs: 'left', md: reverse ? 'left' : 'right' },
          background: 'rgba(255,255,255,0.97)',
          position: 'relative',
          zIndex: 2,
          height: 'auto',
          boxSizing: 'border-box',
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            mb: 2, 
            lineHeight: 1.2,
            fontSize: { xs: '1.75rem', sm: '2rem', md: '2.5rem' }
          }}
        >
          {destination.name}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <PlaceIcon color="primary" sx={{ fontSize: 18}} />
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: { xs: 14, md: 16 } }}>
            {destination.location}
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
          <StarIcon sx={{ color: 'gold', fontSize: 18 }} />
          <Typography variant="subtitle2" color="text.secondary">
            {destination.rating}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {destination.tags && destination.tags.slice(0, 3).map((tag) => (
            <TagChip key={tag} label={tag} size="small" />
          ))}
        </Box>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2, 
            overflow: 'hidden', 
            textOverflow: 'ellipsis', 
            fontSize: { xs: 14, md: 16 },
            lineHeight: 1.5
          }}
        >
          {destination.description ||
            (destination.highlights && Array.isArray(destination.highlights)
              ? destination.highlights.slice(0, 2).join(' · ')
              : 'Discover the beauty and culture of Sri Lanka')}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3, flexWrap: 'wrap' }}>
          <Typography 
            variant="subtitle2" 
            color="primary.main" 
            sx={{ 
              fontWeight: 700, 
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.2rem' }
            }}
          >
            From ${destination.price}
          </Typography>
          <Typography 
            variant="caption" 
            color="text.secondary" 
            sx={{ fontSize: { xs: 14, md: 18 } }}
          >
            {destination.duration}
          </Typography>
        </Box>
        
        <Box>
          <Link 
            to={destination.id === 'gem-of-srilanka' ? `/tours/${destination.id}` : `/tours/${destination.id}`} 
            style={{ textDecoration: 'none' }}
          >
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                px: { xs: 3, md: 5 },
                py: { xs: 1, md: 1.5 },
                borderRadius: 10,
                background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: { xs: 12, md: 14 },
                boxShadow: '0 4px 16px rgba(52, 152, 219, 0.3)',
                cursor: 'pointer',
                mt: 1,
                transition: 'all 0.3s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #2057a7 0%, #3498db 100%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(52, 152, 219, 0.4)',
                },
              }}
            >
              Explore Tour
            </Box>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

const DestinationsPage = () => {
  const [destinations] = useState(destinationsData);
  
  return (
    <PageWrapper>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <HeaderSection>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 700,
              mb: 3,
              background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2rem', md: '3rem' }
            }}
          >
            Explore Sri Lanka
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              color: 'text.secondary',
              mb: 4,
              fontSize: { xs: '1rem', md: '1.25rem' },
              lineHeight: 1.6
            }}
          >
            Discover the wonders of the Pearl of the Indian Ocean through our carefully crafted tours
          </Typography>
        </HeaderSection>
      </Container>
      
      <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
        {destinations.map((destination, idx) => (
          <DiagonalDestination
            key={destination.id}
            destination={destination}
            reverse={idx % 2 === 1}
          />
        ))}
      </Container>
    </PageWrapper>
  );
};

export default DestinationsPage;
