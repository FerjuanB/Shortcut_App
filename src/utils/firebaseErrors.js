
export const firebaseErrors = (code) => {
    switch(code){
        case 'auth/email-already-in-use':
            return {
                code:"email",
                message:"Usuario ya registrado"
            }
        case "auth/invalid-email":
            return {
                code:"email",
                message:"Formato de correo no válido"
            }
        case "auth/invalid-credential":
            return {
                code:"email",
                message:"Usuario y/o contraseña erróneos"
            }
            
          default:
            return "hubo un error en el servidor"
      }
}