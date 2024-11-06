import authStore from "../stores/authStore"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import LoginPage from "../pages/LoginPage"
import SignUpPage from "../pages/SignUpPage"

export default function RequireAuth(props) {

    const store = authStore()
   
    useEffect(() => {
        if(store.loggedIn === false) {
            store.checkAuth()
        }
        
    }, [])

    if(store.loggedIn === null) {
        return <LoginPage />
    }

    if(store.loggedIn === false) {
        return <LoginPage />
    }


 



  

    return <div>{props.children}</div>
}