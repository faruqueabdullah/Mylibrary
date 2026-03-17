import { deleteDoc, doc, setDoc } from "firebase/firestore"
import { db } from "../firebase"

// adding books to database 
export const addBooks = async (bookId, bookObject) => {
   return await setDoc(doc(db, "books", bookId), bookObject)
}

 // delete member
 export const deleteMember = async (memberId) => {
    await deleteDoc(doc(db, "members", memberId));
  };

// delete books
 export const deleteBook = async (bookId) => {
    await deleteDoc(doc(db, "books", bookId));
  };