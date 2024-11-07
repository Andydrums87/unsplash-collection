import React from "react"
import "./loading.css"
import ClipLoader from "react-spinners/ClipLoader";
import imageStore from "../../stores/imageStore";
import authStore from "../../stores/authStore";


function Spinner () {

    const store = imageStore() 
    const auth = authStore()


    if(store?.isLoading || auth?.isLoading)

    return (
        <>
            <div className="spinner__container">
    <ClipLoader
    loading={auth?.isLoading || store?.isLoading}
    size={40}
    aria-label="Loading Spinner"
    data-testid="loader"
    />
    
    </div>
    <p>Loading....</p>
        </>

    )


}

export default Spinner;


