import { create }  from "zustand"
import { unsplashURL } from "../utlis/axios"
import { mainURL } from "../utlis/axios"
import axios from "axios"
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { persist, createJSONStorage } from "zustand/middleware"
import swal from 'sweetalert';


export const imageStore = create(
 persist(
    (set, get) => ({
      keyword: {
        key: "",
       },
       images: null,
       page: 1,
       totalPages: 1,
       hasMore: true,
       isLoading: false,
       imageData: null,
       errorMessage: null,
       listedCollection: null,
       unsplashId: null,
       isOpen: false,
       collections: null,
       collection: null,
       id: "",
      
       collectionName: {
        name: "",
       },
       filteredCollections: null,
       imageFromCollection: null,
      
      handleChange: (e) => {
        const {name, value} = e.target;
        set((state) => {
            return {
                    keyword: {
                        ...state.keyword,
                        [name]: value,
                    },
                };
            });
      },
    
      handleSubmit: async (e) => {
        e.preventDefault()
        set({ images: null})
        set( { isLoading: true })
        await unsplashURL.get(`/search/photos/?query=${get().keyword.key}&per_page=20`) 
        .then(res => {
          const data = res.data.results
          set({ images: data})
          set({ isLoading: false})
        })
        .catch(err => console.log(err))
      },
      
    
      handleMore: async (e) => {
        set({ isLoading: true })
        if(get().page == get().totalPages + 1) {
          set({ hasMore: false })
          return 
        }
        await new Promise((resolve)=>setTimeout(resolve, 1000))
        await unsplashURL.get(`/search/photos/?query=${get().keyword.key}&page=${get().page}`)
        .then(res => {
            const data = res.data.results
            const tPages = res.data.results.totalPages
            set((state) => ({ images: [...state.images, ...data]}))
            set({ totalPages: tPages })

            set((state) => ({ page: state.page + 1 }))
            set({ isLoading: false })
        })
        .catch(err=>console.log(err))
      },
    
      showImage: async (e) => {
      set({ isLoading: true })
      set({ imageData: null})
      set({ unsplashId: e.target.id})
     
      await unsplashURL.get(`/photos/${get().unsplashId}`) 
      .then(res => {
        const data = res.data
        set({ imageData: {
          id: data?.id,
          unsplashId: data?.id,
          userName: data.user?.name,
          url: data?.urls,
          profileImageUrl: data.user?.profile_image.medium,
          publishedDate: data?.created_at,
          height: data?.height,
          width: data?.width,
          description: data?.alt_description,
        }})
        console.log(get().imageData)
        set({ isLoading: false})
      })
      .catch(err => console.log(err))
      },
    
      getFullImage: async () => {
             set({isLoading: true })
        
              await mainURL.get(`/image/${get().unsplashId}`)
              .then(result=> {
                const data = result.data
                set({ listedCollection: data.image })
                set({ isLoading: false })
              })
              .catch(err=>console.log(err))
      },

      fetchImages: async () => {
        set({ isLoading: true })
          await mainURL.get(`/collections/${get().id}/image`)
          .then(result=> {
              console.log(result.data.images)
              set({ images: result.data.images} )
              set({ isLoading: false})
          })
          .catch(err=>console.log(err))
      },
    
      addImage: async (e) => {
              set({ isLoading: true})
              console.log(e.target.id)
              const { imageData } = imageStore.getState()
              await mainURL.post(`/collections/${e.target.id}/image`, imageData)
              .then(res => {
                toast.success(`Image added to "${get().filteredCollections[0].name}" collection`, { 
                  icon: ({theme, type}) =>  
                  <img style={{ height: "70px", width: "70px" }}src={res.data.image.url.thumb} />})
                setTimeout(function(){
                  window.location.reload();
               }, 6000);
               const newCollections = res.data.image
               set((state) => ({ listedCollection: [...state.listedCollection, ...newCollections]}))
               set({ isLoading: false})
              
    
              })

              .catch(err=> toast.error(err))
              },

      fetchCollections: async () => {
        set({ isLoading: true})
            await mainURL.get(`/collections`) 
            .then(result => {
              set({ collections: result.data.collections})
              set({ isLoading: false})
            })
            .catch(err => console.log(err))
      },

      fetchCollection: async (id) => {
        set({ isLoading: true })
        console.log(id)
        await mainURL.get(`/collections/${id}/image`)
        .then(result => {
            // console.log(result.data)
            const data = result.data
          set({ collection: data })
          
           set({ isLoading: false })
            
          })
          .catch(err => console.log(err))
      },

      getImageFromCollection: async (e) => {
              set({ isLoading: true })
              set({ imageData: null})
              set({ unsplashId: e.target.id})
              await mainURL.get(`/image/${get().unsplashId}`)
              .then(result=> {
                const data = result.data.image
                set({ imageData: {id: data[0]?.unsplashId,
                  unsplashId: data[0]?.unsplashId,
                  userName: data[0]?.userName,
                  url: data[0]?.url,
                  profileImageUrl: data[0]?.profileImageUrl,
                  publishedDate: data[0]?.publishedDate,
                  height: data[0]?.height,
                  width: data[0]?.width,
                  description: data[0]?.description,
                }})
                set({ isLoading: false})
              })
              .catch(err=>console.log(err))
      },
    
      deleteFromCollection: async (e) => {
        swal({
          title: "Are you sure?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
          }).then((willDelete) => {
          if (willDelete) {
              mainURL.delete(`/image/${e.target.id}`)
              .then(result => {
               toast.success("Image Deleted Successfully", {
                icon: ({theme, type}) =>  
                <img style={{height: "70px", width: "70px"}} src={get().listedCollection[0].url.thumb}/>})
              //   setTimeout(function(){
              //     window.location.reload();
              //  }, 5000);
                const newCollections = [...get().listedCollection].filter(col=>{
                  return col._id !== e.target.id
                })
                set((state) => ({ listedCollection: [...state.listedCollection, ...newCollections]}))
              })
              .catch(() => {
                toast.error("Failed To Delete")
            })
              
            } 
            });
          },
        
    
      handleNewCollection: async (e) => {
              e.preventDefault()
              await mainURL.post(`/collections`, get().collectionName)
             .then(res => {
               const data = res.data.collections
               toast.success("New Collection Created")
               setTimeout(function(){
                window.location.reload();
             }, 1000);
               console.log(res);
               set((state) => ({ collections: [...state.collections, ...data]}))
            set({ isLoading: false})
             })
             .catch(err => console.log(err))
      },
             
      searchCollections: async (e) => {
              set({ filteredCollections: null})
              const { name, value} = e.target;
               set((state) => {
                   return {
                           collectionName: {
                               ...state.collectionName,
                              [name]: value,
                           },
                       };
                   });
               const filteredItems = [...get().collections].filter((c) =>
                 c.name.toLowerCase().includes(get().collectionName.name.toLowerCase())
                 );
             
                 set({ filteredCollections: filteredItems });
      },
    
      handleNavigate: async (e) => { set({ id: e.target.id }), console.log(e.target.id)},
      
            
      handleOpen: async ()=> { set({ isOpen: true })},
      handleClose: async () => { set ({ isOpen: false })},
      initialState: async () => { set({ filteredCollections: null}); set({ keyword: { key: ""}}); set({ collectionName: { name: ""}}); set({ collections: null}); set({ listedCollection: null}); set({ collection: null}) }
          

    }),
   
    {
      name: "cart", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
    
  ),
)



export default imageStore;

// handleDelete: async (e) => {
//   await axios.delete(`${get().BASE_URL}/image/${e.target.id}`)
//   .then(result => {
//       // console.log(result);
//       const newImages = get().images.filter(img=>{
//         return img._id !== e.target.id
//       })
//       set( { images: newImages })
//     })
//     .catch(err=>console.log(err))
// },   