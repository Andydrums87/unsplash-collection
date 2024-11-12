import React, {useState, useEffect } from "react";
import { useNavigate, Navigate,  useParams } from "react-router-dom";
import axios from "axios"
import "./verifyemail.css"
import Nav from "../../components/Nav/Nav";
import Gradient from "../../components/Gradient";
import authStore from "../../stores/authStore";
import { mainURL } from "../../utlis/axios"
import styles from "../../modules/form.module.css"


function VerifyEmail (){

  
    const params = useParams()
    const navigate = useNavigate()
    const store = authStore()

    const [message, setMessage] = useState("")
    const [isVerified, setIsVerified] = useState(false)



    useEffect(()=>{
        const verifyUser = async () => {
            await mainURL.get(`/verify-email/${params.id}/verify/${params.token}`)
            .then((res)=> {
                setMessage(res.data?.message)
                setIsVerified(res.data?.success)
            })
            .catch((err) => {
                console.log(err)
                setMessage(err.response.data?.message)
                setIsVerified(err.response.data?.success)
            })
        }
        verifyUser()
    }, [params.id, params.token])

    
return (
    <>

    <Gradient />
      <div className="verify__container">
        <h1>{message}</h1>
        {isVerified ? 
        <button className={styles.authBtn}><a href="/collections"></a>Login Here</button>
        :
        <button id="btn"><a href="/login">Go Back</a></button>
        }
        

  
    </div>
    </>

)

}

export default VerifyEmail;