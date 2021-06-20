import React from 'react'
const ProgressBar = ({ progress }) => {
    return <div className="relative pt-1">
        <div className="overflow-hidden h-8 ml-2 mr-2 mb-2 text-xs flex rounded bg-green-100">
            <div style={{ width: `${progress * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"></div>
        </div>
    </div>

}

export default ProgressBar