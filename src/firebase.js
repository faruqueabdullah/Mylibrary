import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHSzGD44PW25tMRzNpStKS7bwCJB_2p5s",
  authDomain: "library-management-syste-fc8b3.firebaseapp.com",
  projectId: "library-management-syste-fc8b3",
  storageBucket: "library-management-syste-fc8b3.firebasestorage.app",
  messagingSenderId: "856628757633",
  appId: "1:856628757633:web:7a459e7edafde29cdc7980"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)

export const db = getFirestore(app)