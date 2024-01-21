import { useEffect, useState } from "react"
import TitleForm from "../components/TitleForm"
import { useFirestore } from "../components/hooks/useFirestore"
import Button from "../components/Button"
import { nanoid } from "nanoid"
import { formValidate } from "../utils/formValidate"
import { useForm } from "react-hook-form"
import FormInput from "../components/FormInput"
import FormError from "../components/FormError"
import { firebaseErrors } from "../utils/firebaseErrors"
import { Alert } from "flowbite-react"
const Home = () => {

  const{data,error,loading,getData,addData,deleteUrl,updateUrl} = useFirestore()
  const[text,setText]= useState('')
  const[newOr, setNewOr]=useState()
  const [copied,setCopied]=useState({})
  const {required,patternUrl} = formValidate()
  const {register,handleSubmit,resetField,setValue,setError, formState:{errors}} = useForm()


  useEffect(()=>{
    console.log(getData)
    getData()
   },[])

  if(loading.getData) return <p>Loading data ...</p>
  if(error) return <p>{error}</p>
console.log(loading)
  
const onSubmit =async ({url}) =>{
  try {
    
if(newOr){
      await updateUrl(newOr,url)
      setNewOr('')
    }else{
      await addData(url)
    }
  } catch (error) {
    const {code, message} = firebaseErrors(error.code)
    setError(code, {
      message 
    })
  }finally{

    resetField("url")
  }
}

const handleClickDelete = async (nanoid) => {
  await deleteUrl(nanoid)
 }

const handleClickUpdate = async(item) => {  
    setValue("url",item.origin)
    setNewOr(item.nanoid)
}


const pathUrl = window.location.href

const handleClickCopy = async (nanoid) => {
  await navigator.clipboard.writeText( pathUrl + nanoid)
  setCopied(()=>({[nanoid]:true}))

  console.log(copied)
}
return (
    <div>
      
      
      <TitleForm text="Bienvenido" />    
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
      label="Ingresa tu url"
      type="text"
      placeholder='Ex: www.google.com' 
      {...register("url", {
        required,
        pattern: patternUrl,
      })}
      error={errors.url}
      >
      <FormError error={errors.url}/>
      </FormInput>
       
        {
          newOr ?(
            
            <Button 
            text="edit URL"
            type="submit"
            color='cyan'
            loading={loading.updateUrl}
            />
            
            ):(
             
              <Button 
            text="ADD URL"
            type="submit"
            color='cyan'
            loading={loading.addData}
            />) 
          }
      </form>
      
          <TitleForm text="URLs registradas" />    
      {
        data.map(item=>(
          <div key={item.nanoid}
          className=" p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.nanoid}</h5>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.origin}</p>
            
            <div className="flex space-x-4">
            <Button 
            type='button'
            text='Delete'
            color='red'
            loading={loading[item.nanoid]}
            onClick={()=> handleClickDelete(item.nanoid)}
            />
            <Button 
            type='button'
            text='Update'
            color='green'
            onClick={()=> handleClickUpdate(item)}
            />
            <Button 
            type='button'
            text={copied[item.nanoid]?"Copied":"Copy"}
            color='cyan'
            onClick={()=> handleClickCopy(item.nanoid)}
            disabled={copied[item.nanoid]}
            />
            
      </div>   
          </div>
        ))
      }
    </div>
  )
}

export default Home