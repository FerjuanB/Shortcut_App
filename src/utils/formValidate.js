export const formValidate = (getValues) => {
return {
    required:{
        value:true,
        message:"Campo obligatorio"
    },
    patternEmail:{
        value: /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i,
        message:'Formato de correo no válido.'
      },
    patternUrl:{
        value:/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/,
        message:'Formato de URL no válido.'
      },
      minLength:{
        value:6,
        message:"Debe contener al menos 6 caracteres"
      },
      trim: (v) =>{
        if(!v.trim()) {return  "No pueden ser todos espacios!"}
        else{
          return true
        }
      },
      validate(getValues){
          return{
            equals: v => v === getValues("password") || "Las contraseñas no coinciden" ,
     
        } 
    
        
      },
}    
}