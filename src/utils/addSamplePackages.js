// This script adds sample packages to the Firestore database
// Run this in the browser console or as a separate script

import { db } from './firebase.js';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

const samplePackages = [
  {
    name: 'Colombo City Tour',
    description: 'Explore the vibrant capital city of Sri Lanka with its rich history, bustling markets, and modern attractions.',
    price: 150,
    duration: '1 day',
    category: 'City Tour',
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31'
  },
  {
    name: 'Gem of Sri Lanka',
    description: 'Discover the cultural treasures and natural beauty of Sri Lanka with visits to ancient temples, tea plantations, and wildlife parks.',
    price: 450,
    duration: '5 days',
    category: 'Cultural Tour',
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31'
  },
  {
    name: 'Tales of the Peak',
    description: 'Adventure in the hill country with stunning mountain views, tea estates, and cool climate getaways.',
    price: 380,
    duration: '4 days',
    category: 'Adventure Tour',
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31'
  },
  {
    name: 'Wildlife & Beach Experience',
    description: 'Perfect combination of safari adventure and beach relaxation with visits to national parks and pristine beaches.',
    price: 520,
    duration: '6 days',
    category: 'Wildlife & Beach',
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31'
  },
  {
    name: 'Sri Lanka Grand Tour',
    description: 'Comprehensive tour covering all major attractions including cultural sites, wildlife, beaches, and mountains.',
    price: 750,
    duration: '8 days',
    category: 'Grand Tour',
    availableFrom: '2025-01-01',
    availableTo: '2025-12-31'
  }
];

// Function to add sample packages (run this in browser console)
export const addSamplePackagesToDB = async () => {
  try {
    console.log('Adding sample packages to Firestore...');
    
    for (const packageData of samplePackages) {
      const docRef = await addDoc(collection(db, 'packages'), {
        ...packageData,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      console.log(`✅ Added package: ${packageData.name} (ID: ${docRef.id})`);
    }
    
    console.log('🎉 All sample packages added successfully!');
    alert('Sample packages have been added to the database!');
  } catch (error) {
    console.error('❌ Error adding sample packages:', error);
    alert('Error adding packages: ' + error.message);
  }
};

// To use: Copy this code into browser console and run addSamplePackagesToDB()
console.log('Sample packages script loaded. Run addSamplePackagesToDB() to add packages to database.');
