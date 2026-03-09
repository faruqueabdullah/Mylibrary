import { useState } from "react";
import { UseFirebaseContext } from "../Context/Firebaseprovider";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export default function Issue({ setIssueBtnClicked, bookDetails }) {
  const { members } = UseFirebaseContext();
  const [selectedMember, setSelectedMember] = useState("");
  const [memberType, setMemberType] = useState("");
  const [dueDate, setDuedate] = useState("");

  const { id, title, author, isbn } = bookDetails;
  const labels = { id, title, author, isbn };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!selectedMember || !memberType || !dueDate) return; // simple check to avoid empty inputs

    const [{ id: memberId }] = members.filter(
      (member) => member.name === selectedMember,
    ); // getting memberId

    const issueBook = {
      bookId: id,
      title,
      author,
      isbn,
      memberId,
      member: selectedMember,
      memberType,
      issueDate: new Date().toLocaleDateString(),
      dueDate: new Date(dueDate).toLocaleDateString("en-GB"),
      returnDate: null,
      status: "borrowed",
    };

    setDoc(doc(db, "checkouts", id), issueBook)
      .then(() => {
        setDuedate("")
        setMemberType("")
        setSelectedMember("")
        setIssueBtnClicked(false)
      })
      .catch((error) => alert(error));
  };

  console.log()
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
            <label htmlFor="user-type" className="w-32">
              Member type
            </label>
            <select
              id="user-type"
              name="user-type"
              className="border p-2 w-full"
              value={memberType}
              onChange={(e) => setMemberType(e.target.value)}
            >
              <option disabled selected>
                Select member type
              </option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="guest">Guest</option>
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

        <button className="bg-green-400 p-3 my-3 rounded-sm w-full">
          Issue Book
        </button>
      </form>
    </div>
  );
}
