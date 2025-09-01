import {
  DirectionsCar as CarIcon,
  Hotel as HotelIcon,
  Restaurant as MealIcon,
  Tour as TourIcon,
  EventAvailable as EventAvailableIcon,
  Landscape as LandscapeIcon,
  BeachAccess as BeachIcon,
  LocalActivity as ActivityIcon
} from '@mui/icons-material';

const colomboNightVibesData = {
  name: 'Island Beauty of Sri Lanka',
  detailedContent: {
    description: `Experience the best of Sri Lanka on this comprehensive 8-day journey from coastal Negombo to historic Dambulla, cultural Kandy, misty Nuwara Eliya, and beautiful Bentota beach. Discover ancient temples, wildlife sanctuaries, tea plantations, and vibrant city life.`,
    
    tourPolicies: {
      tourCalculation: 'Tour prices are calculated based on number of travelers and season.',
      childrenPolicy: {
        title: "Children's Policy",
        details: [
          'Ages 0-1.99: FREE',
          'Ages 2-11.99: 50% discount'
        ]
      },
      cancellationPolicy: {
        standardSeason: {
          title: 'Standard Season',
          dates: ['Nov 1 - Dec 19', 'Jan 11 - Apr 30'],
          terms: [
            { period: '22+ days prior', charge: 'No charge' },
            { period: '21-15 days prior', charge: '50% charge' },
            { period: '14 days or less', charge: '100% charge' }
          ]
        },
        peakSeason: {
          title: 'Peak Season',
          dates: ['Dec 20 - Jan 10'],
          terms: [
            { period: '61+ days prior', charge: 'No charge' },
            { period: '60-31 days prior', charge: '50% charge' },
            { period: '30 days or less', charge: '100% charge' }
          ]
        }
      }
    },

    pricing: {
      standardSeason: {
        dates: [
          'Nov 1, 2024 - Dec 19, 2024',
          'Jan 11, 2025 - Apr 30, 2025'
        ],
        rates: {
          single: 1020,
          double: 575,
          small: 520,
          large: 425
        }
      },
      peakSeason: {
        dates: ['Dec 20, 2024 - Jan 10, 2025'],
        rates: {
          single: 1070,
          double: 600,
          small: 540,
          large: 450
        }
      }
    },

    tourInclusions: [
      'Accommodation in hotels with breakfast and dinner',
      'Private air-conditioned vehicle',
      'English-speaking tour guide',
      'All entrance fees to sites mentioned',
      'All applicable taxes'
    ],

    tourExclusions: [
      'International flights',
      'Visa fees',
      'Personal expenses',
      'Tips and gratuities',
      'Optional activities'
    ],

    entranceFees: {
      note: 'We can exclude entrance tickets from the tour price upon request, this must be clearly stated at the time of booking/request.',
      amount: 'Entrance fees will be quoted separately based on the selected attractions.'
    }
  },
  images: {
    itinerary: {
      airport: '/src/assets/images/airport.jpg',
      pinnawala: '/src/assets/images/pinnawala.jpeg',
      sigiriya: '/src/assets/images/sigiriya.jpg',
      dambullaCave: '/src/assets/images/dambulla cave.jpg',
      toothRelic: '/src/assets/images/TempleofToothRelic.jpg',
      peradeniya: '/src/assets/images/peradeniya.jpg'
    }
  },
  description: 'Experience the best of Sri Lanka on this comprehensive 8-day journey from coastal Negombo to historic Dambulla, cultural Kandy, misty Nuwara Eliya, and beautiful Bentota beach. Discover ancient temples, wildlife sanctuaries, tea plantations, and vibrant city life.',
  price: 1299,
  duration: '4 Days',
  groupSize: '2-12 people',
  startLocation: 'Pinnawala | Sigiriya | Peradeniya',
  highlights: [
    'Airport pickup and personalized welcome',
    'Negombo beach exploration',

  ],
  inclusions: [
    {
      title: 'Professional Guide',
      description: 'English-speaking tour guide and personal chauffeur throughout the journey',
      icon: <TourIcon />
    },
    {
      title: 'Luxury Accommodation',
      description: '7 nights in carefully selected hotels with breakfast',
      icon: <HotelIcon />
    },
    {
      title: 'Private Transport',
      description: 'Comfortable air-conditioned vehicle for all transfers',
      icon: <CarIcon />
    },
    {
      title: 'Daily Breakfast',
      description: 'Breakfast included at all hotels',
      icon: <MealIcon />
    },
    {
      title: 'Sightseeing Tours',
      description: 'All mentioned sightseeing and city tours',
      icon: <LandscapeIcon />
    },
    {
      title: 'Beach Activities',
      description: 'Beach and water activities in Negombo and Bentota',
      icon: <BeachIcon />
    }
  ],
  itinerary: [
    {
      day: 1,
      title: 'Bandaranaike International Airport to Negombo',
      description: '10km – 15 minutes approx.',
      activities: [
        'Meet on arrival at Bandaranaike International Airport by Walkers Tours representative',
        'Luggage assistance and introduction to personal chauffeur',
        'Transfer from Bandaranaike International Airport to Negombo',
        'Check-in at the hotel in Negombo',
        'Evening visit to Negombo Beach',
        'Rest & enjoy your stay at the hotel',
        'Overnight stay at the hotel'
      ]
    },
    {
      day: 2,
      title: 'Negombo to Dambulla via Pinnawala',
      description: 'Explore wildlife and ancient heritage',
      activities: [
        'Breakfast at hotel',
        'Visit Pinnawala Elephant Orphanage',
        'Explore Dambulla Rock Temple',
        'Check-in at Dambulla hotel',
        'Overnight stay in Dambulla'
      ]
    },
    {
      day: 3,
      title: 'Dambulla Exploration',
      description: 'Discover ancient wonders and wildlife',
      activities: [
        'Breakfast at hotel',
        'Climb Sigiriya Rock Fortress',
        'Minneriya National Park safari',
        'Return to Dambulla hotel',
        'Overnight stay in Dambulla'
      ]
    },
    {
      day: 4,
      title: 'Dambulla to Kandy',
      description: 'Journey to the cultural capital',
      activities: [
        'Breakfast at hotel',
        'Visit Matale Spice Garden',
        'Kandy city tour',
        'Visit Kandy Viewpoint',
        'Gem museum visit',
        'Overnight stay in Kandy'
      ]
    },
    {
      day: 5,
      title: 'Kandy to Nuwara Eliya',
      description: 'Explore the hill country',
      activities: [
        'Breakfast at hotel',
        'Visit Royal Botanical Gardens',
        'Drive to Nuwara Eliya',
        'City tour and Lake Gregory visit',
        'Overnight in Nuwara Eliya'
      ]
    },
    {
      day: 6,
      title: 'Nuwara Eliya to Bentota',
      description: 'Tea country to beach paradise',
      activities: [
        'Breakfast at hotel',
        'Tea plantation and factory visit',
        'Optional white water rafting at Kitulgala',
        'Transfer to Bentota',
        'Overnight stay in Bentota'
      ]
    },
    {
      day: 7,
      title: 'Bentota Beach Day',
      description: 'Coastal exploration and wildlife',
      activities: [
        'Breakfast at hotel',
        'Visit Kosgoda turtle hatchery',
        'Madu River cruise in Balapitiya',
        'Free time at Bentota Beach',
        'Overnight stay in Bentota'
      ]
    },
    {
      day: 8,
      title: 'Bentota to Colombo Airport',
      description: 'Final day in paradise',
      activities: [
        'Breakfast at hotel',
        'Colombo city tour',
        'Shopping at premier malls',
        'Visit Gangaramaya Temple',
        'Transfer to airport for departure'
      ]
    }
  ],

  hotels: {
    sigiriyaRegion: {
      title: 'Sigiriya - Dambulla - Habarana',
      properties: [
        {
          name: 'Danawwa Resort',
          link: 'https://www.danawwaresort.com/',
          rating: 3
        },
        {
          name: 'Sigiriya Village',
          link: 'https://www.colomboforthotels.com/sigiriya-village/',
          rating: 3
        },
        {
          name: 'Pelwehera Village Resort',
          link: 'https://sites.google.com/view/pelwehera-village-resort/',
          rating: 3
        }
      ]
    },
    kandyRegion: {
      title: 'Kandy',
      properties: [
        {
          name: 'Oakray Regency',
          link: 'https://www.oakrayhotels.com/oak-ray-regency/',
          rating: 3
        },
        {
          name: 'Oakray Serene Garden',
          link: 'https://www.oakrayhotels.com/serenegarden/',
          rating: 3
        }
      ]
    },
    colomboRegion: {
      title: 'Colombo',
      properties: [
        {
          name: 'Fairway Colombo',
          link: 'https://www.fairwaycolombo.com',
          rating: 3
        },
        {
          name: 'Ramada Colombo',
          link: 'https://www.wyndhamhotels.com/',
          rating: 3
        },
        {
          name: 'Mandarina Colombo',
          link: 'https://www.mandarinacolombo.com',
          rating: 3
        }
      ]
    }
  },

  tourNote: '*Note: Your guide reserves the right to change the order of visiting places according to the excursion program.'
};

export default colomboNightVibesData;
