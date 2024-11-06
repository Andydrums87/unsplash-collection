import authStore from "../stores/authStore"
import { useEffect } from "react"
import { Navigate } from "react-router-dom"
import LoginPage from "../pages/LoginPage"


export default function RequireAuth(props) {

    const store = authStore()

    // useEffect(() => {
    //     if(store.loggedIn === false) {
    //         store.checkAuth()
    //     }   
    // }, [])
 
     
    if(store.loggedIn === null) {
        return <LoginPage />
    }


    if(store.loggedIn === false) {
        return <LoginPage />
    }


    // if(store.loggedIn === null) {
    //     return <div>Loading</div>
    // }

    // if(store.loggedIn === false) {
    //     return <Navigate to="/login" />;
    // }


 



  

    return <div>{props.children}</div>
}