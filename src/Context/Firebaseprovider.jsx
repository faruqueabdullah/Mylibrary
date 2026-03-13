import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

const FirebaseContext = createContext(null);
export const UseFirebaseContext = () => useContext(FirebaseContext);

export default function Firebaseprovider({ children }) {
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);
  const [checkOuts, setCheckOuts] = useState([]);

  // fetching books and members from database

  const fetchCollections = (collectionName, setState) => {
    return onSnapshot(collection(db, collectionName), (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setState(data);
    });
  };

  useEffect(() => {
    const unsubscribeMembers = fetchCollections("members", setMembers);
    const unsubscribeBooks = fetchCollections("books", setBooks);
    const unsubscribeCheckOut = fetchCollections("checkouts", setCheckOuts)

    return () => {
      unsubscribeMembers();
      unsubscribeBooks();
      unsubscribeCheckOut();
    };
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        members,
        books,
        checkOuts
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}
