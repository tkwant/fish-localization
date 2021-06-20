import React from 'react'

const IconButton = ({children, onClick, className}) =>{
    return ( 
        <div className="flex h-full justify-center">
     <button onClick={onClick} className={`${className}   bg-red-400 text-white active:bg-pink-600 font-bold uppercase text-xs  rounded shadow hover:shadow-md outline-none focus:outline-none  ease-linear transition-all duration-150" type="button`}>
        <div className="flex flex-row">
            {children}
        </div>
    </button>
    </div>
    )
}

IconButton.defaultProps = {
    className: "p-2"
}

export default IconButton