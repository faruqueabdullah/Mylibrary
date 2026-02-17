import { useState } from "react";
import Form from "./Form";
import { db } from "../firebase";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

export default function Addmember({ setAddClick }) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    membershipType: "",
  });

  const [errorMessage, setErrorMessage] = useState({});

  function handleChange(e) {
    let { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
    setErrorMessage((prev) => ({ ...prev, [id]: "" }));
  }

  function handleError(formData) {
    let newError = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value.trim() === "") {
        newError[key] = `${key} should not be empty`;
      }
    });

    setErrorMessage(newError);
    return newError;
  }

  function generateMemberId() {
    return "LIB-M-" + Math.floor(1000 + Math.random() * 9000);
  }

  function handleSubmit(e) {
    e.preventDefault();

    const memberId = generateMemberId()

    const checkError = handleError(formData);
    if (Object.values(checkError).length > 0) return;

    const newMember = {
      name: formData.username,
      email: formData.email,
      phone: formData.phone,
      membershipType: formData.membershipType,
      status: "active",
      booksIssued: 0,
      fine: 0,
      registeredAt: serverTimestamp(),
    };

    setDoc(doc(db, "members", memberId), newMember)
      .then(() => {
        setFormData({
          username: "",
          email: "",
          phone: "",
          membershipType: "",
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }


  const formLabels = [
    { id: "username", heading: "Full Name", type: "text" },
    { id: "email", heading: "Email", type: "email" },
    { id: "phone", heading: "Phone", type: "tel" },
    { id: "membershipType", heading: "Membership Type", type: "text" },
  ];

  return (
    <div className="absolute left-0 top-0 w-full h-full bg-[#000000e1] flex justify-center items-center">
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
