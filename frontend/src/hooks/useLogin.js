import {useMutation} from 'react-query'
import axios from 'axios'
import API from '../API'
const useLogin = () =>{
    return useMutation(data=>axios.post(API.LOGIN, data).then(res=>res.data))
}
export default useLogin