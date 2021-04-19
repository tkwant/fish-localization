import React from 'react'
import { useHistory } from 'react-router-dom'
import ReactPlayer from 'react-player'
import API from '../../API'


const VideoPage = () => {
    const history = useHistory()
    if (!history.location.state) {
        return <div>No data</div>
    } else {
        const isOriginal = history.location.pathname.split('/').slice(-2, -1)[0] === 'original'
        console.log('isOriginal')
        console.log(isOriginal)
        const item = history.location.state

        // const videoUrl = API.PUBLIC_URL + "/" + item.original_video_path

        const videoUrl = `${API.PUBLIC_URL}/${isOriginal ? item.original_video_path : item.predicted_video_path}`
        console.log('videoUrl')
        console.log(String(videoUrl))
        return <ReactPlayer controls url={videoUrl} />
    }


}

export default VideoPage