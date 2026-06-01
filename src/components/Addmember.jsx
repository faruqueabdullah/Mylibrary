import Form from "./Form";
import { serverTimestamp } from "firebase/firestore";
import useForm from "../hooks/useForm";
import { UseThemeContext } from "../Context/ThemeProvider";
// import { db } from "../firebase";
import { addMember } from "./firebaseServices";

export default function Addmember({ setAddClick }) {


  const{theme} = UseThemeContext()

  const {formData, errorMessage, handleChange, handleSubmit} = useForm({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      membershipType: "",
    },
    validate:handleError,
    sendData
  });

  function handleError(formData) {
    let newError = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim() === "") {
        newError[key] = `${key} should not be empty`;
      }
    });

    return newError;
  }

  async function sendData(data) {
    // console.log(data)
    const memberId = "LIB-M-" + Math.floor(1000 + Math.random() * 9000);

    const newMember = {
      ...data,
      status: "active",
      booksIssued: 0,
      fine: 0,
      registeredAt: serverTimestamp(),
    };

    addMember(memberId, newMember)
  }

  const formLabels = [
    { id: "username", heading: "Full Name", type: "text" },
    { id: "email", heading: "Email", type: "email" },
    { id: "phone", heading: "Phone", type: "tel" },
    { id: "membershipType", heading: "Membership Type", type: "text" },
  ];

  return (
    <div className={`${theme?'bg-dark/95 text-softwhite':'bg-softwhite/90 text-dark'} absolute left-0 top-0 w-full h-full flex justify-center items-center`}>
      <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errorMessage={errorMessage}
        setAddClick={setAddClick}
        formData={formData}
        formLabels={formLabels}
        formText={{ heading: "Add New Member", button: "Add member" }}
      />
    </div>
  );
}
