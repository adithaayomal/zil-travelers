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

const PageWrapper = styled(Box)(({ theme }) => ({
  minHeight: '100vh',
  background: 'linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%)',
  paddingTop: theme.spacing(12),
  paddingBottom: theme.spacing(12),
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
    name: '4-Day Gem of Sri Lanka Tour',
    price: 425,
    duration: '5 Days',
    location: 'Colombo, Sri Lanka',
    imageUrl: colomboImage,
    rating: 4.5,
    tags: ['Cultural', 'City Tour', 'Architecture']
  },
  {
    id: 'colombo-night-vibes',
    name: 'Colombo Night Vibes Tour',
    price: 199,
    duration: '1 Night',
    location: 'Colombo, Sri Lanka',
    imageUrl: colombo2Image,
    rating: 4.8,
    tags: ['Night Tour', 'Food', 'Culture']
  },
  {
    id: 'colombo-extended-tour',
    name: colomboExtendedTourData.name,
    price: colomboExtendedTourData.price,
    duration: colomboExtendedTourData.duration,
    location: colomboExtendedTourData.startLocation,
    imageUrl: colomboImage, // Using colomboImage as a placeholder
    rating: 4.5, // Placeholder rating
    tags: colomboExtendedTourData.highlights // Using highlights as tags
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

const DestinationsPage = () => {
  const [destinations] = useState(destinationsData);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <PageWrapper>
      <Container maxWidth="lg">
        <HeaderSection>
          
          
        </HeaderSection>

        <Grid 
          container 
          spacing={4}
          sx={{
            padding: { xs: 2, md: 0 },
            alignItems: 'stretch'
          }}
        >
          {destinations.map((destination) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              key={destination.id}
              sx={{ display: 'flex' }}
            >
              <DestinationCard 
                component={Link} 
                to={`/destinations/${destination.id}`} 
                sx={{ 
                  textDecoration: 'none',
                  width: '100%'
                }}
              >
                <Box sx={{ position: 'relative' }}>
                  <CardMedia
                    component="img"
                    height={isMobile ? '140' : '180'}
                    image={destination.imageUrl}
                    alt={destination.name}
                    sx={{
                      objectFit: 'cover',
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      background: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '12px',
                      padding: '4px 12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <StarIcon sx={{ color: 'warning.main', fontSize: 20 }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {destination.rating}
                    </Typography>
                  </Box>
                </Box>

                <CardContent sx={{ flexGrow: 1, p: 2 }}>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                    {destination.name}
                  </Typography>
                  
                  <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <PlaceIcon color="primary" sx={{ fontSize: 20 }} />
                    <Typography variant="subtitle1" color="text.secondary">
                      {destination.location}
                    </Typography>
                  </Box>

                  <Typography variant="body1" color="text.secondary" paragraph>
                    {destination.description}
                  </Typography>

                  <Box sx={{ mt: 'auto' }}>
                    <Box sx={{ mb: 2 }}>
                      {destination.tags.map((tag) => (
                        <TagChip
                          key={tag}
                          label={tag}
                          size="small"
                        />
                      ))}
                    </Box>

                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      borderTop: 1,
                      borderColor: 'divider',
                      pt: 2
                    }}>
                      <Box>
                        <Typography variant="h6" color="primary.main" sx={{ fontWeight: 600 }}>
                          ${destination.price}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          per person
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <AccessTimeIcon color="action" sx={{ fontSize: 20 }} />
                        <Typography variant="subtitle2" color="text.secondary">
                          {destination.duration}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </CardContent>
              </DestinationCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </PageWrapper>
  );
};

export default DestinationsPage;
