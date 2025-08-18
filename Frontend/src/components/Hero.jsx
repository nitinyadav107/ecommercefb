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
          <div className="flex items-center gap-2 mt-6">
            <p className="font-semibold text-sm md:text-base text-gray-800">
              This Project is Created By{" "}
              <span className="text-indigo-600 dark:text-indigo-600 font-bold relative inline-block transition-all duration-300 hover:text-green-500 dark:hover:text-green-500 hover:tracking-wider">
                Nitin Yadav
              </span>
            </p>

          </div>

          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base text-gray-800">
              Contact Detail{"  "}
              <span className="text-indigo-600 dark:text-indigo-600  dark:hover:text-green-500  font-bold relative inline-block transition-all duration-300 hover:text-green-500 ">
                nitinyadav4800@gmail.com
              </span>
            </p>
          </div>


        </div>

      </div>
      {/*Hero right*/}
      <img className='w-full sm:w-1/2' loading='lazy' src={assets.hero_img} alt="Hero" />
    </div>
  )
}

export default Hero