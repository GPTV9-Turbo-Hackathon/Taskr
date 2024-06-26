// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";
import { getDatabase, ref} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDikCHzPw5djXYXkimedfNsP0bKYmvCTIk",
  authDomain: "taskr-46a3f.firebaseapp.com",
  projectId: "taskr-46a3f",
  storageBucket: "taskr-46a3f.appspot.com",
  messagingSenderId: "703918325036",
  appId: "1:703918325036:web:b2f6a04872b968aa808089",
  measurementId: "G-JMH7L83GEM",
  databaseURL: "https://taskr-46a3f-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getDatabase(app);
export const tasksRef = ref(db, 'tasks');
