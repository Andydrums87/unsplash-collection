import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Nav from "../components/Nav/Nav"
import imageStore from "../stores/imageStore";
import SingleCollectionImages from "../components/Images/SingleCollectionImages";


function SingleCollectionPage () {
  const location = useLocation()
  const store = imageStore()
  const data = location.state

    useEffect(() => {
    store.fetchImages()
  }, [])

  
    return (
       <div>
        <Nav />
        <div className="single__collection__info" style={{textAlign: "center", marginTop: "20px"}}>
        <p className="heading__title">{data?.name}</p>
        <p >{store.images?.length} Photos</p>
        </div>
        <SingleCollectionImages />    
       </div>
       
    )
}

export default SingleCollectionPage;

