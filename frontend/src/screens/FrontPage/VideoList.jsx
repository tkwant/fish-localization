import React, { useEffect } from 'react'
import { Button } from "@chakra-ui/react"
import { useHistory } from 'react-router-dom'
import useVideos from '../../hooks/useVideos'
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
    const { isLoading, error, data, refetch } = useVideos()

    const showOriginal = (item) => {
        history.push(`/item/${item._id}`, item)
    }

    useEffect(() => {
        refetch()
    }, [newVideoUploadedToggler])

    if (isLoading) {
        return <div>loading</div>
    }

    if (error) {
        return <div>{error}</div>
    }
    if (data) {
        return (
            <div class="flex flex-wrap overflow-hidden justify-center sm:justify-start ">
                {data.map(item => (
                    <div className='m-2 w-300 m-2  bg-green-400 shadow' >
                        <div class='flex justify-center w-full'>
                            {item.name}</div>
                        <img src={item.thumbnail}></img>
                        <div class='flex justify-center w-full m-2'>
                            <Button onClick={() => showOriginal(item)}>Show Original</Button>
                        </div>
                        {!item.item && (
                            <div class='flex justify-center w-full m-2'>
                                <Button >Predict Video</Button>
                            </div>
                        )}
                        {item.predicted_video_path && (
                            <div class='flex justify-center w-full m-2'>
                                <Button>Show Predicted Video</Button>
                            </div>
                        )}
                        <div class='flex justify-center w-full m-2'>
                            <Button disabled={!item.predicted_video_path}>Export as CSV</Button>
                        </div>
                        <div class='flex justify-center w-full m-2'>
                            <Button onClick={showOriginal}>Delete Video</Button>
                        </div>
                        <div>
                            {item.timestamp.toLocaleString('de')}
                        </div>
                    </div>
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