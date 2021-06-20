import React from 'react'

const Input = ({placeholder, onInput, defaultValue, value, type}) =>{
    return (
        <div className="mb-3 pt-0">
            <input 
                defaultValue={defaultValue} 
                placeholder={placeholder}
                onInput={onInput}
                value={value}
                type={type}  
                className="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"/>
        </div>
    )
}

Input.defaultProps = {
    placeholder: '',
    onInput: ()=>{},
    type: 'text'
  }
export default Input