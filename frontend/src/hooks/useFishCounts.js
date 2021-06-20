import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import API from '../API'

const useFishCounts = ({ itemId }) => {
    return useQuery(['fish_counts', itemId], () => axios(`${API.GET_FISH_COUNTS}/${itemId}`).then(res => res.data))
}

export default useFishCounts