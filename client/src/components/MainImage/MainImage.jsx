import React, { useEffect } from "react";
import { AsyncImage } from "loadable-image"
import imageStore from "../../stores/imageStore";

function MainImage () {

    const store = imageStore()



    return (

        <div className="details__left">   
                      <AsyncImage 
                      src={store.imageData?.url.full}
                      alt={store.imageData?.description}
                      className="main__img"
                      loader={<div style={{background: "#e5e7eb"}}>
                      <div className="loading__slide"></div>
                      </div>}
                      error={<div style={{background: "red" }}/>}
                      />  
        
                     </div>
    )
}

export default MainImage;

