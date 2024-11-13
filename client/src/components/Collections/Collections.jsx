import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import imageStore from "../../stores/imageStore";
import Collection from "../Collection/Collection";
import "./collections.css" 



function Collections () {


   const store = imageStore()

    useEffect(() => {
      store.fetchImages()
    }, [])

    useEffect(()=> {
      store.addImage()
    }, [])


    if(store.listedCollection?.length === 0) return  <p className="collections__err">this image doesn't belong to any collections</p>


    return (

        <div>
           {store?.listedCollection && store.listedCollection?.map((img, i) => {
             return (
              <div key={i}>
                {img.singleCollection?.map((c, i) => {
                  return (
                    <div key={i} className="main__container">
                      <Collection 
                      collection={c} 
                      key={c._id} 
                      id={c._id} 
                      />
                        <div className="add__delete">
                          {/* <img src="src/assets/Remove.svg" alt="Delete Photo" /> */}
                      <button className="delete__collection" id={img._id} onClick={(e)=>store.deleteFromCollection(e)}>Remove</button>
                        </div>
                      </div>
         )
              })}
              </div>
            )

              })}
        </div>
  
    )
  }

export default Collections;

