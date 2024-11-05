import React, { useEffect, useState } from "react";
import imageStore from "../../stores/imageStore";
import { useNavigate  } from "react-router-dom";
import { mainURL } from "../../utlis/axios"
import "./collection.css"

function Collection ({id, collection}) {
    
    const store = imageStore()

    const navigate = useNavigate()

    const [collections, setCollections] = useState([])

    

    useEffect(()=> {
        mainURL.get(`/collections/${id}/image`)
        .then(result => {
         setCollections(result.data)
        
        })
      .catch(err => console.log(err))
    }, [])

useEffect(()=> {
    store.getFullImage()
}, [])



const handleCollectionDetail = (e) => {
    navigate("/collection", { state: collection})
  }
  

    return (
        
    <div key={id} className="collection__card">
        <img className="collection__img" src={collections.images && collections.images[0]?.url.thumb} />
        <div className="card__middle">
        <p className="collection__name"id={id} onClick={(e)=>{store.handleNavigate(e); handleCollectionDetail(e)}}>{collection.name}</p>
        <p className="collection__length">{collections.images?.length} photos</p>
     
    </div>
        

        </div>
     
    )
}

export default Collection;