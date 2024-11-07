import axios from "axios"
import authStore from "../stores/authStore";




const mainURL = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    // timeout: 5000,
    
    headers: {
        "Access-Control-Allow-Origin" : "https://unsplash-collection-backend.onrender.com",
        // "Content-type": "Application/json",
        // "Authorization": `Bearer ${store.token}`,
        // "Accept-Encoding": "*",
        
        }    

})



const accessKey = import.meta.env.VITE_UNSPLASH_KEY

const unsplashURL = axios.create({
    baseURL: "https://api.unsplash.com", 
    headers: {
        Authorization: "Client-ID " + accessKey,
    },
 
    
});

export { mainURL, unsplashURL }