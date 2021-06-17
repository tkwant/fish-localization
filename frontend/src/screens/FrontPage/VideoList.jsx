import React, { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import useVideos from '../../hooks/useVideos'
import useDeleteVideo from '../../hooks/useDeleteVideo'
import VideoCard from './VideoCard'
const DUMMY_CARDS = [
    {
        thumbnail: 'https://i.imgur.com/lhJIz7A.jpg',
        timestamp: new Date(),
        original_video_path: 'xxx',
        predicted_video_path: 'xxx',
        name: 'video 1',
    },
    {
        thumbnail: 'https://i.imgur.com/lhJIz7A.jpg',
        timestamp: new Date(),
        name: 'video 1'
    },
    {
        thumbnail: 'https://i.imgur.com/lhJIz7A.jpg',
        timestamp: new Date(),
        name: 'video 1'
    },


]


const VideoList = ({ newVideoUploadedToggler }) => {
    const history = useHistory()
    const
        {
            isLoading: fetchVideosIsLoading,
            error: fetchVideosError,
            reset: fetchVideosReset,
            data: videosRaw,
            refetch: refetchVideos
        } = useVideos()

    const
        {
            mutate: deleteVideo,
            error: deleteVideoError,
            isLoading: deleteVideoIsLoading,
            isSuccess: deleteVideoIsSuccess,
            reset: deleteVideoReset,
        } = useDeleteVideo()
    const [videos, setVideos] = useState([])
    
    useEffect(()=>{
        setVideos(videosRaw)
    },[videosRaw])


    const showVideo = (item, isOriginal = true) => {
        history.push(`/player/${isOriginal ? 'original' : 'predicted'}/${item._id}`, item)
    }

    const deleteVideoOnClick = (item) => {
        // deleteVideo(item._id)
        const newVideos = videos.filter(vid=>vid._id != item._id)
        setVideos(newVideos)
    }



    useEffect(() => {
        refetchVideos()
    }, [newVideoUploadedToggler])



    if (fetchVideosIsLoading) {
        return <div>loading</div>
    }


    if (deleteVideoError) {
        deleteVideoReset()
        return <div>{deleteVideoError.response.data}</div>
    }

    if (fetchVideosError) {
        fetchVideosReset()
        return <div>{fetchVideosError.response.data}</div>
    }

    if (videos) {
        return (
            <div class="flex flex-wrap overflow-hidden justify-center sm:justify-start ">
                {videos.map(item => (
                    <VideoCard
                        item={item}
                        showVideo={showVideo}
                        // predictVideoOnClick={predictVideoOnClick}
                        // predictCancelOnClick={predictCancelOnClick}
                        deleteVideoOnClick={deleteVideoOnClick}
                    />
                ))}

            </div>
        )
    }
    return null

}


// const VideoList = () => {
//     return <div>
//         {DUMMY_CARDS.map(card => (
//             <div class="flex flex-col h-screen">
//                 <div class="bg-red-500">{card.name}</div>
//                 <div class="bg-green-500 flex-grow">Thumnail</div>
//                 <div class="bg-blue-500">3</div>
//                 {/* <div class="bg-blue-300">
//             <span role="img" aria-label="sheep">Made with React💚 Flask 💚 MongoDB 💚 </span>
//         </div> */}
//             </div>
//         ))}

//     </div>
// }

export default VideoList