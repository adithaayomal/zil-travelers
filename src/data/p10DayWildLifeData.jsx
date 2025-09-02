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

const p10DayWildLifeData = {
  name: '10-Day Wildlife Safari & Beach Adventure',
  detailedContent: {
    description: `Embark on an exceptional 10-day Sri Lankan wildlife adventure, blending thrilling safari experiences with coastal tranquility. From the pristine wilderness of Wilpattu National Park to the vibrant marine life of southern beaches, discover Sri Lanka incredible biodiversity in its most natural settings.`,
    
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
  description: 'Embark on an exceptional 10-day Sri Lankan wildlife adventure, blending thrilling safari experiences with coastal tranquility. From the pristine wilderness of Wilpattu National Park to the vibrant marine life of southern beaches, discover Sri Lanka incredible biodiversity in its most natural settings.',
  price: 1599,
  duration: '10 Days',
  groupSize: '2-8 people',
  startLocation: 'Colombo | Kalpitiya | Wilpattu',
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
      title: 'Arrival in Colombo → Soft Landing by the Coast',
      description: 'Gentle introduction to Sri Lanka with coastal tranquility',
      activities: [
        'Upon landing at Bandaranaike International Airport, meet with Walkers Tours representative',
        'Transfer to nearby tranquil coastal spot (Kalpitiya Lagoon or Negombo)',
        'Check-in at coastal hotel and settle in',
        'Peaceful stroll by the lagoon or beach, soaking in local life',
        'Optional sunset catamaran sail across calm waters',
        'Watch the day melt into evening on tranquil waters',
        'Rest and overnight stay at coastal hotel'
      ]
    },
    {
      day: 2,
      title: 'Colombo → Wilpattu Safari',
      description: 'Journey to pristine wilderness and wildlife encounters',
      activities: [
        'Breakfast at hotel followed by scenic drive',
        'Drive through Sri Lanka verdant countryside toward Wilpattu',
        'Arrive at Wilpattu National Park',
        'Check-in at safari lodge',
        'Late afternoon safari through monsoon-fed scrublands',
        'Explore the unique Willus (natural open lakes)',
        'Search for leopards, sloth bears, elephants, and crocodiles',
        'Spot vibrant birdlife in untouched wilderness',
        'Return to lodge for dinner and overnight stay'
      ]
    },
    {
      day: 3,
      title: 'Full Safari in Wilpattu',
      description: 'Complete day of wildlife exploration and photography',
      activities: [
        'Early morning rise for full day safari exploration',
        'Enter the park for extended wildlife viewing',
        'Enjoy packed breakfast amid pristine nature',
        'Spot leopards moving stealthily through the bush',
        'Observe sloth bears scavenging in their natural habitat',
        'Photograph elephant herds gathering near waterholes',
        'Experience low visitor numbers for immersive encounters',
        'Return to lodge for relaxing evening in wilderness',
        'Overnight stay at safari lodge'
      ]
    },
    {
      day: 4,
      title: 'Safari to Cultural Triangle (Sigiriya)',
      description: 'Journey to Cultural Triangle with village experience',
      activities: [
        'Breakfast at the lodge',
        'Depart for the Cultural Triangle',
        'Rural village visit and traditional lunch',
        'Arrive in Sigiriya',
        'Sunset ascent of Lion Rock Fortress',
        'Overnight stay in Sigiriya'
      ]
    },
    {
      day: 5,
      title: 'Sigiriya → Minneriya Elephant Safari → Kandy',
      description: 'Explore Sigiriya and witness elephant gathering',
      activities: [
        'Early breakfast at hotel',
        'Climb Sigiriya Rock for frescoes and panoramic views',
        'Afternoon safari in Minneriya or Kaudulla National Park',
        'Witness the elephant gathering at waterholes',
        'Continue to Kandy for overnight stay'
      ]
    },
    {
      day: 6,
      title: 'Dambulla → Train to Hill Country',
      description: 'Optional temple visit and scenic train journey',
      activities: [
        'Optional visit to Dambulla Cave Temple',
        'Scenic train ride to Ella or Nuwara Eliya',
        'Pass tea plantations and colonial towns',
        'Arrive in hill country for sunset views',
        'Overnight stay in Ella or Nuwara Eliya'
      ]
    },
    {
      day: 7,
      title: 'Transfer to Yala Safari, Evening Drive',
      description: 'Journey to Yala for evening safari',
      activities: [
        'Journey south toward Yala National Park',
        'Check-in at safari lodge near Yala',
        'Evening safari in quieter blocks (3 or 5)',
        'Personal wildlife sightings away from crowds',
        'Experience high leopard density ecosystem',
        'Return to lodge for overnight stay under stars'
      ]
    },
    {
      day: 8,
      title: 'Full-Day Safari in Yala',
      description: 'Complete day of wildlife exploration in Yala',
      activities: [
        'Wake before dawn for full-day safari',
        'Venture through diverse terrain of Yala',
        'Search for elusive leopards and wild elephants',
        'Spot buffalo herds and myriad bird species',
        'Return to lodge for rest and relaxation',
        'Optional afternoon exploration of nearby surroundings'
      ]
    },
    {
      day: 9,
      title: 'Yala to Beach & Galle Fort',
      description: 'Historic Galle Fort and coastal experience',
      activities: [
        'Depart after breakfast for Galle Fort',
        'Walk along historic ramparts of UNESCO site',
        'Explore cobbled lanes with colonial architecture',
        'Experience fusion of Dutch, Portuguese, and local cultures',
        'Enjoy evening coastal views',
        'Check-in at beachside accommodation'
      ]
    },
    {
      day: 10,
      title: 'Leisure & Departure',
      description: 'Final relaxation and departure',
      activities: [
        'Final morning leisure time',
        'Relax on the beach or stroll through Galle streets',
        'Pick up final souvenirs and gifts',
        'Check-out from beachside accommodation',
        'Transfer to Bandaranaike International Airport for departure'
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

export default p10DayWildLifeData;
