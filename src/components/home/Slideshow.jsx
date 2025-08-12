import { useState, useEffect } from 'react';
import { Box, IconButton, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import slide1 from '../../assets/images/sigiriya.jpg';
import slide2 from '../../assets/images/kandy.jpg';
import slide3 from '../../assets/images/ella.jpg';

const SlideContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  height: '80vh',
  width: '100%',
  overflow: 'hidden',
}));

const Slide = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  opacity: 0,
  transition: 'opacity 1s ease-in-out',
  '&.active': {
    opacity: 1,
  }
}));

const SlideImage = styled('img')(({ theme }) => ({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
}));

const SlideContent = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  textAlign: 'center',
  color: 'white',
  zIndex: 2,
  width: '100%',
  padding: theme.spacing(2),
  opacity: 0,
  transition: 'all 0.8s ease',
  '.active &': {
    opacity: 1,
  }
}));

const SlideButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 2,
  color: 'white',
  background: 'rgba(0, 0, 0, 0.3)',
  '&:hover': {
    background: 'rgba(0, 0, 0, 0.5)',
  }
}));

const ExploreButton = styled(Button)(({ theme }) => ({
  position: 'absolute',
  bottom: '20%',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 2,
  background: 'linear-gradient(45deg, #3498db 30%, #2ecc71 90%)',
  borderRadius: '25px',
  border: 0,
  color: 'white',
  padding: '12px 30px',
  boxShadow: '0 3px 10px rgba(52, 152, 219, 0.3)',
  textTransform: 'none',
  fontWeight: 600,
  letterSpacing: '0.5px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateX(-50%) translateY(-2px)',
    boxShadow: '0 5px 15px rgba(52, 152, 219, 0.4)',
  }
}));

const slides = [
  {
    image: slide1,
    title: "Discover Sri Lanka's Beauty",
    subtitle: "Experience the magic of paradise"
  },
  {
    image: slide2,
    title: "Cultural Heritage Tours",
    subtitle: "Immerse in rich traditions and history"
  },
  {
    image: slide3,
    title: "Adventure Awaits",
    subtitle: "Explore breathtaking landscapes"
  }
];

const Slideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  return (
    <SlideContainer>
      {slides.map((slide, index) => (
        <Slide
          key={index}
          className={index === currentSlide ? 'active' : ''}
          sx={{
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5))',
              zIndex: 1
            }
          }}
        >
          <SlideImage src={slide.image} alt={slide.title} />
          <SlideContent>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
                mb: 2,
                fontSize: { xs: '2rem', sm: '3rem', md: '4rem' }
              }}
            >
              {slide.title}
            </Typography>
            <Typography
              variant="h5"
              sx={{
                textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                mb: 4,
                fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }
              }}
            >
              {slide.subtitle}
            </Typography>
          </SlideContent>
        </Slide>
      ))}

      <SlideButton
        onClick={handlePrevSlide}
        sx={{ left: { xs: 8, md: 24 } }}
      >
        <ChevronLeft />
      </SlideButton>
      <SlideButton
        onClick={handleNextSlide}
        sx={{ right: { xs: 8, md: 24 } }}
      >
        <ChevronRight />
      </SlideButton>

      <ExploreButton
        component={Link}
        to="/destinations"
        variant="contained"
        size="large"
      >
        Explore Tours
      </ExploreButton>
    </SlideContainer>
  );
};

export default Slideshow;
