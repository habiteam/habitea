// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBVnNcD8tpLOmtkLp1nq9LYinat7a7YY4A',
  authDomain: 'habitea-27668.firebaseapp.com',
  projectId: 'habitea-27668',
  storageBucket: 'habitea-27668.appspot.com',
  messagingSenderId: '703337714726',
  appId: '1:703337714726:web:a618ba028d96d763f182e7',
  measurementId: 'G-SR89QEBLBX',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
