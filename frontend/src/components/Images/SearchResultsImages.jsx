import React from "react";
import imageStore from "../../stores/imageStore";
import { AsyncImage } from "loadable-image"
import { useNavigate } from "react-router-dom";

function SearchResultsImages () {

    const store = imageStore()
    const navigate = useNavigate()


    const showFullImage = (e) => {
        store.showImage(e)
        navigate("/detail")
    }

    return (
        <div id="scrollable" className="results__container">
        {store.images?.length === 0 && <p className="no__images">No Images Found</p>}
        {store.images && store.images?.map((d, index) => {

            return (
                <AsyncImage 
                onClick={(e)=>showFullImage(e)}
                id={d.id}
                key={index}
                className="results__single__img"
                src={d.urls?.regular}
                alt={d.alt_decription}
                loader={<div style={{background: "#e5e7eb" }}>
                    <div className="loading__slide"></div>
                </div>}
                error={<div style={{background: "red" }}/>}
                style={{ height: d.height / 15 }}
                />
            
            )
        })}
         </div>
    )
}

export default SearchResultsImages;

