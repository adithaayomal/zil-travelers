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
  paddingTop: theme.spacing(0), // reduced from 12
  paddingBottom: theme.spacing(8), // slightly reduced
}));

const HeaderSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(8),
  maxWidth: '800px',
  margin: '0 auto',
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


// Diagonal split destination card
const DiagonalDestination = ({ destination, reverse }) => {
  // reverse: if true, image is right, info is left
  // Invert the diagonal: bottom left to top right
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: reverse ? 'row-reverse' : 'row',
        minHeight: { xs: 220, md: 400 },
        width: '100vw',
        maxWidth: '100vw',
        mb: { xs: 4, md: 8 },
        position: 'relative',
        boxShadow: 'none',
        borderRadius: 'none',
        overflow: 'hidden',
        background: '#fff',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
        p: { xs: 0, md:0 },
      }}
    >
      {/* Image side */}
      <Box
        sx={{
          flex: '0 0 70%',
          minWidth: 0,
          position: 'relative',
          clipPath: reverse
            ? 'polygon(0 100%, 100% 100%, 100% 0, 20% 0)'
            : 'polygon(0 100%, 100% 100%, 80% 0, 0 0)',
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
            height: { xs: 220, md: 600 },
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </Box>
      {/* Info side */}
      <Box
        sx={{
          flex: '0 0 30%',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: reverse ? 'flex-start' : 'flex-end',
          px: { xs: 2, md: 8 },
          py: { xs: 2, md: 8 },
          textAlign: reverse ? 'left' : 'right',
          background: 'rgba(255,255,255,0.97)',
          position: 'relative',
          zIndex: 2,
          height: '100%',
          boxSizing: 'border-box',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 2, lineHeight: 1.2 }}>
          {destination.name}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <PlaceIcon color="primary" sx={{ fontSize: 18}} />
          <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: 16 }}>
            {destination.location}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
          <StarIcon sx={{ color: 'gold', fontSize: 18 }} />
          <Typography variant="subtitle2" color="text.secondary">
            {destination.rating}
          </Typography>
        </Box>
        <Box sx={{ mb: 0.5, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
          {destination.tags && destination.tags.slice(0, 3).map((tag) => (
            <TagChip key={tag} label={tag} size="small" />
          ))}
        </Box>
        {/* Short description or highlights */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 16 }}>
          {destination.description ||
            (destination.highlights && Array.isArray(destination.highlights)
              ? destination.highlights.slice(0, 2).join(' · ')
              : destinationsData.description)}
        </Typography>
        {destination.highlights && Array.isArray(destination.highlights) && (
          <Box sx={{ mb: 0.5 }}>
            {destination.highlights.slice(0, 2).map((h, i) => (
              <Typography key={i} variant="caption" color="text.secondary" sx={{ display: 'block', fontStyle: 'italic' }}>
                • {h}
              </Typography>
            ))}
          </Box>
        )}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 700, fontSize: 30 }}>
            From ${destination.price}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontSize: 18  }}>
            {destination.duration}
          </Typography>
        </Box>
        <Box>
          <Link to={destination.id === 'gem-of-srilanka' ? `/tours/${destination.id}` : `/tours/${destination.id}`} style={{ textDecoration: 'none' }}>
            <Box
              component="span"
              sx={{
                display: 'inline-block',
                px: 5,
                py: 1.5,
                borderRadius: 10,
                background: 'linear-gradient(135deg, #3498db 0%, #2057a7 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 14,
                boxShadow: 1,
                cursor: 'pointer',
                mt: 1,
                transition: 'background 0.2s',
                '&:hover': {
                  background: 'linear-gradient(135deg, #2057a7 0%, #3498db 100%)',
                },
              }}
            >
              See More
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
      <Container maxWidth="md" sx={{ py: 8 }}>
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
