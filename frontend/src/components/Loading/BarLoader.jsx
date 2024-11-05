import React from "react";
import "./loading.css"
import imageStore from "../../stores/imageStore";
import BarLoader from "react-spinners/BarLoader";


function Loading () {

    const store = imageStore()

    return (
        <div className="loading__container" style={{visibility: store.isLoading ? "visible" : "hidden"}}>
        <BarLoader
        color={"#3662e3"}
        className="bar__loading"
        loading={store.isLoading}
        style={{width: "100%"}}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={2}
        />
    </div>

    )
}

export default Loading