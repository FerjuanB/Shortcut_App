import {useContext, useState} from 'react'
import { UserContext } from '../context/UserProvider'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { firebaseErrors } from '../utils/firebaseErrors'

import FormError from '../components/FormError'
import { formValidate } from '../utils/formValidate'
import FormInput from '../components/FormInput'
import TitleForm from '../components/TitleForm'
import Button from '../components/Button'

const Register = () => {
  
  const navigate = useNavigate()
  const {registerUser} =useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const {register,handleSubmit,getValues,setError,formState:{errors}} = useForm()
    
   const {required,patternEmail,minLength,trim,validate} = formValidate()
  
  
  const onSubmit = async ({email, password}) =>{
      try {
        setLoading(true)
      await registerUser(email,password)
      alert("Registro exitoso")
      navigate("/");
    } catch (error) {
      const {code, message} = firebaseErrors(error.code)
      setError(code, {
        message 
      })
    } finally{
      setLoading(false)
    }
  }

  
  return (
    <>
      <TitleForm text="Registrate" />    
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
      type="email"
      placeholder='Ingresa tu correo' 
      label="Ingresa tu correo"
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
      label="Ingresa tu contraseña"
      error={errors.password} 
      {...register("password",{
        minLength,
        validate:trim
      })}>
      <FormError error={errors.password}/>
      </FormInput>
      <FormInput
      type="password"
      placeholder='Repite tu contraseña' 
      label='Repite tu contraseña' 
      error={errors.repassword}
      {...register("repassword", {
        validate: validate(getValues)  
      })}>
      <FormError error={errors.repassword}/>
      </FormInput>
   
    <Button 
      text="Registrate"   
      type="submit"
      loading={loading}
      color='purple'/>
   
    
    </form>
    </>
  )
}

export default Register