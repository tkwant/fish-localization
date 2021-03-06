import React, { useEffect, useState } from 'react'
// import { Button } from '@chakra-ui/react'
import { FaTimes } from 'react-icons/fa';

import usePredictProgress from '../../hooks/usePredictProgress'
import usePredictVideo from '../../hooks/usePredictVideo'
import usePredictCancel from '../../hooks/usePredictCancel'
import Progressbar from '../../components/ProgressBar'
import { useInterval } from 'react-use'
import API from '../../API'
import Button from '../../components/Button'
import Notifactions from '../../components/Notifications'
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
            status: predictVideoStatus, 
            error: predictVideoError,
            isSuccess: predictVideoIsSuccess,
        } = usePredictVideo()
    const
        {
            mutate: predictCancel,
            error: predictCancelError,
            isLoading: predictCancelIsLoading,
            isSuccess: predictCancelIsSuccess,
            status: predictCancelStatus, 
            reset: predictCancelReset,
        } = usePredictCancel()

    const predictVideoOnClick = (item) => {
        predictVideo({ id: item._id })
    }
    const predictCancelOnClick = (item) => {
        predictCancel()
    }

    useEffect(()=>{
        if(predictVideoStatus === "error"){
            Notifactions.showToast({
                icon: 'error',
                text: predictVideoError.request.response
            })    
        }
    },[predictVideoStatus])

    useEffect(() => {
        if (item.predict_progress > 0 && progress < 1) {
            setFetchProgressTime(500)
        }
    }, [item])

    useEffect(()=>{
        if(predictCancelError){
            Notifactions.showToast({
                icon: 'error',
                text: predictCancelError.request.response
            })
        }

    }, [predictCancelError])

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
        if(item.predict_progress < 1){
            Notifactions.showToast({
                icon: 'error',
                text: 'Please predict first'
            })
        }else{
            window.location.assign(`${API.PUBLIC_URL}/${item.fish_counts_csv_path}`)
        }

    }

    const renderPrediction = () => {
        if (progress === 0 && !fetchProgressTime) {
            return <Button
                disabled={!accessToken}
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
                <IconButton className="px-2 h-8" onClick={predictCancelOnClick}>
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
            >Export as CSV</Button>
            <Button
                disabled={!accessToken}
                onClick={() => deleteVideoOnClick(item)}
            >Delete Video </Button>
            <div>
                {item.timestamp.toLocaleString('de')}
            </div>

        </div>
    )
}

export default VideoCard