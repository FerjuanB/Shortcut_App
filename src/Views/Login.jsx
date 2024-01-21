import { useContext, useState } from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { firebaseErrors } from "../utils/firebaseErrors"
import FormError from "../components/FormError"
import FormInput from "../components/FormInput"
import { formValidate } from "../utils/formValidate"
import TitleForm from "../components/TitleForm"
import Button from "../components/Button"
import Swal from "sweetalert2"


const Login = () => {
  
  const {loginUser}= useContext(UserContext)
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false);


  const {register,handleSubmit,setError,formState:{errors}} = useForm()

  const {required,patternEmail,minLength,trim} = formValidate()

  const onSubmit = async ({email, password}) =>{
    try {
    setIsLoading(true)
    await loginUser(email,password)
    navigate("/");
    Swal.fire("Ingreso exitoso")
   
  } catch (error) {
    console.log(error.code)
    const {code, message} = firebaseErrors(error.code)
    setError(code, {
      message 
    })
    Swal.fire(message)
  }finally {
    setIsLoading(false); // Desactivar el estado de carga, ya sea que la petición sea exitosa o no
  }
}

 return (
    
     <>
   <TitleForm text="Inicia Sesión"/>
   <div className="">
    <form onSubmit={handleSubmit(onSubmit)} className="items-center flex flex-col">
    <FormError error={errors.firebase}/>
    <FormInput
      type="email"
      placeholder='Ingresa tu correo'   
      label='Ingresa tu correo'   
      error={errors.email}
      {...register("email", {
        required,
        pattern: patternEmail,
      })}>
      <FormError error={errors.email}/>
      </FormInput>
      <FormInput
      type="password"
      placeholder='Ingresa tu contraseña' 
      label='Ingresa tu contraseña' 
      error={errors.password}
      {...register("password",{
        minLength,
        validate:trim
      })}>
      <FormError error={errors.password}/>
      </FormInput>
      
          <Button 
            text="Ingresa"
            type="submit"
            color="purple"
            loading={isLoading}/>

     
    </form>
    </div>
            </>

  )
}

export default Login