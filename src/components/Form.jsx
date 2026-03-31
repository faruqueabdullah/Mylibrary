export default function Form({
  handleSubmit,
  handleChange,
  errorMessage,
  formData,
  setAddClick,
  formLabels,
  formText,
  setBookDetails,
}) {
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="add-member-form w-sm border p-5 rounded-xl bg-soft-bg"
      >
        <div className="heading flex justify-between items-center pb-5">
          <h2 className="text-2xl font-semibold">{formText.heading}</h2>
          <span
            onClick={() => {
              setAddClick(false);
              setBookDetails(null);
            }}
            className="text-xl cursor-pointer"
          >
            X
          </span>
        </div>

        {formLabels.map((label) => {
          return (
            <div className="flex flex-col gap-1 my-3" key={label.id}>
              <label htmlFor="username">{label.heading}</label>
              {errorMessage[label.id] && (
                <span className="text-red-500 text-sm">
                  {errorMessage[label.id]}
                </span>
              )}
              {label.id === "membershipType" ? (
                <select
                  id={label.id}
                  className="border p-2"
                  name={label.id}
                  value={formData.membershipType}
                  onChange={handleChange}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="guest">Guest</option>
                </select>
              ) : (
                <input
                  id={label.id}
                  className="border p-1"
                  type={label.type}
                  name={label.id}
                  value={formData[label.id]}
                  onChange={handleChange}
                />
              )}
            </div>
          );
        })}

        <button className="bg-green-400 p-3 my-3 rounded-sm w-full">
          {formText.button}
        </button>
      </form>
    </>
  );
}
