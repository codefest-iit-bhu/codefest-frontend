import React from 'react'
import { Link } from 'react-router-dom'
import redBtn from '../assets/CA_images/red-btn.webp'
import blueBtn from '../assets/CA_images/blue-btn.webp'
import arrowDown from '../assets/CA_images/Arrowdown.webp'

const CaHero = () => {
    return (
        <div className='ca-hero flex flex-col items-center justify-center p-4 md:p-8 text-[#fbea8c]'>
            <div className='text-center my-4 md:my-8 relative w-full max-w-md md:max-w-xl duration-300 hover:scale-105'>
                <img src={redBtn} alt="" className="w-full drop-shadow-lg" />
                <h1 className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl md:text-3xl tracking-wider pt-2">
                    <span className='px-10 md:px-0 text-[#fbea8c] font-great-vibes'>Be a Campus Ambassador</span>
                </h1>
            </div>

            <div className="btns flex flex-col md:flex-row gap-20 justify-center items-center mt-4">
                <Link to="/ca-register" className='relative group w-64 md:w-72 transition-transform duration-300 hover:scale-105'>
                    <img src={redBtn} alt="" className='w-full drop-shadow-md' />
                    <div className='absolute inset-0 flex items-center justify-center text-[#fbea8c] font-bold text-lg md:text-xl pt-1 font-great-vibes'>
                        Register Now
                    </div>
                </Link>
                <Link to="/ca_leaderboard" className='relative group w-64 md:w-72 transition-transform duration-300 hover:scale-105'>
                    <img src={blueBtn} alt="" className='w-full drop-shadow-md' />
                    <div className='absolute inset-0 flex items-center justify-center text-[#fbea8c] font-bold text-lg md:text-xl pt-1 font-great-vibes'>
                        Leaderboard
                    </div>
                </Link>
            </div>

            <div className="flex flex-row items-center justify-center mt-12 md:mt-16 animate-pulse gap-6">
                <span className='text-3xl md:text-5xl lg:text-7xl text-white font-pixelifySans drop-shadow-[0_4px_4px_rgba(0,0,0,0.5)] text-center font-great-vibes'>
                    Did you ask why?
                </span>
                <span className="flex items-center">
                    <img src={arrowDown} alt="arrow down" className='w-12 h-12 md:w-16 md:h-16 object-contain filter drop-shadow-lg' />
                </span>
            </div>
        </div>
    )
}

export default CaHero
