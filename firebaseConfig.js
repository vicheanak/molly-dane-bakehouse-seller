import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
import {
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth/react-native";

// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCIrwFZCKQtqdG8ZwY--s3X5c9Vj_i6Zro",
  authDomain: "molly-dene-bakehouse.firebaseapp.com",
  projectId: "molly-dene-bakehouse",
  storageBucket: "molly-dene-bakehouse.appspot.com",
  messagingSenderId: "1090544620332",
  appId: "1:1090544620332:web:66a11bba591a965f5fd289",
  measurementId: "G-Q1N1X8JZ36"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage),
});
// export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

