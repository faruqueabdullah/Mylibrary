import { useState } from "react";
import { members } from "../../../data";
import Table from "../../components/Table";
import Addmember from "../../components/Addmember";

export default function Members() {
  const columns = [
    { field: "id", headerName: "Member ID", width: 100 },
    { field: "registerId", headerName: "Register ID", width: 100 },
    {
      field: "name",
      headerName: "Member",
      type: "text",
      width: 250,
      editable: true,
    },
    {
      field: "email",
      headerName: "Email ID",
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

  const [rows, setRows] = useState([]);
  const [addClick, setAddClick] = useState(false);
  const [inputValue, setInputValue] = useState("");

  function handleChange(e) {
    setInputValue(e.target.value.trim());
    tableRows(e.target.value.trim());
  }

  //filter table row
  function tableRows(value) {
    const rowData = members.filter(
      (data) =>
        data.name.toLowerCase().includes(value.toLowerCase()) ||
        data.id.toLowerCase().includes(value.toLowerCase()) ||
        data.email.toLowerCase().includes(value.toLowerCase()),
    );
    setRows(rowData);
  }

  return (
    <div>
      <div className="memberHeading flex justify-between items-center py-6">
        <div className="text">
          <h1 className="text-xl font-semibold text-dark-color">Members</h1>
          <span className="text-sm text-dark-color">
            search and create a member
          </span>
        </div>
        <div className="searchAndCreate flex items-center gap-3">
          <div className="search border flex items-center h-10 px-4 rounded-full">
            <input
              type="text"
              className="border-0 outline-0"
              placeholder="search by name, id, email"
              value={inputValue}
              onChange={handleChange}
            />
            <img src="../../search.png" alt="search" className="w-7" />
          </div>
          <button
            onClick={() => setAddClick(true)}
            className="py-3 px-5 cursor-pointer bg-green-400 rounded-full text-white"
          >
            Add members
          </button>
        </div>
      </div>
      <Table columns={columns} rows={rows.length === 0 ? members : rows} />
      {addClick && <Addmember setAddClick={setAddClick} />}
    </div>
  );
}
