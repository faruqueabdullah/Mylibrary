import { UseThemeContext } from "../Context/ThemeProvider";

export default function Form({
  handleSubmit,
  handleChange,
  errorMessage,
  formData,
  setAddClick,
  formLabels,
  formText,
  isEdit,
  setIsEdit
}) {

// console.log(formData)

const{theme} = UseThemeContext()


  return (
    <>
      <form
        onSubmit={handleSubmit}
        className={`${theme?'bg-dark':'bg-softwhite'} add-member-form w-sm border p-5 rounded-xl`}
      >
        <div className="heading flex justify-between items-center pb-5">
          <h2 className="text-2xl font-semibold">{formText.heading}</h2>
          <span
            onClick={() => {
              setAddClick(false);
              setIsEdit(false)
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
                  className={`${theme?'bg-dark':'bg-softwhite'} border p-2 `}
                  name={label.id}
                  value={formData.membershipType}
                  onChange={handleChange}
                >
                  <option hidden>Student</option>
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
          {
            isEdit?formText.edit:formText.button
          }
        </button>
      </form>
    </>
  );
}
