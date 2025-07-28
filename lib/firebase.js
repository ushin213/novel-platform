// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC4ukMm3FbvLXwsG5zS6TKckysa-rzfPXs",
  authDomain: "novel-platform-86477.firebaseapp.com",
  projectId: "novel-platform-86477",
  storageBucket: "novel-platform-86477.firebasestorage.app",
  messagingSenderId: "463765000274",
  appId: "1:463765000274:web:03aab6de44946fa8cd4f8b",
  measurementId: "G-HWVCG6JDV4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
