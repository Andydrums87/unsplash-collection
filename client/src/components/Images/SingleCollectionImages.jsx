import React from "react";
import imageStore from "../../stores/imageStore";
import { useNavigate, useLocation } from "react-router-dom";
import { AsyncImage } from "loadable-image"

function SingleCollectionImages () {

    const store = imageStore()

    const navigate = useNavigate()

    const handleNavigate = (e) => {
        store.getImageFromCollection(e)
         navigate("/detail")
       }

    return (

        <div className="results__container">
        {store.images && store.images.map((d, i) => {
     return (
         <div key={i} >
            <AsyncImage 
             onClick={(e)=>handleNavigate(e)}
             className="results__single__img"
             id={d.unsplashId}
             src={d.url?.small}
             alt={d.description}
             loader={<div style={{background: "#e5e7eb" }}>
             <div className="loading__slide"></div>
         </div>}
             error={<div style={{background: "red" }}/>}
             style={{ height: d.height / 15, borderRadius: "5px"}}
             />
          </div>


     )
   
 })}  

       </div>

    )
}

export default SingleCollectionImages