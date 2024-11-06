import React, { useEffect, useState, useRef } from "react";
import "./LoginForm.css"
import styles from "../../modules/form.module.css"
import { mainURL } from "../../utlis/axios"
import { useNavigate } from "react-router-dom";
import authStore from "../../stores/authStore";
import swal from "sweetalert";
import  { Icon }  from 'react-icons-kit';


function LoginForm () {

    const navigate = useNavigate()

    const store = authStore()

    useEffect(()=> {
        store.setError()
    }, [])

    const handleClick = () => {
        navigate("/signup")
    }

// const handleVerify = async () => {
//     try {
//         await mainURL.post(`/resendEmail`, store.loginForm);
//             swal(`Verification link sent to ${store.loginForm?.email}. Just click on the link in the email to complete your signup. 
//                 If you don't see it you may need to check your spam folder`);
              
            
//     } catch (err) {
//         console.log(err)
//     }
    
// }


    return (
       <div className="blur" style={{filter: store.isLoading ? "blur(5px)" : "none"}}>
            <div className={styles.authCard}>
        <h2 className={styles.authHeading}>Login Here</h2>
        <form onSubmit={(e)=>store.login(e)} className={styles.authForm}>   
        <label htmlFor="">Email</label>
        <input 
        required 
        onChange={store.updateLoginForm} 
        type="email" value={store.loginForm.email} 
        autoComplete="email" 
        name="email" 
        placeholder="Enter your email" />
        <span className={styles.error__span}>You must enter a value</span>
        <label htmlFor="">Password</label>
        <div className={styles.inputWrapper}>
        <input 
        required 
        onChange={store.updateLoginForm} 
        value={store.loginForm.password} 
        autoComplete="new-password" 
        type={store.type} 
        name="password" 
        placeholder="enter your password" />    
        <span className={styles.error__span}>You must enter a value</span>   
            <span id={styles.toggle}className={styles.toggleIcon}onClick={store.handleToggle}>
                <Icon icon={store.icon} size={"15px"} />
            </span>
        </div>
      
    
        <label>Confirm Password</label>
        <div className={styles.inputWrapper}>
        <input 
        required 
        type={store.type} 
        pattern={store.loginForm.password} 
        placeholder="confirm your password" 
        autoComplete="new-password" 
        onPaste={e=>{
            e.preventDefault()
                false
        }} /> 
                <span id={styles.toggle}className={styles.toggleIcon}onClick={store.handleToggle}>
                    <Icon icon={store.icon} size={"15px"} />
                </span>
     
        </div> 
     
            <a id={styles.smallText} href="/forget-password">Forgotten Password?</a>
                
            <p id={styles.authErrorMsg}>{store?.errorMessage ? `${store?.errorMessage}` : ""}</p>
            
            {/* <button  onClick={handleVerify} style={{display: store?.errorMessage === "Please verify your account" ? "block" : "none"}}>Verify Account</button> */}
            <button className={styles.authBtn}>Login</button>
        </form>
        
        <p className={styles.authInfo}>Don't have an account? <a onClick={handleClick}>Join</a></p>
      
     </div>
       </div>
   
    )
}

export default LoginForm;