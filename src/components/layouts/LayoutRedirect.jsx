import { Outlet, useParams } from "react-router-dom"
import { useFirestore } from "../hooks/useFirestore"
import { useEffect, useState } from "react"
import TitleForm from "../TitleForm"

const LayoutRedirect = () => {
  
const [loading,setLoading]=useState(true)

   const {searchUrl}=useFirestore() 
  const {nanoid} = useParams()
  
// useEffect(()=>{
//     searchUrl(nanoid).then((docSnap) =>{
//         if(docSnap.exists()){
//             window.location.href= docSnap.data().origin
//             //?este metodo lo que hace es redireccionar si existe en firebase a la url guardada. 
//         }else{
//             setLoading(false)
//         }
//     })
// },[])
useEffect(() => {
    searchUrl(nanoid).then((docSnap)=>{
        if (docSnap.exists()) {
            window.location.href=docSnap.data().origin

        }else{
            setLoading(false)
        }})
}, [])



if(loading)return <TitleForm text="Cargando..."/>

    return (
    <div
    className="mx-auto container"
    >   
    <Outlet/>
    </div>
  )
}

export default LayoutRedirect