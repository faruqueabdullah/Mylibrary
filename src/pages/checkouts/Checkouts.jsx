import { useState } from "react";
import Table from "../../components/Table";
import { UseFirebaseContext } from "../../Context/Firebaseprovider";
import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { checkoutsArray } from "../../../data";
import { UseThemeContext } from "../../Context/ThemeProvider";

export default function Checkouts() {
  const { theme } = UseThemeContext();

  const columns = [
    ...checkoutsArray,
    {
      field: "status",
      headerName: "Status",
      type: "text",
      minWidth: 100,
      editable: false,
    },
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      minWidth: 300,
      flex: 1,
      renderCell: (param) => {
        return (
          <div className="actions flex items-center gap-2 h-full">
            <button
              disabled={param.row.status === "returned" ? true : false}
              onClick={() => {
                returnedBook(param.row);
              }}
              className={`rounded-xl w-24 h-10 ${param.row.status === "returned" ? "bg-gray-300" : "bg-gray-400"} flex items-center justify-center cursor-pointer`}
            >
              return
            </button>
            <button
              disabled={param.row.status === "returned" ? true : false}
              onClick={() => {
                setOpen((prev) => ({ ...prev, renewBox: true }));
                setSelectedCheckout(param.row);
              }}
              className={`rounded-xl w-24 h-10 ${param.row.status === "returned" ? "bg-red-300" : "bg-red-400"} flex items-center justify-center cursor-pointer`}
            >
              renew
            </button>
            <button
              onClick={() => {
                setOpen((prev) => ({ ...prev, historyBox: true }));
                setSelectedCheckout(param.row);
              }}
              className={`rounded-xl w-24 h-10 bg-green-400 flex items-center justify-center cursor-pointer`}
            >
              History
            </button>
          </div>
        );
      },
    },
  ];

  const { checkOuts } = UseFirebaseContext(); // fetching checkOuts details

  const dateObj = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

// console.log(  new Date(checkOuts[0].dueDate).toLocaleDateString("en-IN", dateObj))

  const updatedCheckOuts = checkOuts.map((data) => ({
    ...data,
    dueDate:new Date(data.dueDate).toLocaleDateString("en-IN", dateObj),
    issueDate:new Date(data.issueDate).toLocaleDateString("en-IN", dateObj)
  }));

  // console.log(updatedCheckOuts)

  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState({ renewBox: false, historyBox: false });
  const [newDueDate, setNewdueDate] = useState("");
  const [selectedCheckout, setSelectedCheckout] = useState(null);

  // open.historyBox && console.log(selectedCheckout)

  const filterRow = updatedCheckOuts.filter(
    (book) =>
      book.title.toLowerCase().includes(inputValue?.toLowerCase()) ||
      book.member.toLowerCase().includes(inputValue?.toLowerCase()) ||
      book.author.toLowerCase().includes(inputValue?.toLowerCase()) ||
      book.memberId.includes(`LIB-M-${inputValue}`),
  );

  // adding book after return
  const returnedBook = async (book) => {
    const bookRef = doc(db, "books", book.bookId);
    await updateDoc(bookRef, {
      availableCopies: increment(1), // if the book is available increase count but if the book is not available add the book in the book component ????
    });

    const bookRef2 = doc(db, "checkouts", book.id);
    await updateDoc(bookRef2, {
      status: "returned",
      returnDate:new Date().toISOString(),
      history: [
        ...book.history,
        { status: "returned", date: new Date().toISOString() },
      ],
    });
  };

  // renew book
  const handleRenew = async () => {
    if (!newDueDate || !selectedCheckout) return;

    const bookRef = doc(db, "checkouts", selectedCheckout.id);
    await updateDoc(bookRef, {
      status: "renewed",
      renewCount: selectedCheckout.renewCount <= 2 && increment(1),
      dueDate: new Date(newDueDate).toISOString(),
      history: [
        ...selectedCheckout.history,
        {
          status: "renewed",
          date: new Date(newDueDate).toISOString(),
        },
        // selectedCheckout.status === "returned"
        //   ? {
        //       status: "returned",
        //       date: new Date().toISOString(),
        //     }
        //   : null,
      ],
    });

    setNewdueDate("");
    setSelectedCheckout(null);
  };

  return (
    <div
      className={`relative ${theme ? "bg-softdark text-softwhite" : "bg-softwhite text-softdark "} w-full h-full`}
    >
      <div className="heading flex flex-col sm:flex-row justify-between py-6 px-1 sm:px-3 gap-4">
        <div className="text">
          <h1 className="text-xl font-semibold">CheckOut Books</h1>
          <span className="text-sm">See borrow details</span>
        </div>
        <div
          className={` border flex w-fit items-center h-10 px-4 rounded-full`}
        >
          <input
            type="text"
            className="border-0 outline-0"
            placeholder="search by id, member, book, author"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <img src="./search.svg" alt="search" className="w-7" />
        </div>
      </div>
      <Table columns={columns} rows={filterRow} />

      {/* Renew Box */}
      {open.renewBox && (
        <div
          className={`${theme ? "bg-dark/95" : "bg-softwhite/90"} flex justify-center items-center w-full h-full absolute left-0 top-0 p-1.5`}
        >
          <div
            className={`${theme ? "bg-dark" : "bg-softwhite"} w-80 border rounded-xl p-3`}
          >
            <h3 className="text-2xl text-center pb-3">Renew Book</h3>{" "}
            <p>
              <b>Book:</b> {selectedCheckout?.title}
            </p>
            <p>
              <b>Member:</b> {selectedCheckout?.member}
            </p>
            <div className="flex justify-between items-center w-full  p-1 my-5 border rounded">
              <label htmlFor="dueDate">
                <b>Select new date :</b>
              </label>
              <input
                type="date"
                value={newDueDate}
                required
                onChange={(e) => {
                  setNewdueDate(e.target.value);
                }}
              />
            </div>
            <div className="flex justify-between items-center gap-2">
              <button
                disabled={selectedCheckout.renewCount == 2 ? true : false}
                className="border w-full bg-green-400 rounded p-1"
                onClick={() => {
                  const newDate = new Date(newDueDate).toLocaleDateString(
                    "en-GB",
                  );
                  const prevDate = new Date(
                    selectedCheckout.dueDate,
                  ).toLocaleDateString("en-GB");

                  if (newDate <= prevDate) {
                    alert(
                      "The new date should be greater than the previous one.",
                    );
                    return;
                  }
                  handleRenew();
                  setOpen((prev) => ({ ...prev, renewBox: false }));
                }}
              >
                Confirm
              </button>
              <button
                className="border w-full bg-red-400 rounded p-1"
                onClick={() =>
                  setOpen((prev) => ({ ...prev, renewBox: false }))
                }
              >
                cancel
              </button>
            </div>
            {selectedCheckout.renewCount == 2 ? (
              <p className="text-red-400 text-center">
                * maximum renew count hit.
              </p>
            ) : (
              ""
            )}
          </div>
        </div>
      )}

      {/* History Box */}
      {open.historyBox && (
        <div
          className={`${theme ? "bg-dark/95" : "bg-softwhite/90"} flex justify-center items-center w-full h-full absolute left-0 top-0 p-1.5`}
        >
          <div
            className={`${theme ? "bg-dark" : "bg-softwhite"} w-150 border rounded-xl p-3`}
          >
            <h3 className="text-2xl text-center pb-3">Checkout History</h3>{" "}
            {selectedCheckout?.history.map((history) => {
              return (
                <div className="flex gap-5 justify-center items-center">
                  <p>{history.status}</p>
                  <p>{new Date(history.date).toLocaleDateString("en-GB")}</p>
                </div>
              );
            })}
            <div className="flex justify-between items-center gap-2">
              <button
                className="border w-fit mx-auto bg-red-400 rounded py-1 px-5 mt-3"
                onClick={() =>
                  setOpen((prev) => ({ ...prev, historyBox: false }))
                }
              >
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
