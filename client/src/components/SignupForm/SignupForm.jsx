import React, { useEffect, useState  } from "react";
import styles from "../../modules/form.module.css"
import authStore from "../../stores/authStore";
import "./SignupForm.css"
import  { Icon } from 'react-icons-kit';

function SignupForm () {

    const store = authStore()

    const [error, setError] = useState("")


    useEffect(()=> {
        store.setError()
        setError("")
    }, [])

 
    return (
        <div className={styles.authCard} style={{filter: store.isLoading ? "blur(5px)" : "none"}}>
            
        
            <h2 className={styles.authHeading}>SignUp Here</h2>
            
            <form onSubmit={(e)=>store.signUp(e)} className={styles.authForm}>

            <label htmlFor="">Name</label>
            <input 
            onChange={store.updateSignUpForm} 
            type="text" value={store.signUpForm.name} 
            name="name" 
            placeholder="Enter your name"
            required />

            <label htmlFor="">Email</label>
            <input 
            onChange={(e)=>{store.updateSignUpForm(e)}}
            type="email" 
            value={store.signUpForm.email} 
            name="email" 
            placeholder="Enter your email"
            required />
            <span className={styles.error__span}>You must enter a value</span>

   
        
            <label htmlFor="">Password</label>
            <div className={styles.inputWrapper}>
            <input  
            // style={{borderColor: store?.errorMessage === "Strong Password" ? "limegreen" : "red"}} 
            onChange={(e)=>{store.updateSignUpForm(e); store.handlePassword(e)}} 
            value={store.signUpForm.password} 
            autoComplete="new-password" 
            type={store.type} 
            placeholder="Enter your password"
            name="password"
            required />  
            <span className={styles.error__span}>A valid password contains a minimum of 10 characters, one UpperCase and at least one Lowercase character</span>     
            <span id={styles.toggle}className={styles.toggleIcon}onClick={store.handleToggle}>
            <Icon icon={store.icon} size={"15px"} />
            </span>
         
            </div>
     
            <label>Confirm Password</label>
            <div className={styles.inputWrapper}>
            <input 
            required
            type={store.type} 
            pattern={store.signUpForm.password} 
            placeholder="Confirm your password"
            onPaste={e=>{
            e.preventDefault()
            false
                }} />
                    <span id={styles.toggle}className={styles.toggleIcon}onClick={store.handleToggle}>
                    <Icon icon={store.icon} size={"15px"} />
                    </span>

            </div>

             <p id={styles.authErrorMsg} style={{color: store.errorMessage === "Strong Password" && "green"}}>{store?.errorMessage ? `${store?.errorMessage}` : ""}</p>
             <p id={styles.authErrorMsg} >{error ? `${error}` : ""}</p>
            
            <button type="submit" className={styles.authBtn}>Sign Up</button>
        </form>
        

        </div>
        

    )
}

export default SignupForm