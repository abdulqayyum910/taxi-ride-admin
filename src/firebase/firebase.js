import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD3rQBGqzBc0rc7vaR-NjVHuWciu8W9iJY',
  authDomain: 'taxi-ride-app-54974.firebaseapp.com',
  projectId: 'taxi-ride-app-54974',
  storageBucket: 'taxi-ride-app-54974.appspot.com',
  messagingSenderId: '750529412983',
  appId: '1:750529412983:web:5246bbc498df99291beb72',
  measurementId: 'G-4FVS24DXMN',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
