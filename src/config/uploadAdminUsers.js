import admin from 'firebase-admin';
import fs from 'fs';

// Read your service account key as JSON
const serviceAccount = JSON.parse(fs.readFileSync('./serviceAccountKey.json', 'utf8'));

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// New admin users data
const users = [
  { "email": "admin1@example.com", "name": "Admin One" },
  { "email": "admin2@example.com", "name": "Admin Two" }
];

async function uploadUsers() {
  const batch = db.batch();
  users.forEach((user) => {
    const docRef = db.collection('adminUsers').doc();
    batch.set(docRef, user);
  });
  await batch.commit();
  console.log('Upload complete!');
}

uploadUsers();

db.collection('adminUsers').get()
  .then(snapshot => {
    snapshot.forEach(doc => {
      console.log(doc.id, doc.data());
    });
    process.exit(0);
  })
  .catch(err => {
    console.error('Error connecting to Firestore:', err);
    process.exit(1);
  });