import { useQuery } from 'react-query'
import axios from 'axios'

const PUBLIC_URL = import.meta.env.SNOWPACK_PUBLIC_API_URL


const useVideos = () => {
  return useQuery('videos', () => axios(`${PUBLIC_URL}/items`).then(res => res.data), {
    refetchOnWindowFocus: false,
    enabled: false // needed to handle refetchs manually
  })
}

export default useVideos