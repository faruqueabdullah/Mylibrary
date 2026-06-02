import { useState } from "react";
import Table from "../../components/Table";
import Addbooks from "../../components/Addbooks";
import Issue from "../../components/Issue";
import { UseFirebaseContext } from "../../Context/Firebaseprovider";
import { deleteBook } from "../../components/firebaseServices";
import { UseThemeContext } from "../../Context/ThemeProvider";

export default function Books() {
  const columns = [
    { field: "id", headerName: "Book ID", width: 100 },
    {
      field: "title",
      headerName: "Title",
      type: "text",
      width: 160,
      editable: true,
    },
    {
      field: "author",
      headerName: "Author",
      type: "text",
      width: 140,
      editable: true,
    },
    {
      field: "isbn",
      headerName: "ISBN",
      type: "number",
      width: 140,
      editable: true,
    },
    {
      field: "category",
      headerName: "Category",
      type: "text",
      width: 120,
      editable: true,
    },
    {
      field: "totalCopies",
      headerName: "Total",
      type: "number",
      width: 60,
      editable: true,
    },
    {
      field: "availableCopies",
      headerName: "Available",
      type: "number",
      width: 80,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      minWidth: 300,
      flex: 1,
      renderCell: (params) => {
        return (
          <div className="actions flex items-center gap-2 h-full">
            <button
              onClick={() => {
                setIsEdit(true);
                setBookDetails(params.row);
              }}
              className="rounded-xl w-30 h-10 bg-gray-300 flex items-center justify-center"
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteBook(params.id);
                // console.log(params.id)
              }}
              className="rounded-xl w-30 h-10 bg-red-300 flex items-center justify-center"
            >
              Delete
            </button>
            <button
              onClick={() => {
                setIssueBtnClicked(true);
                setBookDetails(params.row);
              }}
              className="rounded-xl w-30 h-10 bg-green-400 flex items-center justify-center"
            >
              Issue
            </button>
          </div>
        );
      },
    },
  ];

  const { theme } = UseThemeContext();

  const [addClick, setAddClick] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [issueBtnClicked, setIssueBtnClicked] = useState(false);
  const [bookDetails, setBookDetails] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  const { books } = UseFirebaseContext(); // getting books from context

  //filter books by title, isbn, author, category
  const rowData = books?.filter(
    (data) =>
      data.title.toLowerCase().includes(inputValue.toLowerCase()) ||
      data.isbn.toLowerCase().includes(inputValue.toLowerCase()) ||
      data.author.toLowerCase().includes(inputValue.toLowerCase()) ||
      data.category.toLowerCase().includes(inputValue.toLowerCase()),
  );

  // console.log(rowData)

  return (
    <>
      <div
        className={`${theme ? "bg-softdark text-softwhite" : "bg-softwhite text-softdark"}  flex flex-col sm:flex-row justify-between py-6 px-1 sm:px-3 gap-4`}
      >
        <div className="text">
          <h1 className="text-xl font-semibold">Books</h1>
          <span className="text-sm">search and create books</span>
        </div>
        <div className="searchAndCreate flex items-center gap-1.5">
          <div className = "search border flex items-center h-10 px-3 rounded-full">
            <input
              type="text"
              className="border-0 outline-0"
              placeholder="search by ISBN, title, author"
              value={inputValue}
              onChange={(e)=>{setInputValue(e.target.value.trim())}}
            />
            <img src="./search.svg" alt="search" className="hidden sm:block w-7" />
          </div>
          <button
            onClick={() => {
              setAddClick(true);
              setBookDetails(null);
            }}
            className="flex items-center justify-center gap-2 w-full max-w-28 py-2.5 px-5 cursor-pointer bg-green-400 rounded-full text-white"
          >
            Add <span className="hidden sm:block">Books</span>
          </button>
        </div>
      </div>
      <Table columns={columns} rows={rowData} />
      {(addClick || isEdit) && (
        <Addbooks
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          setAddClick={setAddClick}
          bookDetails={bookDetails}
        />
      )}
      {issueBtnClicked && (
        <Issue
          setIssueBtnClicked={setIssueBtnClicked}
          bookDetails={bookDetails}
        />
      )}
    </>
  );
}
