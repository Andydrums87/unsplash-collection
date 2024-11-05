import React from "react";
import imageStore from "../../stores/imageStore";
import InfiniteScroll from "react-infinite-scroll-component"
import SearchResultImages from "../Images/SearchResultsImages";

function Pagination () {

    const store = imageStore()

    return (
        <InfiniteScroll 
        dataLength={store?.images}
        next={store?.handleMore}
        hasMore={store?.hasMore}
        loader={<h1 style={{display: store.images?.length === 0 ? "none" : "block"}}
        className="load__more">Loading....</h1>}
        endMessage={<p>You have come to the end</p>}>
            
            <SearchResultImages />
        
        
        </InfiniteScroll> 
    )
}

export default Pagination;