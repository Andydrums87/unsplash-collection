import axios from "axios"





const mainURL = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
    timeout: 10000,

})

mainURL.interceptors.request.use(
    config => {
        config.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`
        return config
    }, 
    error => {
        return Promise.reject(error)
    }
)



const accessKey = import.meta.env.VITE_UNSPLASH_KEY

const unsplashURL = axios.create({
    baseURL: "https://api.unsplash.com", 
    headers: {
        Authorization: "Client-ID " + accessKey,
    },
 
    
});

export { mainURL, unsplashURL }