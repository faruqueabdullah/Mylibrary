import { useEffect } from "react";
import Form from "./Form";
import { addBooks, updateBook } from "./firebaseServices";
import useForm from "../hooks/useForm";
import { UseThemeContext } from "../Context/ThemeProvider";
import { UseFirebaseContext } from "../Context/Firebaseprovider";


export default function Addbooks({
  setAddClick,
  setIsEdit,
  isEdit,
  bookDetails,
}) {
  const { theme } = UseThemeContext();

  const { books } = UseFirebaseContext();

  // console.log(books);

  const { formData, errorMessage, handleSubmit, handleChange, setFormData } =
    useForm({
      initialValues: {
        title: "",
        author: "",
        isbn: "",
        category: "",
        totalCopies: "",
      },
      validate: handleError,
      sendData,
    });

  // setting formData (input fields) when Click on Edit

  useEffect(() => {
    if (isEdit && bookDetails) {
      setFormData(bookDetails);
    }
  }, [isEdit, bookDetails]);

  // check and set error message for empty inputs values
  function handleError(formData) {
    // console.log(formData)
    let newError = {};
    Object.entries(formData).forEach(([key, value]) => {
      console.log(value);
      if (!value.trim()) {
        newError[key] = `${key} should not be empty`;
      }
    });

    return newError;
  }

  function sendData(data) {
    // editing the exsiting book

    if (isEdit && bookDetails) {
      const newObj = {};
      const [book] = books.filter((book) => bookDetails.id === book.id);

      Object.entries(data).forEach(([key, value]) => {
        newObj[key] = value;
      });

      updateBook(book.id, {
        ...newObj,
        availableCopies: data.totalCopies,
      });

      return;
    }

    //creating new book
    const bookId = "BOOK-" + Math.floor(1000 + Math.random() * 9000);

    const newBook = {
      ...data,
      totalCopies: formData.totalCopies,
      availableCopies: formData.totalCopies,
    };

    // adding books to firestore
    addBooks(bookId, newBook);
  }

  const formLabels = [
    { id: "title", heading: "Title", type: "text" },
    { id: "author", heading: "Author", type: "text" },
    { id: "isbn", heading: "ISBN", type: "number" },
    { id: "category", heading: "Category", type: "text" },
    { id: "totalCopies", heading: "Total Copies", type: "number" },
  ];

  return (
    <div
      className={`${theme ? "bg-dark/95 text-softwhite" : "bg-softwhite/90 text-dark"} absolute left-0 top-0 w-full h-full flex justify-center items-center overflow-hidden p-2`}
    >
      <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errorMessage={errorMessage}
        formData={formData}
        setAddClick={setAddClick}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        formLabels={formLabels}
        formText={{
          heading: "Add New Book",
          button: "Add book",
          edit: "Edit book",
        }}
      />
    </div>
  );
}
