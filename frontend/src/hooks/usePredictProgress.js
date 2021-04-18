import { useMutation } from 'react-query'
import API from '../API'
import axios from 'axios'
const usePredictProgress = () => {
    return useMutation(videoId => axios.get(`${API.PREDICT_PROGRESS}/${videoId}`).then(res => res.data))
}
export default usePredictProgress