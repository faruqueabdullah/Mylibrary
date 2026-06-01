import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

// adding books to database 
export const addBooks = async (bookId, bookObject) => {
   return await setDoc(doc(db, "books", bookId), bookObject)
}

// adding member to database 
export const addMember = async (memberId, memberObject) => {
   return await setDoc(doc(db, "members", memberId), memberObject)
}

// delete books
export const deleteBook = async (bookId) => {
   await deleteDoc(doc(db, "books", bookId));
};

// delete member
export const deleteMember = async (memberId) => {
   await deleteDoc(doc(db, "members", memberId));
};

// update book
export const updateBook = async (bookId, bookObject) => {
   await updateDoc(doc(db, 'books', bookId), bookObject)
}

// update member
export const updateMember = async (memberId, memberObject) => {
   await updateDoc(doc(db, 'members', memberId), memberObject)
}