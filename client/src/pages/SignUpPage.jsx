import React from "react";
import SignupForm from "../components/SignupForm/SignupForm";
import Nav from "../components/Nav/Nav";
import Gradient from "../components/Gradient";
import Spinner from "../components/Loading/Spinner";

function SignUpPage () {
    return (
        <>
        <Nav />
        <Gradient />
        <SignupForm />
        <Spinner />
        </>
      
    )
}

export default SignUpPage