import React from 'react'
import { useHistory } from 'react-router-dom'
import ReactPlayer from 'react-player'
import API from '../../API'


const VideoPage = () => {
    const history = useHistory()
    if (!history.location.state) {
        return <div>No data</div>
    } else {
        const item = history.location.state
        const videoUrl = API.PUBLIC_URL + item.original_video_path
        return <ReactPlayer controls url={videoUrl} />
    }


}

export default VideoPage