import React from 'react'
import { assets } from '../assets/assets'
import { RiExchangeFundsFill } from "react-icons/ri";
import { RiCustomerServiceLine } from "react-icons/ri";

const OurPolicy= () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 dark:text-white dark:bg-slate-800'>
      <div>
        {/* <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="Exchange Icon" /> */}
        <RiExchangeFundsFill className='w-12 m-auto mb-5' size={50}/>
        
        <p className='font-semi-bold'>Easy Exchange Policy</p>
        <p className='text-gray-400 dark:text-gray-300'>We offer hassle free exchange policy</p>
        
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="Quality Icon" />
        <p className='font-semi-bold'>24/7 Customer Support</p>
        <p className='text-gray-400 dark:text-gray-300'>Seven Days Return Policy</p>
      </div>
      <div>
       
        <RiCustomerServiceLine className='w-12 m-auto mb-5' size={50}/>
        <p className='font-semi-bold'>Best Customer Support</p>
        <p className='text-gray-400 dark:text-gray-300'>24/7 Customer Support</p>
      </div>
    </div>
  )
}

export default OurPolicy