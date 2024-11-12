import React from "react";
import Nav from "../../components/Nav/Nav"
import SearchInput from "../../components/SearchInput/SearchInput";
import "./searchResults.css"
import BarLoader from "../../components/Loading/BarLoader"
import SearchResults from "../../components/SearchResults/SearchResults";



function SearchResultPage () {


    return (
        <>
        <Nav />
        <BarLoader />
        <div className="gradient__container"></div>
        <div className="results__input">
        <SearchInput />
        </div>
        <SearchResults />
        <a href="/collections"></a>
        </>
    
    )
}

export default SearchResultPage