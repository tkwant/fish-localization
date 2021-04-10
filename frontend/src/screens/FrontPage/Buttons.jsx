import React, { useRef, useEffect } from 'react'
import { Button, useDisclosure } from '@chakra-ui/react'
import useUploadVideo from '../../hooks/useUploadVideo'
import ProgressModal from './ProgressModal'
const Buttons = ({ setNewVideoUploadedToggler }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const inputRef = useRef();
    const [uploadVideoState, uploadVideo, breakUpload] = useUploadVideo()
    // const [file, setFile] = useState()
    const onFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            onOpen()
            uploadVideo(file)
        }
    }

    useEffect(() => {
        if (uploadVideoState.error || uploadVideoState.isSuccess) {
            if (uploadVideoState.isSuccess) {
                setNewVideoUploadedToggler()
            }
            onClose()
            inputRef.current.value = ""
        }
    }, [uploadVideoState])


    const selectVideoFaker = () => {
        inputRef.current.click()
    }

    return <div className='h-full'>
        <ProgressModal
            breakUpload={breakUpload}
            isOpen={isOpen}
            onClose={onClose}
            uploadVideoState={uploadVideoState}
        />
        <div className=' p-3 flex justify-center'>
            <input type='file' accept="video/mp4,video/x-m4v,video/*" name={name} ref={inputRef} onChange={onFileChange} style={{ display: 'none' }}></input>
            <Button colorScheme="teal" variant="solid" onClick={selectVideoFaker}>
                Upload new video
            </Button>
        </div>

    </div>

}

export default Buttons