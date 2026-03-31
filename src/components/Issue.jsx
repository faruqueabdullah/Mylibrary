import { useState } from "react";
import { UseFirebaseContext } from "../Context/Firebaseprovider";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Issue({ setIssueBtnClicked, bookDetails }) {
  const { members } = UseFirebaseContext();
  const [selectedMember, setSelectedMember] = useState("");
  const [dueDate, setDuedate] = useState("");

  const { id: bookId, title, author, isbn } = bookDetails;
  const labels = { bookId, title, author, isbn };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedMember || !dueDate) return; // simple check to avoid empty inputs

    const [{ id: memberId }] = members.filter(
      (member) => member.name === selectedMember,
    ); // getting memberId

    const issueBook = {
      title,
      author,
      isbn,
      bookId,
      memberId,
      member: selectedMember,
      issueDate: new Date().toISOString(),
      dueDate: new Date(dueDate).toISOString(),
      returnDate: null,
      renewCount:0,
      status: "borrowed",
      history:[
        {status:"borrowed", date:new Date().toISOString(),}
      ]
    };

    addDoc(collection(db, "checkouts"), issueBook)
      .then(() => {
        setDuedate("");
        setSelectedMember("");
        setIssueBtnClicked(false);
      })
      .catch((error) => alert(error));

    // Reduce available copies
    const bookRef = doc(db, "books", bookId);
    await updateDoc(bookRef, {
      availableCopies:
        bookDetails.availableCopies > 0 &&
        Number(bookDetails.availableCopies) - 1,
    });
  };

  return (
    <div className="absolute left-0 top-0 w-full h-full bg-[#000000e1] flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="add-member-form w-md border p-5 rounded-xl bg-soft-bg"
      >
        <div className="heading flex justify-between items-center pb-5">
          <h2 className="text-2xl font-semibold">Issue Book</h2>
          <span
            onClick={() => setIssueBtnClicked(false)}
            className="text-xl cursor-pointer"
          >
            X
          </span>
        </div>

        <div className="flex flex-col gap-1 my-3">
          <div className="flex items-center gap-2">
            <label htmlFor="user-type" className="w-32">
              Member
            </label>
            <select
              id="user-type"
              name="user-type"
              className="border p-2 w-full"
              onChange={(e) => setSelectedMember(e.target.value)}
              value={selectedMember}
            >
              <option disabled selected>
                Select Member
              </option>
              {members?.map((member) => {
                return <option key={member.id}>{member.name}</option>;
              })}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="due-date" className="w-32">
              Due date
            </label>
            <input
              id="due-date"
              type="date"
              className="border p-1 w-full"
              value={dueDate}
              onChange={(e) => setDuedate(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 items-center">
            {Object.entries(labels).map(([key, value]) => {
              return (
                <div className="flex gap-2 items-center w-full">
                  <label htmlFor="id" className=" w-32">
                    {key.toUpperCase()}
                  </label>
                  <input
                    id={key}
                    name={key}
                    className="border p-1 w-full"
                    type={typeof value === "string" ? "text" : "number"}
                    value={value}
                    readOnly
                  />
                </div>
              );
            })}
          </div>
        </div>

        <button
          disabled={bookDetails.availableCopies === 0 ? true : false}
          className="bg-green-400 p-3 my-3 rounded-sm w-full"
        >
          Issue Book
        </button>
      </form>
    </div>
  );
}
