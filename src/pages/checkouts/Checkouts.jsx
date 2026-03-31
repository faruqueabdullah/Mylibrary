import { useState } from "react";
import Table from "../../components/Table";
import { UseFirebaseContext } from "../../Context/Firebaseprovider";
import { doc, increment, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { checkoutsArray } from "../../../data";

export default function Checkouts() {
  const columns = [
    ...checkoutsArray,
    {
      field: "action",
      headerName: "Action",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 300,
      renderCell: (param) => {
        return (
          <div className="actions flex items-center gap-2 h-full">
            <button
              disabled={param.row.status === "returned" ? true : false}
              onClick={() => {
                returnedBook(param.row);
              }}
              className={`rounded-xl w-30 h-10 ${param.row.status === "returned" ? "bg-gray-300" : "bg-gray-400"} flex items-center justify-center `}
            >
              return
            </button>
            <button
              disabled={param.row.status === "returned" ? true : false}
              onClick={() => {
                setOpen((prev) => ({ ...prev, renewBox: true }));
                setSelectedCheckout(param.row);
              }}
              className={`rounded-xl w-30 h-10 ${param.row.status === "returned" ? "bg-red-300" : "bg-red-400"} flex items-center justify-center `}
            >
              renew
            </button>
            <button
              onClick={() => {
                setOpen((prev) => ({ ...prev, historyBox: true }));
                setSelectedCheckout(param.row);
              }}
              className={`rounded-xl w-30 h-10 bg-green-400 flex items-center justify-center `}
            >
              History
            </button>
          </div>
        );
      },
    },
  ];

  const { checkOuts } = UseFirebaseContext(); // fetching checkOuts details

  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState({ renewBox: false, historyBox: false });
  const [newDueDate, setNewdueDate] = useState("");
  const [selectedCheckout, setSelectedCheckout] = useState(null);

  const filterRow = checkOuts.filter(
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
      availableCopies: increment(1), // if the book is available increase count but if the book is not available add the book in the book component
    });

    const bookRef2 = doc(db, "checkouts", book.id);
    await updateDoc(bookRef2, {
      status: "returned",
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
        selectedCheckout.status === "returned"
          ? {
              status: "returned",
              date: new Date().toISOString(),
            }
          : null,
      ],
    });

    setNewdueDate("");
    setSelectedCheckout(null);
  };

  return (
    <div className="relative">
      <div className="heading flex justify-between items-center py-6">
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
              onChange={(e) => setInputValue(e.target.value)}
            />
            <img src="../../search.png" alt="search" className="w-7" />
          </div>
        </div>
      </div>
      <Table columns={columns} rows={filterRow} />

      {/* Renew Box */}
      {open.renewBox && (
        <div className="flex justify-center items-center w-full h-full bg-gray-200/90 absolute left-0 top-0">
          <div className="w-80 border rounded-xl p-3 bg-white">
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
                  const prevDate = selectedCheckout.dueDate;
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
        <div className="flex justify-center items-center w-full h-full bg-gray-200/90 absolute left-0 top-0">
          <div className="w-150 border rounded-xl p-3 bg-white">
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
