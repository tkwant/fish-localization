import React, {useState, useRef, useEffect} from 'react'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import useUploadVideo from '../../hooks/useUploadVideo'
import ProgressBar from '../../components/ProgressBar'
// import ProgressModal from './ProgressModal'
var style = {
    backgroundColor: "#F8F8F8",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "10px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
}


// function Footer({ children }) {
//     return (
//         <div>
//             <div style={style}>
//                 {children}
//             </div>
//         </div>
//     )
// }

const Footer = ({setNewVideoUploadedToggler}) =>{
    const [isModalOpen, setIsModalOpen] = useState(false)
    const inputRef = useRef();
    const [uploadVideoState, uploadVideo, breakUpload] = useUploadVideo()
    // const [file, setFile] = useState()
    const onFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            // onOpen()
            setIsModalOpen(true)
            uploadVideo(file)
        }
    }
    
    useEffect(() => {
        if (uploadVideoState.error || uploadVideoState.isSuccess) {
            if (uploadVideoState.isSuccess) {
                setNewVideoUploadedToggler()
            }
            setIsModalOpen(false)
            inputRef.current.value = ""
        }}, [uploadVideoState])


    const selectVideoFaker = () => {
        inputRef.current.click()
    }

    return (
        <div>
            <Modal
                isOpen={isModalOpen}
                onClose={()=>{
                    inputRef.current.value = ""
                    setIsModalOpen(false)
                    breakUpload()
                }}
                title="Upload Video"
            >
                <ProgressBar
                    progress={uploadVideoState.progress}
                />
                    
            </Modal>
            <div style={style}>
                <input type='file' accept="video/mp4,video/x-m4v,video/*" name={name} ref={inputRef} onChange={onFileChange} style={{ display: 'none' }}></input>
                <Button 
                    className="w-40"
                    onClick={()=>{
                        selectVideoFaker()
                    }}
                >
                    Upload Video
                </Button>
            </div>
        </div>
    )
}



export default Footer



