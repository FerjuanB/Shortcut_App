import { useContext } from "react"
import { NavLink, Link } from "react-router-dom"
import { UserContext } from "../context/UserProvider"


const NavBar = () => {
  
  const {user,signOutUser}= useContext(UserContext)
    
  const handleClickLogOut = async ()=>{
try {
  await signOutUser() 
} catch (error) {
  console.log(error.code)
}
  }
  return (
        <nav>
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/" className="flex items-center">
            <span className="self-center text-3xl text-sky-200 font-bold whitespace-nowrap dark:text-white">
Genera tu propio Short Cut            </span>
          </Link>
          <div className="flex space-x-4">
          {user ?

(
  <>
            <NavLink to="/" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Inicio</NavLink>
            
            <button onClick={handleClickLogOut}className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">LogOut</button>  
            </>)
            :
            
            (<>
<NavLink to="/login" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</NavLink>
<NavLink to="/register" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Registrate</NavLink>

</>
 )}
           

          </div>
 </div>
</nav>
  )

}

export default NavBar