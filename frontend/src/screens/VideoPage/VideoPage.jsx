import React from 'react'
import { useHistory } from 'react-router-dom'
import ReactPlayer from 'react-player'
import API from '../../API'
import useFishCounts from '../../hooks/useFishCounts'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import {useWindowSize} from 'react-use'
const FishCountsVis = ({ itemId, isOriginal, width }) => {
    const {
        data, isLoading, isError, isSuccess
    } = useFishCounts({ itemId })
    if (!isOriginal) {
        if (isLoading) {
            return <div>Loading</div>
        }
        if (isSuccess) {
            const newData = data.map((count, i) => ({
                frame: i,
                fishCount: count
            }))
            return <div>
                <AreaChart
                    width={width -30}
                    height={150}
                    data={newData}
                    margin={{
                        top: 10,
                        right: 0,
                        left: -30,
                        bottom: 0,
                    }}
                >
                    <XAxis dataKey="frame" />
                    <YAxis />
                    <Area type="monotone" dataKey="fishCount" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </div>
        }
        return <div>Loading</div>
    }
    return null


}


const VideoPage = () => {
    const {width, height} = useWindowSize()
    // const height = 1080
    const history = useHistory()
    if (!history.location.state) {
        return <div>No data</div>
    } else {
        const isOriginal = history.location.pathname.split('/').slice(-2, -1)[0] === 'original'
        const item = history.location.state
        const videoUrl = `${API.PUBLIC_URL}/${isOriginal ? item.original_video_path : item.predicted_video_path}`
        return <div>
        <ReactPlayer
            width="auto"
            width={width}
            height={height * 0.65}
            
            controls
            url={videoUrl} />
        <FishCountsVis width={width} itemId={item._id} isOriginal={isOriginal} />
    </div>

    }


}

export default VideoPage