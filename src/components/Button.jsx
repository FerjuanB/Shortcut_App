import ButtonLoader from "./ButtonLoader"

const Button = ({text, type,color="blue",loading,onClick,disabled=false}) => {
  
  console.log(disabled)
  
  if(loading) return <ButtonLoader color={color}/>
  
  
  return (
    <button 
    disabled={disabled}
    onClick={onClick}
    className={!disabled?`text-white items-center bg-${color}-700 hover:bg-${color}-800 focus:ring-4 focus:outline-none focus:ring-${color}-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-${color}-600 dark:hover:bg-${color}-700 dark:focus:ring-${color}-800`: ` focus:ring-4 text-zinc-200 italic focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center bg-slate-600 cursor-not-allowed`}
    type={type}>
{text}
    </button>
  )
}

export default Button