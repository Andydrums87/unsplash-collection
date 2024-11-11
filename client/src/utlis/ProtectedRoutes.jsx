import authStore from "../stores/authStore"
import { Navigate } from "react-router-dom"
import { useEffect } from "react"
import LoginForm from "../components/LoginForm/LoginForm"
import Nav from "../components/Nav/Nav"
import Gradient from "../components/Gradient"
import LoginPage from "../pages/LoginPage"

export default function ProtectedRoutes(props) {
    const store = authStore()


    useEffect(() => {
        if(store.loggedIn === null) {
            store.checkAuth()
        }
    }, [])

    // if(store.loggedIn === null) {
    //     return <div>Loading</div>
    // }

    if(store.loggedIn === false) {
        return <LoginForm />
         
    
    }

    return <div>{props.children}</div>
}