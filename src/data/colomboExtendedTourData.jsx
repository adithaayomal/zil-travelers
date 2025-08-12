import {
  DirectionsCar as CarIcon,
  Hotel as HotelIcon,
  Restaurant as MealIcon,
  Tour as TourIcon,
  EventAvailable as EventAvailableIcon
} from '@mui/icons-material';

const colomboExtendedTourData = {
  name: 'COLOMBO EXTENDED TOUR',
  alternativeTourDetails: {
    availabilityDateRange: '01.11.2024-30.04.2025',
    title: 'COLOMBO EXTENDED TOUR',
    type: 'Individual tour',
    duration: 'X Nights/Y Days', // Placeholder, user didn't specify
    mealPlan: 'HB Nutrition' // Placeholder
  },
  images: [
    { url: '/src/assets/images/colombo.jpg', caption: 'Colombo City View' },
    { url: '/src/assets/images/kandy.jpg', caption: 'Kandy Temple' },
    { url: '/src/assets/images/sigiriya.jpg', caption: 'Sigiriya Rock Fortress' }
  ],
  description: 'Experience an extended tour covering major attractions in Sri Lanka, starting from Colombo.',
  price: 0, // Placeholder
  duration: 'X Days', // Placeholder
  groupSize: '2-12 people',
  startLocation: 'Colombo International Airport',
  highlights: [
    'Comprehensive tour of Sri Lankan attractions',

  ],
  inclusions: [
    {
      title: 'Professional Guide',
      description: 'Expert English-speaking tour guide throughout the journey',
      icon: <TourIcon />
    },
    {
      title: 'Luxury Meals',
      description: 'All meals included with authentic Sri Lankan cuisine',
      icon: <MealIcon />
    },
    {
      title: 'Private Transport',
      description: 'Air-conditioned vehicle with experienced driver',
      icon: <CarIcon />
    },
    {
      title: 'Accommodation',
      description: 'Carefully selected hotels',
      icon: <HotelIcon />
    }
  ],
  itinerary: [
    // Itinerary details can be added here if more specific information is provided
  ],
  programDescription: [
    // Program description can be added here if more specific information is provided
  ],
  attractions: [
    'Colombo city tour',
    'Pinnawala Elephant Orphanage',
    'Sigiriya Rock',
    'Dambulla cave temple',
    'Ayurvedic Spice Garden',
    'Tea plantation and factory',
    'Museum of Precious Stones',
    'Temple of the Tooth Relic in Kandy',
    'Royal Botanical Gardens Peradeniya'
  ],
  tourCalculationNote: 'The tour is calculated from Kolombo hotels to Koggala Area. After Koggala Area the surcharge for the tour is listed below.'
};

export default colomboExtendedTourData;
