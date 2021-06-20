import React, {useState, useRef, useEffect} from 'react'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
import useUploadVideo from '../../hooks/useUploadVideo'
import ProgressBar from '../../components/ProgressBar'
import useLogin from '../../hooks/useLogin'
import useAccessToken from '../../hooks/useAccessToken'
import axios from 'axios'
import Notifications from '../../components/Notifications'
import Input from '../../components/Input'
import {useKey} from 'react-use'
import IconButton from '../../components/IconButton'
import {FaInfo, FaGithub} from 'react-icons/fa'
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


const Info = ({isInfoModalOpen, setIsInfoModalOpen})=>{
    return(
        <div className="float-right h-full">
            <Modal
                isOpen={isInfoModalOpen}
                onClose={
                    ()=> setIsInfoModalOpen(false)
                }
                title="Info"
            >
                <div>
                <p className="mb-4">
                    This webapplication is developed to automatically count and localize fishes in 
                    underwater video recordings using AI. It is used by croatian biologists to understand the influence of human and natural effects on marine life.
                    The webapplication including the AI-Evaluation are hosted at Hochschule Fulda.
                 </p>                    
                <IconButton
                    onClick={()=>window.location.href = "https://github.com/tkwant/fish-localization"}
                >
                    <FaGithub size={16} className="mr-2"/> Source Code
                </IconButton>
                <p className="mt-4 text-xs">
                    Improvments or Bugs?  t.kwant1@gmail.com </p>
                <p className="text-xs">Special thanks to Jonas Jäger and Prof. Dr. Viviane Wolff for maintaining this project</p>
                
                </div>
            </Modal>
            
                <IconButton
                    onClick={()=>setIsInfoModalOpen(true)}
                    className="mr-2 px-2 my-1"
                >
                    <FaInfo/> 
             </IconButton>
        </div>
    )
}


const Footer = ({setNewVideoUploadedToggler}) =>{
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
    const inputRef = useRef();
    const [uploadVideoState, uploadVideo, breakUpload] = useUploadVideo()
    // const [accessToken, setAccessToken, remove] = useLocalStorageValue('fish-loc-access-token', '')
    // const [accessToken, setAccessToken] = useLocalStorageState('fish-loc-access-token', [])
    const [accessToken, setAccessToken] = useAccessToken()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const {
        mutate: login,
        status: loginStatus,
        data: loginData,
        error: loginError
    } = useLogin()
    // const [file, setFile] = useState()
    const onFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            // onOpen()
            setIsModalOpen(true)
            uploadVideo(file)
        }
    }
    useKey('Enter', ()=>{
        if(isModalOpen && username && password){
            login(
                {username, 
                password}
            )
        }

    },{}, [username, password]);


    useEffect(()=>{
        if(loginStatus == "success"){
            setAccessToken(loginData.accessToken)
            // Reload --> disabled buttons gets enabled
            setNewVideoUploadedToggler()
            setIsModalOpen(false)

        }
    },[loginStatus])

    useEffect(()=>{
        axios.defaults.headers.common.Authorization =
         (accessToken? 'Bearer ' + accessToken: '')
    }, [accessToken])
    
    useEffect(() => {
        if (uploadVideoState.error || uploadVideoState.isSuccess) {
            if (uploadVideoState.isSuccess) {
                setNewVideoUploadedToggler()
            }
            if(uploadVideoState.error ){
                Notifications.showToast({
                    icon: 'error',
                    text: uploadVideoState.error
                })
            }
            setIsModalOpen(false)
            inputRef.current.value = ""
        }}, [uploadVideoState])


    const selectVideoFaker = () => {
        inputRef.current.click()
    }



    
    if(accessToken){
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
                    <Info
                         isInfoModalOpen={isInfoModalOpen}
                         setIsInfoModalOpen={setIsInfoModalOpen}                   
                    />
                </div>
            </div>
        )
    }
    return (
        <div>
                <Modal
                    isOpen={isModalOpen}
                    onSubmit={()=>{
                        login(
                            {username, 
                            password}
                        )
                    }}
                    submitText="Login"
                    onClose={()=>{
                        setIsModalOpen(false)
                    }}
                    title="Login"
                >
                    <div>
                        Username <Input onInput={e=>setUsername(e.target.value)} />
                        Password <Input type="password" onInput={e=>setPassword(e.target.value)} />
                        {loginError && 
                            <p className="text-red-500" >{loginError.request.response}</p>
                        }
                    </div>
                        
                </Modal>
            <div style={style}>
                    <Button 
                        className="w-40"
                        onClick={()=>{
                            setIsModalOpen(true)

                        }}
                    >
                        Login
                    </Button>
                    <Info
                        isInfoModalOpen={isInfoModalOpen}
                        setIsInfoModalOpen={setIsInfoModalOpen}
                    />
            </div>
        </div>
    )

}



export default Footer



