// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAeoyPjQzaU1wipiPv8Cy4kS0C7lpdavjo",
  authDomain: "todolist-4f6a5.firebaseapp.com",
  databaseURL: "https://todolist-4f6a5-default-rtdb.firebaseio.com",
  projectId: "todolist-4f6a5",
  storageBucket: "todolist-4f6a5.appspot.com",
  messagingSenderId: "858057982661",
  appId: "1:858057982661:web:bac9aa2cc4c393b10166ac"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app)
export const auth = getAuth()