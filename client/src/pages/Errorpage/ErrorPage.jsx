import React from "react";
import { useNavigate } from "react-router-dom";
import "./errorpage.css"

function ErrorPage () {

    const navigate = useNavigate()
    return (
     
              <div className="error__page__wrapper">
                <h1>404 - Page Not Found</h1>
                <p>Sorry, the page you are looking for could not be found.</p>

                <button id="btn" onClick={()=>navigate("/")}>Go back home</button>
              </div>
          
    )
}

export default ErrorPage