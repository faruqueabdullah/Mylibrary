import { useState } from "react";
import Form from "./Form";
import { addBooks } from "./firebaseServices";

export default function Addbooks({ setAddClick }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    totalCopies: "",
  });

  const [errorMessage, setErrorMessage] = useState({});

  function handleChange(e) {
    let { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrorMessage((prev) => ({ ...prev, [id]: "" }));
  }

  function handleError(formData) {
    let newError = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim() === "") {
        newError[key] = `${key} should not be empty`;
      }
    });

    setErrorMessage(newError);
    return newError;
  }

  function generatedBookId() {
    return "BOOK-" + Math.floor(1000 + Math.random() * 9000);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const bookId = generatedBookId();

    const checkError = handleError(formData);
    if (Object.values(checkError).length > 0) return;

    const newBook = {
      title: formData.title,
      author: formData.author,
      isbn: formData.isbn,
      category: formData.category,
      totalCopies: Number(formData.totalCopies),
      availableCopies: Number(formData.totalCopies),
    };

    // adding books to firestore
    addBooks(bookId, newBook);

    setFormData({
      title: "",
      author: "",
      isbn: "",
      category: "",
      totalCopies: "",
    });
  }

  const formLabels = [
    { id: "title", heading: "Title", type: "text" },
    { id: "author", heading: "Author", type: "text" },
    { id: "isbn", heading: "ISBN", type: "number" },
    { id: "category", heading: "Category", type: "text" },
    { id: "totalCopies", heading: "Total Copies", type: "number" },
  ];

  return (
    <div className="absolute left-0 top-0 w-full h-full bg-[#000000e1] flex justify-center items-center">
      <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errorMessage={errorMessage}
        formData={formData}
        setAddClick={setAddClick}
        formLabels={formLabels}
        formText={{ heading: "Add New Book", button: "Add book" }}
      />
    </div>
  );
}
