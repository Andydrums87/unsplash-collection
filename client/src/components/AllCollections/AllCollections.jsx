import React, { useEffect, useState } from "react";
import "./allCollections.css"
import imageStore from "../../stores/imageStore";
import { useNavigate } from "react-router-dom";
import { mainURL } from "../../utlis/axios"
import SlideLoader from "../Loading/SlideLoader"



function AllCollections ({id, collection}) {

    const store = imageStore()

    const navigate = useNavigate()

    const [collections, setCollections] = useState([])
    const [loading, setLoading] = useState(false)
   

    useEffect(()=> {
        setLoading(true)
        mainURL.get(`/collections/${id}/image`, { withCredentials: true})
        .then(result => {
           
            setCollections(result.data)
            setLoading(false)
          })
          .catch(err => console.log(err))
    }, [])

   

    const handleCollectionDetail = (e) => {

        navigate("/collection", { state: collection })
      }

      const length = collections.images?.length


    return (
         
            <div key={id} className="card">
               <div className="img__container" style={{backgroundColor: loading ? "#E5E7EB" : "transparent", filter: loading ? "blur(1px)" : "none"}} id={collection._id} onClick={(e)=>{store.handleNavigate(e); handleCollectionDetail(e)}}>
                    {length === 1 && 
                        <div className="full__img" id={collection._id} onClick={(e)=>{store.handleNavigate(e); handleCollectionDetail(e)}} style={{width: "100%", height: "95%", backgroundImage:`url(${collections.images[0]?.url.small})`}} />
                    }
                    {length === 2 &&  (
                    <>

                     <div className="img__left__container half__img" id={collection._id} onClick={(e)=>{store.handleNavigate(e); handleCollectionDetail(e)}} style={{width: "50%", backgroundImage: `url(${collections.images[0].url?.small})`}} >
                     {/* <img src={collections.images[0].url?.small} style={{width: "100%", height:"95%"}}/> */}
                     </div>
                     <div className="img__right__container half__img" id={collection._id} onClick={(e)=>{store.handleNavigate(e); handleCollectionDetail(e)}} style={{width: "50%", backgroundImage: `url(${collections.images[1].url?.small})`}} >

                     {/* <img src={collections.images[1].url?.small} alt="" style={{width: "100%", height: "95%"}} /> */}
                    </div>
                    </>
                    )
                    }
                    { length >= 3 && 
                    <>
                    <div className="img__left__container half__img" id={collection._id} onClick={(e)=>{store.handleNavigate(e); handleCollectionDetail(e)}} style={{width: "75%", backgroundImage: `url(${collections.images[0].url?.small})`}}>
                    {/* <img src={collections.images[0]?.url.small} style={{width: "100%", height: "95%"}}/> */}
                    </div>
                    <div className="img__right__container" style={{width: "25%"}} >
                    <div className="img__right__top thumb" id={collection._id} onClick={(e)=>{store.handleNavigate(e); handleCollectionDetail(e)}} style={{ height: "50%", backgroundImage: `url(${collections.images[1].url?.thumb})`}}></div>
                    <div className="img__right__bottom thumb" id={collection._id} onClick={(e)=>{store.handleNavigate(e); handleCollectionDetail(e)}} style={{ height: "50%",backgroundImage: `url(${collections.images[2].url?.thumb})`}}></div>
                    {/* <img src={collections.images[1]?.url.thumb} alt="" style={{width: "100%", height: "46.5%"}} />
                    <img src={collections.images[2]?.url.thumb} alt="" style={{width: "100%", height: "46.5%"}} /> */}
                    </div>
                    </>
                    }
                </div>
             <div className="card__bottom">
                <p className="collection__name" id={id} onClick={(e)=>{store.handleNavigate(e); handleCollectionDetail(e)}}>{collection.name}</p>
        <p className="collection__length">{length} {length === 1 ? " photo" : " photos"}</p>
        </div> 

        </div>


    )
}

export default AllCollections;