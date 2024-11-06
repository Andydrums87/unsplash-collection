import React, { useEffect } from "react";
import Nav from "../../components/Nav/Nav"
import Collections from "../../components/Collections/Collections";
import Modal from "../../components/Modal/Modal";
import imageStore from "../../stores/imageStore";
import "./ImageDetailsPage.css"
import Download from "../../components/Download/Download";
import MainImage from "../../components/MainImage/MainImage";
import UserInfo from "../../components/UserInfo/UserInfo";
import authStore from "../../stores/authStore";




function ImageDetailsPage () {

    const store = imageStore()
    const auth = authStore()


    useEffect(()=> {
      store.getFullImage()
    }, [])


   
    return (
     
        <div className="details__wrapper" style={{backgroundColor: store.isOpen ? "#E5E7EB" : "#FFFFFF"}}>
          <Nav />
            <div className="details__container">
              <MainImage />
              <div className="details__right">
               <UserInfo />
                <div className="btn__container">
                <button className="add__btn" id="btn" onClick={store.handleOpen}>Add to Collection</button>
                <Download />
                </div> 
                <Modal />
                <Collections />
              </div> 
            </div>
         </div>
    )
}

export default ImageDetailsPage;