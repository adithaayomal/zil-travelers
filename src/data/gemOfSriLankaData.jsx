import {
  DirectionsCar as CarIcon,
  Hotel as HotelIcon,
  Restaurant as MealIcon,
  Tour as TourIcon,
  EventAvailable as EventAvailableIcon
} from '@mui/icons-material';

const gemOfSriLankaData = {
  name: 'GEM OF SRI LANKA',
  alternativeTourDetails: {
    availabilityDateRange: 'Available',
    title: 'GEM OF SRI LANKA',
    type: 'Individual tour',
    duration: '3 Nights/4 Days',
    mealPlan: 'HB Nutrition'
  },
  images: [
    { url: '/src/assets/images/colombo.jpg', caption: 'Colombo City View' },
    { url: '/src/assets/images/kandy.jpg', caption: 'Kandy Temple' },
    { url: '/src/assets/images/sigiriya.jpg', caption: 'Sigiriya Rock Fortress' }
  ],
  description: 'Discover Colombo\'s architectural heritage through exclusive tours of Geoffrey Bawa\'s masterpieces, immerse in rich cultural experiences, and explore the city\'s blend of colonial charm and modern vibrancy with expert guides.',
  price: 425,
  duration: '4 Days',
  groupSize: '2-12 people',
  startLocation: 'Colombo International Airport',
  highlights: [
    'Architectural tour of Geoffrey Bawa designs',
    'Visit to ancient temples and cultural sites',
    'Explore Colombo\'s vibrant markets',
    'Sunset at Galle Face Green',
    'Traditional Sri Lankan cooking class'
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
      title: '4-Star Accommodation',
      description: '4 nights in carefully selected hotels',
      icon: <HotelIcon />
    }
  ],
  itinerary: [
    {
      day: 1,
      title: 'Arrival & Colombo City Tour',
      description: 'Begin your Sri Lankan adventure with a warm welcome at the airport',
      activities: [
        'Airport pickup and transfer to hotel',
        'Welcome drink and tour briefing',
        'Evening visit to Gangaramaya Temple',
        'Sunset at Galle Face Green',
        'Welcome dinner at a local restaurant'
      ]
    },
    {
      day: 2,
      title: 'Sigiriya & Dambulla',
      description: 'Explore two UNESCO World Heritage sites in one day',
      activities: [
        'Early morning drive to Sigiriya',
        'Climb the ancient rock fortress',
        'Guided tour of Dambulla Cave Temple',
        'Traditional village experience',
        'Evening spa treatment (optional)'
      ]
    },
    {
      day: 3,
      title: 'Kandy Cultural Tour',
      description: 'Immerse yourself in the cultural capital of Sri Lanka',
      activities: [
        'Visit to Temple of Sacred Tooth Relic',
        'Royal Botanical Gardens tour',
        'Cultural dance performance',
        'Local market exploration',
        'Tea plantation visit'
      ]
    }
  ],
  programDescription: [
    {
      day: 'Day 1',
      route: 'Colombo',
      accommodation: 'Hotel in Colombo',
      nutrition: 'Dinner'
    },
    {
      day: 'Day 2',
      route: 'Pinnawala-Sigiriya',
      accommodation: 'Hotel in Sigiriya/ Dambulla',
      nutrition: 'Breakfast + Dinner'
    },
    {
      day: 'Day 3',
      route: 'Dambulla-Matale-Kandy',
      accommodation: 'Hotel in Kandy',
      nutrition: 'Breakfast + Dinner'
    },
    {
      day: 'Day 4',
      route: 'Peradiniya to the airport',
      accommodation: 'BIA Departure',
      nutrition: ''
    }
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
  tourCalculationNote: 'The tour is calculated from Colombo hotels to Koggala Area. After Koggala Area the surcharge for the tour is listed below.'
};

export default gemOfSriLankaData;
