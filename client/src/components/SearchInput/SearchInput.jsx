import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import "./SearchInput.css"
import axios from "axios";
import imageStore from "../../stores/imageStore";
import Search from "../../assets/Search.svg"


function SearchInput () {
 

    const store = imageStore()
   
  
    const navigate = useNavigate()
  
    const handleNavigate = (e) => {
      navigate("/results")
    }

    return (
      <div>
          <form className="search__form" onSubmit={(e)=>{store.handleSubmit(e); handleNavigate(e)}}>
          <input className="search__input" type="text" value={store.keyword.key} name="key" onChange={store.handleChange}  placeholder="Enter your keywords..." />
          <img className="search__glass" src={Search} alt="search glass" onClick={(e)=>{store.handleSubmit(e); handleNavigate(e)}} />
         </form>
      </div>
     
    )
}

export default SearchInput;
