import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDHSzGD44PW25tMRzNpStKS7bwCJB_2p5s",
  authDomain: "library-management-syste-fc8b3.firebaseapp.com",
  projectId: "library-management-syste-fc8b3",
  storageBucket: "library-management-syste-fc8b3.firebasestorage.app",
  messagingSenderId: "856628757633",
  appId: "1:856628757633:web:7a459e7edafde29cdc7980",
  databaseURL:"https://library-management-syste-fc8b3-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app)

export const db = getFirestore(app)

export const database = getDatabase(app)