import { useMutation } from 'react-query'
import API from '../API'
import axios from 'axios'
const usePredictCancle = () => {
    return useMutation(() => axios.post(`${API.PREDICT_CANCEL}`))
}

export default usePredictCancle