import React from 'react'

const Button = ({children, disabled, onClick, className='w-full'}) =>{
    return <button
    onClick={onClick}
    className={`${className} p-2 px-6 mb-2
    ${disabled ? "bg-gray-500" : "bg-green-500"} 
    ${disabled ? "cursor-not-allowed" : "cursor-pointer"} 
    text-white rounded-md 
    ${disabled ? "bg-gray-500" : "hover:bg-green-600"}`}
    
    >
        {children}
    </button>
}

export default Button