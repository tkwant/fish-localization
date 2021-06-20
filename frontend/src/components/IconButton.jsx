import React from 'react'

const IconButton = ({children, onClick}) =>{
    return <button onClick={onClick} className="px-2 h-8 bg-red-400 text-white active:bg-pink-600 font-bold uppercase text-xs  rounded shadow hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150" type="button"
    >
        {children}
</button>
}

export default IconButton