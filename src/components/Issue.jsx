export default function Issue({ setIssueBtnClicked, bookDetails }) {
  return (
    <div className="absolute left-0 top-0 w-full h-full bg-[#000000e1] flex justify-center items-center">
      <form className="add-member-form w-sm border p-5 rounded-xl bg-soft-bg">
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
          <label htmlFor="username"></label>
          <select>
            <option value="student">Student</option>
            <option value="teacher">Teacher</option>
            <option value="guest">Guest</option>
          </select>
          <input className="border p-1" type="text" />
        </div>

        <button className="bg-green-400 p-3 my-3 rounded-sm w-full">
          Issue Book
        </button>
      </form>
    </div>
  );
}
