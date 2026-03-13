import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase"

// adding books to database 
export const addBooks = async (bookId, bookObject) => {
   return await setDoc(doc(db, "books", bookId), bookObject)
}

