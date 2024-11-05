import React from "react"
import imageStore from "../../stores/imageStore"
import { toast } from "react-toastify"


const Download = () => {

  const store = imageStore()


    const handleDownload = async () => {
      const url = store.imageData.url?.raw
      const name = store.imageData?.description
      console.log(name)
      const data = await fetch(url)
      const blob = await data.blob()
      const urlBlob = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = urlBlob
      a.download = name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      setTimeout(()=> {
        toast.success("Download completed")
      }, 2000)
     
    }

    return (

<button onClick={handleDownload} className="download__btn glow-on-hover" id="btn">Download</button>
    )
}

export default Download;