import React, { useState, useEffect } from "react";
import styles from "../modules/form.module.css"
import 'react-toastify/dist/ReactToastify.css';
import Nav from "../components/Nav/Nav";
import Gradient from "../components/Gradient";
import authStore from "../stores/authStore";
import Spinner from "../components/Loading/Spinner";


const ForgetPassword = () => {

    const store = authStore()


        return (
            <>
            <Nav />
            <Gradient />
            <div className={styles.authWrapper}>
            <div className={styles.authCard} style={{filter: store.isLoading ? "blur(5px)" : "none"}}>
                 
            <form onSubmit={store.forgetPassword} className={styles.authForm}>
            <h2 className={styles.authHeading}>Forgot Your Password</h2>
            <p className={styles.authInfo}>Please enter the email address you'd like your reset link to be sent to.</p>
            <label htmlFor="">Enter email address</label>
            <input 
            onChange={store.updateForgetPasswordForm} 
            type="email" 
            name="email" 
            value={store.updateForgetPasswordForm.email} 
            autoComplete="email" 
            placeholder="Enter your email address..."
            required
            />
            <span className={styles.error__span}>You must enter a value</span>
            <p id={styles.authErrorMsg}>{store.errorMessage ? `${store.errorMessage}` : ""}</p>
            <button className={styles.authBtn} type="submit">Request reset link</button>
            </form>
             </div>
            <Spinner />
            </div>
            </>


       

        )
    


   
    
}

export default ForgetPassword;