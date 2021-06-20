import { useState, useCallback, useRef, useEffect } from 'react'
import axios from 'axios'
import API from '../API'


const useUploadVideo = () => {
    const isUploadBreaked = useRef()
    // isUploadBreaked.current = false
    const [state, setState] = useState({
        idle: true
    })


    const breakUpload = () => {
        isUploadBreaked.current = true
    }



    const mutate = useCallback(async (file) => {
        const formData = new FormData()
        formData.append(
            "video",
            file
        );
        try {
            const cancelTokenSource = axios.CancelToken.source()
            const response = await axios.request({
                method: "post",
                cancelToken: cancelTokenSource.token,
                url: API.UPLOAD_VIDEO,
                data: formData,
                onUploadProgress: (p) => {
                    if (isUploadBreaked.current) {
                        cancelTokenSource.cancel()
                    }
                    setState({
                        progress: p.loaded / p.total
                    })
                }
            })
            setState({
                isSuccess: response.data === 'success'
            })
        } catch (error) {
            setState({ 
                error, 
                isSuccess: false
            })
        }
        setState({
            idle: true
        })
        isUploadBreaked.current = false
    })
    return [state, mutate, breakUpload]
}

export default useUploadVideo