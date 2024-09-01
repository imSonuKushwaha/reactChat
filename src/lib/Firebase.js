import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchat-58e9f.firebaseapp.com",
  projectId: "reactchat-58e9f",
  storageBucket: "reactchat-58e9f.appspot.com",
  messagingSenderId: "1078842030923",
  appId: "1:1078842030923:web:f4e5f015b70503b2e9c6ce",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
