import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect } from "react";
import { db, firebaseAuth } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const FirebaseContext = createContext(null);
export const UseFirebaseContext = () => useContext(FirebaseContext);

export default function Firebaseprovider({ children }) {
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, () => {
      // console.log(user);
    });
  }, []);

// fetching members and books from database
  const fetchingData = (collectionName, callback) => {
    const unsubscribe = onSnapshot(
      collection(db, collectionName),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        callback(data);
      },
    );

    return () => unsubscribe();
  };

  return (
    <FirebaseContext.Provider
      value={{
        fetchingData,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}
