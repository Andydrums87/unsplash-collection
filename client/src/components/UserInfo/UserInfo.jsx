import React from "react";
import imageStore from "../../stores/imageStore";
import Spinner from "../Loading/Spinner";
import BarLoader from "../Loading/BarLoader"

function UserInfo () {

    const store = imageStore()

    const formattedDate = new Date(store.imageData?.publishedDate).toLocaleDateString('en-GB', { year:'numeric', month: 'long', day: 'numeric'})



    return (
        <>
          <ul className="user__info__top">
          
             <li><img src={store.imageData?.profileImageUrl} alt="user profile image" className="user__profile__img" /></li> 
             <li className="username">{store.imageData?.userName}</li>  
        </ul>

        <p className="published__date">Published On: 
         {" " + formattedDate}</p>
        </>
      

    )
}

export default UserInfo;