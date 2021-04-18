import React, { useEffect, useState } from 'react'
import { Button } from '@chakra-ui/react'
import usePredictProgress from '../../hooks/usePredictProgress'
import usePredictVideo from '../../hooks/usePredictVideo'
import usePredictCancel from '../../hooks/usePredictCancel'
import Progressbar from '../../components/Progressbar'
import { IconButton } from "@chakra-ui/react"
import { CloseIcon } from '@chakra-ui/icons'
import { useInterval } from 'react-use'
import API from '../../API'
const VideoCard = ({ item, showVideo, deleteVideoOnClick }) => {
    const [progress, setProgress] = useState(item.predict_progress)
    const [fetchProgressTime, setFetchProgressTime] = useState(null)

    const
        {
            mutate: getPredictProgress,
            error: predictProgressError,
            data: predictProgress,
            isSuccess: getPredictProgressIsSuccess
        } = usePredictProgress()

    const
        {
            mutate: predictVideo,
            error: predictVideoError,
            isLoading: predictVideoIsLoading,
            isSuccess: predictVideoIsSuccess,
            reset: predictVideoReset,
        } = usePredictVideo()
    const
        {
            mutate: predictCancel,
            error: predictCancelError,
            isLoading: predictCancelIsLoading,
            isSuccess: predictCancelIsSuccess,
            reset: predictCancelReset,
        } = usePredictCancel()

    const predictVideoOnClick = (item) => {
        predictVideo({ id: item._id })
    }
    const predictCancelOnClick = (item) => {
        predictCancel()
    }

    useEffect(() => {
        if (item.predict_progress > 0 && item.predict_progress < 1) {
            setFetchProgressTime(500)
        }
    }, [item])

    useEffect(() => {
        if (predictCancelIsSuccess) {
            setFetchProgressTime(null)
            setProgress(0)
        }
    }, [predictCancelIsSuccess])


    useEffect(() => {
        if (predictVideoIsSuccess && progress < 1) {
            setFetchProgressTime(500)
        }
    }, [predictVideoIsSuccess])

    useInterval(
        () => {
            getPredictProgress(item._id)
        },
        fetchProgressTime
    );

    useEffect(() => {
        if (predictProgressError) {
            setFetchProgressTime(null)
        }
    }, [predictProgressError])


    useEffect(() => {
        if (getPredictProgressIsSuccess) {
            setProgress(predictProgress.progress)
        }
    }, [getPredictProgressIsSuccess])


    const renderPrediction = () => {
        if (progress === 0 && !fetchProgressTime) {
            return <div class='flex justify-center w-full m-2'>
                <Button onClick={() => predictVideoOnClick(item)}>Predict Video</Button>
            </div>
        } else if (progress === 1) {
            return <div class='flex justify-center w-full m-2'>
                <Button onClick={() => showVideo(item, false)}>Show Predicted Video</Button>
            </div>
        } else {
            return <div className="flex flex-row ">

                <div className="flex-grow">
                    <Progressbar
                        progress={progress}
                    />
                </div>
                <div className="mt-1 mr-2">
                    <IconButton size='sm' onClick={predictCancelOnClick} aria-label="Search database" icon={<CloseIcon />} />
                </div>
                {/* <div className="flex-grow">

                    </div>
                    <div className="w-3">
                        A
                    </div> */}
            </div>


        }
    }


    return (
        <div className='m-2 w-300 m-2  bg-green-400 shadow' >
            <div class='flex justify-center w-full'>
                {item.name}</div>
            <div>
                <img
                    src={`${API.PUBLIC_URL}/${item.thumbnail_path}`}
                />
            </div>
            <img src={item.thumbnail}></img>
            <div class='flex justify-center w-full m-2'>
                <Button onClick={() => showVideo(item, true)}>Show Original</Button>
            </div>
            {renderPrediction()}
            {/* <div class='flex justify-center w-full m-2'>
                        <Button onClick={() => predictCancelOnClick(item)}>Cancel Predict Video</Button>
                    </div> */}
            {/* {item.predicted_video_path && (

            )} */}
            <div class='flex justify-center w-full m-2'>
                <Button disabled={!item.predicted_video_path}>Export as CSV</Button>
            </div>
            <div class='flex justify-center w-full m-2'>
                <Button onClick={() => deleteVideoOnClick(item)}>Delete Video</Button>
            </div>
            <div>
                {item.timestamp.toLocaleString('de')}
            </div>
        </div>
    )
}

export default VideoCard