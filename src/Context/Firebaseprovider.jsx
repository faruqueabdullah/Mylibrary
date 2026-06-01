import { createContext, useContext, useEffect, useState } from "react";
import { db, firebaseAuth } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const FirebaseContext = createContext(null);
export const UseFirebaseContext = () => useContext(FirebaseContext);

export default function Firebaseprovider({ children }) {
  const [members, setMembers] = useState([]);
  const [books, setBooks] = useState([]);
  const [checkOuts, setCheckOuts] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  function login(email, password) {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  }

  async function logout() {
    await signOut(firebaseAuth)
    console.log('logout successfully')
  }

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
    async function fetchData() {
      const unsubscribeMembers = await fetchCollections("members", setMembers);
      const unsubscribeBooks = await fetchCollections("books", setBooks);
      const unsubscribeCheckOut = await fetchCollections(
        "checkouts",
        setCheckOuts,
      );

      const unsubscribeUser = onAuthStateChanged(firebaseAuth, (user) => {
        setUser(user);
        setLoading(false);
      });

      return () => {
        unsubscribeMembers();
        unsubscribeBooks();
        unsubscribeCheckOut();
        unsubscribeUser();
      };
    }

    fetchData();
  }, []);

  return (
    <FirebaseContext.Provider
      value={{
        members,
        books,
        checkOuts,
        login,
        logout,
        user,
        loading,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
}
