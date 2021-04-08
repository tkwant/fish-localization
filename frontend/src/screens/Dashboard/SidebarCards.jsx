import React, { useEffect } from 'react'
import Card from './Card'
const SidebarCards = ({ newVideoUploadedToggler }) => {

    useEffect(() => {
        console.log("FETCH NEW VIDEOS")
    }, [newVideoUploadedToggler])
    return <Card />

}

export default SidebarCards