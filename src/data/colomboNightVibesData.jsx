import {
  DirectionsCar as CarIcon,
  Hotel as HotelIcon,
  Restaurant as MealIcon,
  Tour as TourIcon,
  EventAvailable as EventAvailableIcon
} from '@mui/icons-material';

const colomboNightVibesData = {
  name: 'Colombo Night Vibes Tour',
  images: [
    { url: '/src/assets/images/colombo2.jpg', caption: 'Colombo by Night' },
    { url: '/src/assets/images/hotel.jpg', caption: 'Luxury Hotel' }
  ],
  description: 'Explore the vibrant nightlife of Colombo with local street food, cultural performances, and scenic evening walks along the Galle Face Green.',
  price: 199,
  duration: '1 Night',
  groupSize: '2-8 people',
  startLocation: 'Your Colombo Hotel',
  highlights: [
    'Street food tasting experience',
    'Cultural performances',
    'Night market exploration',
    'Rooftop bar visit',
    'Beachside dinner'
  ],
  inclusions: [
    {
      title: 'Expert Guide',
      description: 'Local guide with extensive nightlife knowledge',
      icon: <TourIcon />
    },
    {
      title: 'Food & Drinks',
      description: 'All food tastings and welcome drink included',
      icon: <MealIcon />
    },
    {
      title: 'Luxury Transport',
      description: 'Air-conditioned vehicle for all transfers',
      icon: <CarIcon />
    },
    {
      title: 'VIP Access',
      description: 'Priority access to selected venues',
      icon: <EventAvailableIcon />
    }
  ],
  itinerary: [
    {
      day: 1,
      title: 'Evening Food & Culture Tour',
      description: 'A perfect blend of culinary and cultural experiences',
      activities: [
        'Hotel pickup at sunset',
        'Street food tasting at Galle Face Green',
        'Visit to historical Pettah Market',
        'Cultural performance viewing',
        'Rooftop dinner with city views'
      ]
    }
  ]
};

export default colomboNightVibesData;
