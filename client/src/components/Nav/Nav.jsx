import React from "react";
import "./nav.css"
import Logo from "../../assets/Logo.svg"
import { useNavigate, NavLink } from "react-router-dom";
import authStore from "../../stores/authStore";
import { imageStore } from "../../stores/imageStore";
import 'react-toastify/dist/ReactToastify.css';
import Toast from "../Toast/Toast";
import Spinner from "../Loading/Spinner";


function Nav () {

    const navigate = useNavigate()
    const store = authStore()
    const image = imageStore()

    const handleNavigate = async () => {
        await store.logout();
        imageStore.persist.clearStorage();
        image.initialState()
        navigate("/login")
    }

    return (
        <nav className="navBar" style={{borderColor: image.isOpen ? "#E5E7EBCC" : "#E5E7EB"}}>
        <ul>  
            <Toast />    
                 <li className="logo"><img src={Logo} alt="logo" /></li>
                 <li><NavLink to="/">Home</NavLink></li>
                 <li><NavLink to="/collections">Collections</NavLink></li>
                 <li className="logout" onClick={handleNavigate} style={{display: store.loggedIn === false ? "none" : "block"}}>Logout</li>
            </ul>
        
        </nav>

    )
}

export default Nav;