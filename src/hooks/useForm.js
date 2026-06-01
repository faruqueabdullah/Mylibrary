import { useState } from "react";


function useForm({ initialValues, validate, sendData }) {
    const [formData, setFormData] = useState(initialValues)
    const [errorMessage, setErrorMessage] = useState({})

    function handleChange(e) {
        let { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
        setErrorMessage((prev) => ({ ...prev, [id]: "" }));
    }
    // console.log(formData)

    async function handleSubmit(e) {
        e.preventDefault();


        // check for errors
        const checkError = validate(formData)

        if (Object.keys(checkError).length) {
            setErrorMessage(checkError)
            return
        }
        // if there is no error call the sendData function with newly updated data
        sendData(formData)
        
        // clear input field after submission
        setFormData(initialValues)

    }


    return ({ formData, errorMessage, handleChange, handleSubmit, setFormData })
}

export default useForm;