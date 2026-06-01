import Form from "./Form";
import { serverTimestamp } from "firebase/firestore";
import useForm from "../hooks/useForm";
import { UseThemeContext } from "../Context/ThemeProvider";
// import { db } from "../firebase";
import { addMember, updateMember } from "./firebaseServices";
import { useEffect } from "react";
import { UseFirebaseContext } from "../Context/Firebaseprovider";

export default function Addmember({
  setIsEdit,
  isEdit,
  memberDetails,
  setAddClick,
}) {
  const { theme } = UseThemeContext();
  const { members } = UseFirebaseContext();

  const { formData, errorMessage, handleChange, handleSubmit, setFormData } =
    useForm({
      initialValues: {
        username: "",
        email: "",
        phone: "",
        membershipType: "",
      },
      validate: handleError,
      sendData,
    });

  // console.log(memberDetails)

  // filling form data (form inputs) when click on edit.
  useEffect(() => {
    if ((isEdit, memberDetails)) {
      const { username, email, phone, membershipType } = memberDetails;
      setFormData({ username, email, phone, membershipType });
    }
  }, [isEdit, memberDetails]);

  // updating member details
  function updateMemberDetails() {
    const memberObj = {};
    const [member] = members.filter((member) => member.id === memberDetails.id);

    Object.entries(formData).forEach(([key, value]) => {
      memberObj[key] = value;
    });

    updateMember(member.id, { ...member, ...memberObj });
  }

  // checking empty inputs and displaying error
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
    if (isEdit && memberDetails) {
      updateMemberDetails();
      return
    }

    const memberId = "LIB-M-" + Math.floor(1000 + Math.random() * 9000);

    const newMember = {
      ...data,
      status: "active",
      booksIssued: 0,
      fine: 0,
      registeredAt: serverTimestamp(),
    };

    addMember(memberId, newMember);
  }

  const formLabels = [
    { id: "username", heading: "Full Name", type: "text" },
    { id: "email", heading: "Email", type: "email" },
    { id: "phone", heading: "Phone", type: "tel" },
    { id: "membershipType", heading: "Membership Type", type: "text" },
  ];

  return (
    <div
      className={`${theme ? "bg-dark/95 text-softwhite" : "bg-softwhite/90 text-dark"} absolute left-0 top-0 w-full h-full flex justify-center items-center`}
    >
      <Form
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        errorMessage={errorMessage}
        setAddClick={setAddClick}
        formData={formData}
        formLabels={formLabels}
        setIsEdit={setIsEdit}
        isEdit={isEdit}
        formText={{
          heading: "Add New Member",
          button: "Add member",
          edit: "Edit member",
        }}
      />
    </div>
  );
}
