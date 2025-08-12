import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  // Your Firebase configuration here
  apiKey: "AIzaSyDag8n4rF7IlEAIMkh5yAIcnSHdx5NVXq0",
  authDomain: "zil-travelers-184e1.firebaseapp.com",
  projectId: "zil-travelers-184e1",
  storageBucket: "zil-travelers-184e1.appspot.com",
  messagingSenderId: "226023033992",
  appId: "1:226023033992:web:30874a453f92aaec8ca33d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
