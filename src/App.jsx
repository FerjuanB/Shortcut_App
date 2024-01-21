import { Route, Routes } from "react-router-dom"
import { useContext } from "react"
import { UserContext } from "./context/UserProvider"


import Login from "./Views/Login"
import Home from "./Views/Home"
import Register from "./Views/Register"
import UserProfile from "./Views/UserProfile"
import NotFound from "./Views/NotFound"


import NavBar from "./components/NavBar"
import LayoutContainer from "./components/layouts/LayoutContainer"
import LayoutRequireAuth from "./components/layouts/LayoutRequireAuth"
import LayoutRedirect from "./components/layouts/LayoutRedirect"


const App = () => {
  
  const {user}=useContext(UserContext)
  
  if(user===false || null){
    return <p>
      Loading...
    </p>
  }
  //*este componente, el requireAuth va a ser una ruta protegida, la cual si no está autenticado, va a ir a "login", la ruta que especificamos en el componente de require. 
  return (   
    <> 
<div class="fixed top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]">

<NavBar/>
    <Routes>

    <Route path="/" element={<LayoutRequireAuth/>}>
    
          <Route index element={<Home/>} />
          <Route path="/perfil" element={<UserProfile/>} />

    </Route>

    
      <Route path="/" element={<LayoutContainer/>}>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/register" element={<Register />}/>
    </Route>
   
    <Route path="/:nanoid" element={<LayoutRedirect/>}>
       <Route index element={<NotFound/>}/>
    </Route>
    </Routes>
</div>
  </>   



  )
}

export default App