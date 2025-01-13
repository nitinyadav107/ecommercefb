import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className='flex flex-col sm:flex-row border border-gray-400 dark:border-gray-600 dark:bg-slate-800'>
      {/*Hero left*/}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
        <div className='text-[#414141] dark:text-white'>
          <div className='flex items-center gap-2'>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141] dark:bg-white'></p>
            <p className='font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
          </div>
          <h1 className='font-bold text-3xl md:text-5xl mt-2 dark:text-white'>
            Latest Arrivals
          </h1>
          <div className='flex items-center gap-2'>
            <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
            <p className='w-8 md:w-11 h-[2px] bg-[#414141] dark:bg-white'></p>
          </div>
        </div>
      </div>
      {/*Hero right*/}
      <img className='w-full sm:w-1/2' src={assets.hero_img} alt="Hero" />
    </div>
  )
}

export default Hero