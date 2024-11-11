import React from "react";
import Nav from "../../components/Nav/Nav";
import SearchInput from "../../components/SearchInput/SearchInput";
import BarLoader from "../../components/Loading/BarLoader";
import "./homePage.css"



function HomePage () {

    return (
        <>
            <Nav />
            <BarLoader />
                <div className="container">
                    <div className="container__left"></div>
                      <div className="container__middle">
                        <h3 className="heading__search">Search</h3>
                          <p className="home__info">Search high-resolution images from Unsplash</p>
                         <SearchInput />
                   
                        </div>
                    <div className="container__right"></div>
                </div>
        </>
    )
}

export default HomePage;