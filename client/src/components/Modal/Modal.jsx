import React, { useState, useEffect } from "react";
import "./Modal.css"
import imageStore from "../../stores/imageStore";
import Collection from "../Collection/Collection";




function Modal () {

  const store = imageStore()

 useEffect(()=> {
  store.fetchCollections()
 }, [])

 


    return (
        <>

        <div className="pop_up_container" style={{display: store.isOpen == false ? "none" : "block"}} >
       
      {store.listedCollection?.length > store.listedCollection?.length + 1 && console.log("hello")}
        <h1 className="popup__heading">Add To Collections</h1>
        <form onSubmit={(e)=>store.handleNewCollection(e)}>
        <input id="popup__input"className="search__input" type="text" value={store.collectionName.name} onChange={(e)=>store.searchCollections(e)} name="name" placeholder="collection name" />
        <button id="btn" style={{display: store.filteredCollections?.length == 0 ? "block" : "none"}}>New Collection</button>
        </form>

    <button className="exit__btn" id="btn" onClick={store.handleClose}>Exit</button>
     <span className="matches">{!store.filteredCollections ? "0" : store.filteredCollections?.length}  Matches</span> 

     {store.filteredCollections && store.filteredCollections?.length == 0 ? 

      <p>No Collections</p>

      :
      store.filteredCollections && store.filteredCollections?.map((c, i) => {
        return (
          
            <div key={i} className="main__container">
             <Collection collection={c} key={c._id} id={c._id}/>
             <div className="add__delete">
             {/* <img src='/src/assets/Plus.svg' alt="add image" /> */}
            <button className="add__collection" id={c._id} onClick={(e)=>{store.handleNavigate(e); store.addImage(e)}}>Add to collection</button>
             </div>

            </div>
        )
    })
    } 
        </div>

        </>
     

    )
}

export default Modal;