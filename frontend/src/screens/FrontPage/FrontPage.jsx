import React from 'react'
import VideoList from './VideoList'
import Footer from './Footer'
import { useState } from 'react'
const FrontPage = () => {
    const [newVideoUploadedToggle, setNewVideoUploadedToggle] = useState(false)

    const setNewVideoUploadedToggler = ()=>{
        setNewVideoUploadedToggle(!newVideoUploadedToggle)
    }
    return (
        <>
            <main class="h-full">
                <VideoList
                    newVideoUploadedToggle={newVideoUploadedToggle}
                />
                <div style={{ height: 60 }} />
            </main>
            <Footer
                setNewVideoUploadedToggler={setNewVideoUploadedToggler}
            />
        </>
    )

}

export default FrontPage