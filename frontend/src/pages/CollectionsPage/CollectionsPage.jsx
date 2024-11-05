import React, { useState, useEffect } from "react";
import Nav from "../../components/Nav/Nav";
import imageStore from "../../stores/imageStore";
import AllCollections from "../../components/AllCollections/AllCollections"

import "./collectionspage.css"
import Toast from "../../components/Toast/Toast";

import Spinner from "../../components/Loading/Spinner";




function CollectionsPage () {

    const store = imageStore()

    useEffect(() => {
        store.fetchCollections()
    }, [])
    

    
    if(store?.isLoading) return <Spinner />


    return (
        <>
         <Nav />
   
            <div className="collections__container">
            <div className="collections__info">
            <h1 className="heading__title"> Collections</h1>
            <p>Explore the world through collections of beautiful 
                photos free to use under the <span className="span">Unsplash License.</span></p>
            </div>
            <div className="card__container"> 

            <p>{store.collections?.length <= 0 ? "No collections" : ""}</p>
            
            {store.collections && store.collections.map((c, i)=> {
            return (
                <AllCollections collection={c} key={c._id} id={c._id}/>
                )
                })}
   
        </div>
        </div>
        </>
    )
}

export default CollectionsPage;