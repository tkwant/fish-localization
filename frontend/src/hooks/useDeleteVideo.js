import { useMutation } from 'react-query'
import API from '../API'
import axios from 'axios'
const useDeleteVideo = () => {
    return useMutation((videoId) => axios.delete(`${API.DELETE_VIDEO}/${videoId}`))
}

export default useDeleteVideo