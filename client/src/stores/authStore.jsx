import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { mainURL } from "../utlis/axios"
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import swal from "sweetalert"
import {eyeOff} from 'react-icons-kit/feather/eyeOff';
import {eye} from 'react-icons-kit/feather/eye'



export const authStore = create(
    persist(
      (set, get) => ({
    loggedIn: false,

    loginForm: {
        email: "",
        password: "",
    },

    signUpForm: {
        name: "",
        email: "",
        password: "",
    },
    lowerCase: /[a-z]/g,
    upperCase: /[A-Z]/g,
    numbers: /[0-9]/g,
    errorMessage: "",
    res: "",
    isValidPassword: false,
    signedUp: false,
    isLoading: false,
    icon: eyeOff,
    type: 'password',
  
   
    updateLoginForm: (e) => {

        const {name, value} = e.target;

        set((state) => {
            return {
                    loginForm: {
                        ...state.loginForm,
                        [name]: value,
                    },
                
                };
            });
    },


    handlePassword: async(e) => {
      
        const{ value } = e.target
        if(!value.match(get().lowerCase)) {
            set({errorMessage: "Password should contain lower case letters"})
            set({ isValidPassword: false})
        } else if (!value.match(get().upperCase)) {
            set({ errorMessage: "Password should contain at least one Upper Case character"})
            set({ isValidPassword: false})
        } else if (!value.match(get().numbers)) {
            set({ errorMessage: "Password should contain at least one number"})
            set({ isValidPassword: false})
        } else if (value.length < 10) {
            set({ errorMessage: "Password must contain at least 10 characters"})
            set({ isValidPassword: false})
        } else {
            set({ errorMessage: "Strong Password"})
            set({ isValidPassword: true})
        }
    },
    updateSignUpForm: (e) => {
        set({errorMessage: ""})
        const {name, value} = e.target;
     
        set((state) => {
            return {
                    signUpForm: {
                        ...state.signUpForm,
                        [name]: value,
                    },
                
                };
            });
            
    },
    login: async (e) => {
        e.preventDefault()
        set({ isLoading: true })
        set({ errorMessage: ""})
        try {
            const { loginForm } = authStore.getState()
            const res = await mainURL.post(`/login`, loginForm)
            setTimeout(()=> {
                toast.success("Successfully Logged In")
            }, 100)
               set({loggedIn: true, loginForm: {
                        email: "",
                        password: "",
                }})
                 set({ isloading: false})      
        } catch (err) { 
            set({ isLoading: false})
            set({ errorMessage: err?.response.data.message})
             }          
    },
    checkAuth: async () => {
        try {
            await mainURL.get(`/checkAuth`);
            set({ loggedIn: true});

        } catch (err) {
            set({ loggedIn: false});
     
        }
    },
    signUp: async (e) => {
        e.preventDefault()
        set({ isLoading: true })
        set({ errorMessage: ""})
        try {
            if(!get().isValidPassword) {
                set({ isLoading: false})
                return set({errorMessage: "Invalid Password"})
            }
            const { signUpForm } = authStore.getState()

            const res = await mainURL.post(`/signup`, signUpForm);
                toast(`Verification email sent to ${res.data.message}`, { position: "top-center"})
                set({singUpForm: {
                    email: "",
                    password: "",
                }})
             set({ isLoading: false })
        }
        catch (err) {
            set({ isLoading: false})
            set({ errorMessage: err?.response.data.message})
            
   
        }

    },
    logout: async () => {
        set({ isLoading: true})
        try {
            await mainURL.get(`/logout`)
            setTimeout(()=> {
                toast.success("Successfully Logged Out")
            }, 300)
            set({ loggedIn: false })
            set({ isLoading: false})
        } catch (err) {
            toast.error(`${err?.response.data.message}`)
        }
       
    },
            
    handleToggle: () => set((state)=>({
                ...state,
                    type: get().type === 'password' ? 'text' : 'password',
                icon: get().icon === eyeOff ? eye : eyeOff 
            

     })),

    forgetPasswordForm: {
        email: ""
    },

    updateForgetPasswordForm: (e) => {
        set({errorMessage: ""})
        const {name, value} = e.target;
     
        set((state) => {
            return {
                    forgetPasswordForm: {
                        ...state.forgetPasswordForm,
                        [name]: value,
                    },
                
                };
            });
            
    },


    forgetPassword: async (e) => {
            e.preventDefault()
            set({ isLoading: true })
            set({errorMessage: ""})
            const { forgetPasswordForm } = authStore.getState()
                await mainURL.post(`/forget-password`,  forgetPasswordForm )
                .then((response)=> {
                    toast.success("Password reset email sent successfully. Please check your emails")
                    console.log(response)
                    set({ forgetPasswordEmail: {
                        email: ""
                    }})
                    set({ isLoading: false})
                })
                .catch((err)=> {
                    set({ isLoading: false })
                    if(err.response?.status === 404) {
                        set({errorMessage: "Email not found"})
                    } else {
                        set( {errorMessage: "Server Error"} )
                    }
                })
    },

    resetPasswordForm: {
        newPassword: ""
    },
    updateResetPasswordForm: (e) => {
        set({errorMessage: ""})
        const {name, value} = e.target;
     
        set((state) => {
            return {
                    resetPasswordForm: {
                        ...state.resetPasswordForm,
                        [name]: value,
                    },
                
                };
            });
            
    },

    setError: async () => { set({ errorMessage: ""})},
    setLoggedIn: async () => { set({ loggedIn: false})}
    }), 
 
    {
        name: "user-session", // name of the item in the storage (must be unique)
        // storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
        partialize: (state) => ({ loggedIn: state.loggedIn, signedUp: state.signedUp})
      },
    ),
  )


export default authStore;
    //  swal({
    //             title: "Are you sure?",
    //             icon: "warning",
    //             buttons: true,
    //             dangerMode: true,
    //         }).then((willDelete) => {
    //               if (willDelete) {
    //                 await axios.get(`${get().BASE_URL}/logout`, { withCredentials: true})
    //                 swal("Logged Out!", "Successfully Logged out");
    //                 console.log(res)
    //                 set({ loggedIn: false})
    //                 .catch(() => {
    //                     console.log("failed to logout")
    //                 })  
    //                 } 
    //                 });