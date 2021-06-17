import React from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player';

const Title = () => {
    return (
        <div className="bg-gray-200  text-3xl p-2  w-full text-center flex flex-row justify-center">
            <div className="font-semibold" >Fish Localization            </div>

            <div>

            <Player
            autoplay
            loop
            src="https://assets4.lottiefiles.com/packages/lf20_ppkhg6vk.json"
            style={{ height: '40px', width: '140px' }}
            >
            </Player>
            </div>
        </div>

        
    )
}

export default Title