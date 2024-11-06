import React, { useEffect } from "react";
import Nav from "../components/Nav/Nav";
import LoginForm from "../components/LoginForm/LoginForm";
import Gradient from "../components/Gradient";
import Toast from "../components/Toast/Toast";
import Spinner from "../components/Loading/Spinner";
import authStore from "../stores/authStore";




function LoginPage () {

    return (

        <div>
          <Nav /> 
         <Gradient />
        <LoginForm />
        <Spinner />
  
        </div>

    )
}

export default LoginPage;