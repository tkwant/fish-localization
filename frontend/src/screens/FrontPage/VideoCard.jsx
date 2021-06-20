import React, { useEffect, useState } from 'react'
// import { Button } from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa';

import usePredictProgress from '../../hooks/usePredictProgress'
import usePredictVideo from '../../hooks/usePredictVideo'
import usePredictCancel from '../../hooks/usePredictCancel'
import Progressbar from '../../components/ProgressBar'
// import { IconButton } from "@chakra-ui/react"
import { CloseIcon } from '@chakra-ui/icons'
import { useInterval } from 'react-use'
import API from '../../API'
import Button from '../../components/Button'
import showToast from '../../components/Toast'
import IconButton from '../../components/IconButton'
const VideoCard = ({ item, showVideo, deleteVideoOnClick, accessToken }) => {
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
        if (item.predict_progress > 0 && progress < 1) {
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
        if (predictVideoIsSuccess) {
            setFetchProgressTime(500)
        }
    }, [predictVideoIsSuccess])

    useInterval(
        () => {
            if (progress < 1) {
                getPredictProgress(item._id)
            } else {
                setFetchProgressTime(null)
            }
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


    const downloadCsv = async () => {
        window.location.assign(`${API.PUBLIC_URL}/${item.fish_counts_csv_path}`)
        // const response = await fetch()
        // const blob = response.blob()
    }

    const renderPrediction = () => {
        if (progress === 0 && !fetchProgressTime) {
            return <Button
                disabled={!accessToken}
                onDisabledClick={()=>{
                    showToast({
                        icon: 'error',
                        text: 'Please Login'
                    })                   
                }}
                onClick={() => predictVideoOnClick(item)}
            >
                Predict Video
            </Button>
            

        } else if (progress === 1) {
            return <Button
            onClick={() => showVideo(item, false)}
            >
                Show Predicted Video
            </Button>
        } else {
            return <div className="flex flex-row ">

                <div className="flex-grow">
                    <Progressbar
                        progress={progress}
                    />
                </div>
                <div className="mt-1 mr-2">
                <IconButton onClick={predictCancelOnClick}>
                    <FaTimes/>
                </IconButton>
                </div>
            </div>


        }
    }


    return (

        <div className='m-2 w-300 bg-lightGreen shadow-2xl p-2  transform duration-500 hover:-translate-y-2' >
            <img
                src={`${API.PUBLIC_URL}/${item.thumbnail_path}`}
            />
            <div class='text-center'>
                <p className="text-2xl my-3">{item.name.replace('.mp4', '')}</p>
            </div>
            <div>
            </div>
            <img src={item.thumbnail}></img>
            <Button
                onClick={() => showVideo(item, true)}
            >
                Show Original
            </Button>
            {renderPrediction()}
            <Button
                disabled={item.predict_progress < 1}
                onClick={downloadCsv}
                onDisabledClick={()=>{
                    showToast({
                        icon: 'error',
                        text: 'Please predict first'
                    })
                }}
            >Export as CSV</Button>
            <Button
                disabled={!accessToken}
                onDisabledClick={()=>{
                    console.log("HERE I AM ")
                    showToast({
                        icon: 'error',
                        text: 'Please Login'
                    })
                }}
                onClick={() => deleteVideoOnClick(item)}
            >Delete Video </Button>
            <div>
                {item.timestamp.toLocaleString('de')}
            </div>

        </div>
    )
}

export default VideoCard