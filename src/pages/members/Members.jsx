import { useState } from "react";
import Table from "../../components/Table";
import Addmember from "../../components/Addmember";
import { UseFirebaseContext } from "../../Context/Firebaseprovider";
import { deleteMember } from "../../components/firebaseServices";
import { UseThemeContext } from "../../Context/ThemeProvider";

export default function Members() {
  const columns = [
    { field: "id", headerName: "Member ID", width: 100 },
    {
      field: "username",
      headerName: "Member",
      type: "text",
      width: 150,
      editable: false,
    },
    {
      field: "email",
      headerName: "Email ID",
      type: "text",
      width: 200,
      editable: false,
    },
    {
      field: "phone",
      headerName: "Mobile Number",
      type: "tel",
      width: 120,
      editable: false,
    },
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      minWidth: 150,
      flex: 1,
      renderCell: (params) => {
        // console.log(params)
        return (
          <div className="actions flex gap-3 items-center h-full">
            <button
              onClick={() => {
                setIsEdit(true);
                setMemberDetails(params.row);
              }}
              className="rounded-xl w-30 h-9 cursor-pointer bg-gray-500 flex items-center justify-center"
            >
              Edit
            </button>
            <button
              onClick={() => deleteMember(params.id)}
              className="rounded-xl w-30 h-9 cursor-pointer bg-red-400 flex items-center justify-center"
            >
              Delete
            </button>
          </div>
        );
      },
    },
  ];

  const { theme } = UseThemeContext();
  const [addClick, setAddClick] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [memberDetails, setMemberDetails] = useState(null);

  const { members } = UseFirebaseContext(); // getting members from firebase context
  // console.log(members);

  function handleChange(e) {
    setInputValue(e.target.value.trim());
  }

  //filter table row
  const rowData = members?.filter((data) => {
    return (
      data?.username.toLowerCase().includes(inputValue.toLowerCase()) ||
      data?.id.toLowerCase().includes(inputValue.toLowerCase()) ||
      data?.email.toLowerCase().includes(inputValue.toLowerCase())
    );
  });

  return (
    <div>
      <div
        className={`${theme ? "bg-softdark text-softwhite" : "bg-softwhite text-softdark"} flex flex-col sm:flex-row sm:justify-between py-6 px-1 sm:px-3 gap-4`}
      >
        <div className="text">
          <h1 className="text-xl font-semibold">Members</h1>
          <span className="text-sm ">search and create a member</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className={`${theme ? "bg-softdark text-softwhite" : "bg-softwhite text-softdark"} border flex items-center h-10 px-3 rounded-full`}
          >
            <input
              type="text"
              className="border-0 outline-0"
              placeholder="search by name, id, email"
              value={inputValue}
              onChange={handleChange}
            />
            <img src="./search.svg" alt="search" className="hidden sm:block w-7" />
          </div>
          <button
            onClick={() => {
              setAddClick(true)
              setMemberDetails(null)
            }}
            className="flex gap-1 items-center justify-center max-w-28 w-full py-2.5 px-5 cursor-pointer bg-green-400 rounded-full text-white"
          >
            Add <span className="hidden sm:block">member</span>
          </button>
        </div>
      </div>
      <Table columns={columns} rows={rowData} />
      {(addClick || isEdit) && (
        <Addmember
          setIsEdit={setIsEdit}
          isEdit={isEdit}
          memberDetails={memberDetails}
          setAddClick={setAddClick}
        />
      )}
    </div>
  );
}
