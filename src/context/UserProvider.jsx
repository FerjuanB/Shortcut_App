
import { createContext,useEffect,useState } from "react"
import {createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { auth } from "../components/firebase";
export const UserContext = createContext()
const UserProvider = (props) => {
  
    const [user, setUser] =useState(false)

useEffect(() => {
  const unsuscribe = onAuthStateChanged(auth, (user)=>{
  console.log(user)
  if(user){
    const {displayName,email,photoURL,uid} = user
    setUser({displayName,email,photoURL,uid})
  }else{
    setUser(null)
  }
  })

  return () => {
    unsuscribe()
  }
}, [])


    //*registrar usuario
    const registerUser = async (email,password)=> {
      
        await createUserWithEmailAndPassword(auth,email,password)
        
    }

    //?loguear usuario
    const loginUser = async (email,password)=>{
      
        await signInWithEmailAndPassword(auth,email,password)
        
       
    }

    //!desloguear un usuario
    const signOutUser = ()=> signOut(auth);
    
    return (
        <UserContext.Provider value={{user,setUser, registerUser,loginUser, signOutUser}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserProvider