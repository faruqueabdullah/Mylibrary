import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect } from "react";
import { firebaseAuth } from "../firebase";

const Context = createContext(null);

export default function AuthContext({ children }) {
  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      console.log(user);
    });
  }, []);
  return <Context.Provider value={""}>{children}</Context.Provider>;
}
