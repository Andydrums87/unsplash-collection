import React, { useEffect, useState } from "react";
import imageStore from "../../stores/imageStore";
import { useNavigate  } from "react-router-dom";
import { mainURL } from "../../utlis/axios"
import "./collection.css"
import { AsyncImage } from "loadable-image";

function Collection ({id, collection, hidden}) {
    
    const store = imageStore()

    const navigate = useNavigate()

    const [collections, setCollections] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(()=> {
        setLoading(false)
        mainURL.get(`/collections/${id}/image`)
        .then(result => {
         setCollections(result.data)
         setLoading(true)
        
        })
      .catch(err => console.log(err))
    }, [])

useEffect(()=> {
    store.getFullImage()
}, [])



const handleCollectionDetail = (e) => {
    navigate("/collection", { state: collection})
  }

  const noOfImages = collections.images?.length

  const image = collections.images && collections.images[0] || store.images
  


    return (
        
    <div key={id} className="collection__card">
        <AsyncImage 
            className="collection__img"
            src={image.url?.thumb}
            alt={image?.description}
            loader={<div style={{background: "#e5e7eb" }}>
                    <div className="loading__slide"></div>
                    </div>}
            error={<div style={{background: "red" }} />}
            style={{ height: "100%" }}
        />

        <div className="card__middle">
        <p className="collection__name"id={id} onClick={(e)=>{store.handleNavigate(e); handleCollectionDetail(e)}}>{collection.name}</p>
        <p className="collection__length">{noOfImages}{noOfImages === 1 ? " photo" : " photos"}</p>
     
    </div>
        

        </div>
     
    )
}

export default Collection;