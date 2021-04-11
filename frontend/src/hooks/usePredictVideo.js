import { useMutation } from 'react-query'
import API from '../API'
import axios from 'axios'
const usePredictVideo = () => {
    return useMutation(videoId => axios.post(`${API.PREDICT_VIDEO}`, videoId))
}

export default usePredictVideo