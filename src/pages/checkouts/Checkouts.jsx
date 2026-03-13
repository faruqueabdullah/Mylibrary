import { useState } from "react";
import Table from "../../components/Table";
import { UseFirebaseContext } from "../../Context/Firebaseprovider";

export default function Checkouts() {
  const columns = [
    { field: "memberId", headerName: "Member ID", width: 100 },
    {
      field: "member",
      headerName: "Member",
      type: "text",
      width: 250,
      editable: true,
    },
    {
      field: "title",
      headerName: "Title",
      type: "text",
      width: 250,
      editable: true,
    },
    {
      field: "author",
      headerName: "Author",
      type: "text",
      width: 250,
      editable: true,
    },
    {
      field: "issueDate",
      headerName: "Borrowed Date",
      type: "text",
      width: 250,
      editable: true,
    },
    {
      field: "dueDate",
      headerName: "Due Date",
      type: "text",
      width: 250,
      editable: true,
    },
    {
      field: "status",
      headerName: "Status",
      type: "text",
      width: 250,
      editable: true,
    },
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 300,
      renderCell: () => {
        // console.log(params)
        return (
          <div className="actions flex items-center gap-2 h-full">
            <button className="rounded-xl w-30 h-10 bg-gray-300 flex items-center justify-center">
              Edit
            </button>
            <button className="rounded-xl w-30 h-10 bg-red-400 flex items-center justify-center">
              Cancel
            </button>
          </div>
        );
      },
    },
  ];

  const { checkOuts } = UseFirebaseContext(); // fetching checkOuts details

  const [inputValue, setInputValue] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  };

  const filterRow = checkOuts.filter(
    (book) =>
      book.title.toLowerCase().includes(inputValue?.toLowerCase()) ||
      book.member.toLowerCase().includes(inputValue?.toLowerCase()) ||
      book.author.toLowerCase().includes(inputValue?.toLowerCase()) ||
      book.memberId.includes(`LIB-M-${inputValue}`),
  );

  return (
    <div>
      <div className="memberHeading flex justify-between items-center py-6">
        <div className="text">
          <h1 className="text-xl font-semibold text-dark-color">
            CheckOut Books
          </h1>
          <span className="text-sm text-dark-color">See borrow details</span>
        </div>
        <div className="searchAndCreate flex items-center gap-3">
          <div className="search border flex items-center h-10 px-4 rounded-full">
            <input
              type="text"
              className="border-0 outline-0"
              placeholder="search by id, member, book, author"
              value={inputValue}
              onChange={handleChange}
            />
            <img src="../../search.png" alt="search" className="w-7" />
          </div>
        </div>
      </div>
      <Table columns={columns} rows={filterRow} />
    </div>
  );
}
