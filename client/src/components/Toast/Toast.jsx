import React from "react";
import "./toast.css"
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import imageStore from "../../stores/imageStore";

function Toast () {

    const store = imageStore()

    return (
        <ToastContainer 
        autoClose={2000}
        className="toast"
        theme="light"
        toastClassName="toast__wrapper"
        progressClassName="toast__progress" 
        bodyClassName="toast__body"
        />
    )
}

export default Toast;