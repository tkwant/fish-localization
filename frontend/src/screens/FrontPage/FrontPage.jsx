import React from 'react'
import Buttons from './Buttons'
import VideoList from './VideoList'
import { useBoolean } from 'react-use'
const FrontPage = () => {
    const [newVideoUploadedToggler, setNewVideoUploadedToggler] = useBoolean(false)

    return (
        <>
            <main class="flex-1 overflow-y-auto bg-gray-200 flex-grow">
                <VideoList
                    newVideoUploadedToggler={newVideoUploadedToggler}
                />
            </main>
            <footer class="bg-gray-500">
                <Buttons
                    setNewVideoUploadedToggler={setNewVideoUploadedToggler}
                />
            </footer>
        </>
    )

}

export default FrontPage