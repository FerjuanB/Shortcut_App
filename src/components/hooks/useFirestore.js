import { useEffect, useState } from "react"
import {db,auth} from '../firebase'
import { collection, deleteDoc, doc, getDoc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore/lite"
import { nanoid } from "nanoid"

export const useFirestore = () => { 
   
   const [data,setData] = useState([])
   const [error,setError]=useState()
   const [loading,setLoading]=useState({})



   
   const getData=async()=>{
    console.log(auth)
    try {
        setLoading(prev =>({...prev, getData:true}))
        const dataRef = collection(db, "urls")
        const q = query(dataRef,where("uid","==",auth.currentUser.uid))
        const querySnapshot = await getDocs(q);
        const dataDb = querySnapshot.docs.map(doc => doc.data())    
        setData(dataDb)                                  //!(doc=>({id:doc.id, ...doc.data()}))
    } catch (error) {
        console.log(error)
        setError(error.message)
    }finally{
        setLoading(prev =>({...prev, getData:false}))
    
    }
   }

const addData = async(url)=>{
    try {
        setLoading(prev =>({...prev, addData:true}))
        const newDoc={
            enabled:true,
            nanoid:nanoid(6),
            origin:url,
            uid:auth.currentUser.uid
        }
        const docRef = doc(db,"urls", newDoc.nanoid)
        await setDoc(docRef,newDoc)
        setData([...data,newDoc])
    } catch (error) {
        setError(error.message)
        
    }finally{
        setLoading(prev =>({...prev, addData:false}))
    }
}


const deleteUrl = async(nanoid) => {
    try {
        
        setLoading(prev =>({...prev, [nanoid]:true}))
        const docRef = doc(db,"urls", nanoid)
        await deleteDoc(docRef)
        setData(data.filter((d)=> d.nanoid !== nanoid)) //!de esta manera eliminamos de forma local para no estar haciendo constantes llamados a firestore, ya que cobra por cantidad de llamados.
    } catch (error) {
        console.log(error)
        setError(error.message)
    }finally{
        
        setLoading(prev =>({...prev, [nanoid]:false}))
    }
}
const updateUrl = async(nanoid, newOrigin) => {
    try {
        setLoading(prev =>({...prev, updateUrl:true}))
        const docRef = doc(db,"urls", nanoid)
        await updateDoc(docRef,{
            origin:newOrigin
        })
        setData(data.map(item => item.nanoid===nanoid ? ({...item, origin:newOrigin}): item))
    } catch (error) {
        setError(error.message)
    }finally{
        
        setLoading(prev =>({...prev, updateUrl:false}))
    }
  }
const searchUrl = async(nanoid) => {
    try {
        const docRef = doc(db,"urls", nanoid)
        const docSnap = await getDoc(docRef)
        console.log(docSnap)
        return docSnap
        } catch (error) {
        setError(error.message)
    }
  }
  
    return{
data,error,loading, getData, addData,deleteUrl,updateUrl,searchUrl
    }
}