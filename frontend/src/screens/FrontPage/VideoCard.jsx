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

const VideoRow = ({
    disabled,
    buttonText,
    onClick
}) => {
    return <div className='m-2'>
        <button
            disabled={disabled}
            onClick={(e) => {
                if (!disabled) {
                    onClick(e)
                }
            }}
            className={`w-full p-2 px-6 
        ${disabled ? "bg-gray-500" : "bg-green-500"} 
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"} 
        text-white rounded-md 
        ${disabled ? "bg-gray-500" : "hover:bg-green-600"}`}
        >{buttonText}</button>
        {/* <Button style={{ width: '100%' }} colorScheme="teal" disabled={disabled} onClick={onClick}>{buttonText}</Button> */}
    </div>
}


const VideoCard = ({ item, showVideo, deleteVideoOnClick }) => {
    console.log("item")
    console.log(item)
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




    const renderPrediction = () => {
        if (progress === 0 && !fetchProgressTime) {
            return <VideoRow
                onClick={() => predictVideoOnClick(item)}
                buttonText='Predict Video'
            />

        } else if (progress === 1) {
            return <VideoRow
                onClick={() => showVideo(item, false)}
                buttonText='Show Predicted Video'
            />
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
            <VideoRow
                onClick={() => showVideo(item, true)}
                buttonText='Show Original'

            />
            {renderPrediction()}
            <VideoRow
                disabled={item.predict_progress < 1}
                onClick={downloadCsv}
                buttonText='Export as CSV'
            />
            <VideoRow
                onClick={() => deleteVideoOnClick(item)}
                buttonText='Delete Video'
            />
            <div>
                {item.timestamp.toLocaleString('de')}
            </div>

        </div>
    )
}

export default VideoCard