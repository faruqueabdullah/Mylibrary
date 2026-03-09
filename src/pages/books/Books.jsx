import { useState } from "react";
import Table from "../../components/Table";
import Addbooks from "../../components/Addbooks";
import Issue from "../../components/Issue";
import { UseFirebaseContext } from "../../Context/Firebaseprovider";

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
      width: 300,
      renderCell: (params) => {
        return (
          <div className="actions flex items-center gap-2 h-full">
            <button className="rounded-xl w-30 h-10 bg-gray-300 flex items-center justify-center">
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

  const [rows, setRows] = useState([]);
  const [addClick, setAddClick] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [issueBtnClicked, setIssueBtnClicked] = useState(false);
  const [bookDetails, setBookDetails] = useState([]);

  const {books} = UseFirebaseContext() // getting books from context


  function handleChange(e) {
    setInputValue(e.target.value.trim());
    tableRows(e.target.value.trim());
  }

  //filter books by title, isbn, author, category
  function tableRows(value) {
    const rowData = books?.filter(
      (data) =>
        data.title.toLowerCase().includes(value.toLowerCase()) ||
        data.isbn.toLowerCase().includes(value.toLowerCase()) ||
        data.author.toLowerCase().includes(value.toLowerCase()) ||
        data.category.toLowerCase().includes(value.toLowerCase()),
    );
    setRows(rowData);
  }

  return (
    <>
      <div className="memberHeading flex justify-between items-center py-6">
        <div className="text">
          <h1 className="text-xl font-semibold text-dark-color">Books</h1>
          <span className="text-sm text-dark-color">
            search and create books
          </span>
        </div>
        <div className="searchAndCreate flex items-center gap-3">
          <div className="search border flex items-center h-10 px-4 rounded-full">
            <input
              type="text"
              className="border-0 outline-0"
              placeholder="search by ISBN, title, author"
              value={inputValue}
              onChange={handleChange}
            />
            <img src="../../search.png" alt="search" className="w-7" />
          </div>
          <button
            onClick={() => setAddClick(true)}
            className="py-3 px-5 cursor-pointer bg-green-400 rounded-full text-white"
          >
            Add Books
          </button>
        </div>
      </div>
      <Table columns={columns} rows={rows.length === 0 ? books : rows} />
      {addClick && <Addbooks setAddClick={setAddClick} />}
      {issueBtnClicked && <Issue setIssueBtnClicked={setIssueBtnClicked} bookDetails={bookDetails}/>}
    </>
  );
}
