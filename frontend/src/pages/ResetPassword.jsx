import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { mainURL } from "../utlis/axios"
import 'react-toastify/dist/ReactToastify.css';
import Nav from "../components/Nav/Nav";
import Gradient from "../components/Gradient";
import authStore from "../stores/authStore";
import Icon from "react-icons-kit";
import styles from "../modules/form.module.css"

const ResetPassword = () => {

    const params = useParams()
    const navigate = useNavigate()
    const store = authStore()

    const [newPassword, setNewPassword] = useState("")
    const [error, setError] = useState("")

    const submitNewPassword = async (e) => {
        e.preventDefault()
        await mainURL.post(`/resetPassword/${params.token}`, { newPassword })
        .then((response)=> {
            toast.success("Password Updated")
            console.log(response)
            setTimeout(()=> {
                    navigate("/collections")
            }, 2000)
        })
        .catch((err)=> {
            if(err.response.status === 404) {
                setError("Password not accepted")
            } else {
                setError("Internal Server Error")
            }
        })
    }

    return (
        <div className={styles.authWrapper}>
        <Nav />
        <Gradient />
        <div className={styles.authCard}>
        <h2 className={styles.authHeading}>Reset your Password</h2>
        <p className={styles.authInfo}>Please enter a new password for your account.</p>
        <form className={styles.authForm} onSubmit={submitNewPassword}>
        <label htmlFor="">New Password</label>
        <div className={styles.inputWrapper}>
        <input 
        onChange={(e)=>{setNewPassword(e.target.value); store.handlePassword(e)}} 
        value={newPassword} 
        autoComplete="new-password" 
        type={store.type} 
        name="newPassword"
        required 
        />
        <span id={styles.toggle}className={styles.toggleIcon}onClick={store.handleToggle}>
        <Icon icon={store.icon} size={"15px"} />
        </span>
        </div>
        <span className={styles.error__span}>You must enter a value</span>
        
        <label>Confirm Password</label>
        <div className={styles.inputWrapper}>
        <input 
        type={store.type} 
        pattern={newPassword} 
        autoComplete="new-password"  
        onPaste={e=>{
             e.preventDefault()
                false
       
        }}
        required />
        <span  id={styles.toggle}className={styles.toggleIcon}onClick={store.handleToggle}>
        <Icon icon={store.icon} size={"15px"} />
        </span>
        </div>
        <span className={styles.error__span}>You must enter a value</span>
      
                      
        <p id={styles.authErrorMsg}>{error ? `${error}` : ""}</p>
        <p id={styles.authErrorMsg} style={{color: store.errorMessage === "Strong Password" && "green"}}>{store?.errorMessage ? `${store?.errorMessage}` : ""}</p>
        <button className={styles.authBtn}>Reset Password</button>
        </form>
        </div>
        <button id="back__btn" className={styles.authBtn} onClick={()=>navigate("/collections")}>Back to login</button>
        </div>

    )
}

export default ResetPassword