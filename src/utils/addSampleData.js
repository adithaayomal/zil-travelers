import { db } from '../config/firebase.js';
import { collection, addDoc } from 'firebase/firestore';

// Sample packages data
const samplePackages = [
  {
    name: 'Colombo City Tour',
    description: 'Explore the vibrant capital city of Sri Lanka',
    price: 150,
    duration: '1 day',
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31',
    category: 'city-tour'
  },
  {
    name: 'Gem of Sri Lanka',
    description: 'Discover the cultural treasures and natural beauty',
    price: 450,
    duration: '5 days',
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31',
    category: 'cultural-tour'
  },
  {
    name: 'Tales of the Peak',
    description: 'Adventure in the hill country and tea plantations',
    price: 380,
    duration: '4 days',
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31',
    category: 'adventure-tour'
  },
  {
    name: 'Wildlife & Beach Experience',
    description: 'Safari adventure combined with beach relaxation',
    price: 520,
    duration: '6 days',
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31',
    category: 'wildlife-beach'
  }
];

// Function to add sample packages
export const addSamplePackages = async () => {
  try {
    console.log('Adding sample packages...');
    
    for (const packageData of samplePackages) {
      await addDoc(collection(db, 'packages'), packageData);
      console.log(`Added package: ${packageData.name}`);
    }
    
    console.log('All sample packages added successfully!');
  } catch (error) {
    console.error('Error adding sample packages:', error);
  }
};

// Run this function to add sample data
// addSamplePackages();
