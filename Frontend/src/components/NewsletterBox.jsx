import React from 'react'

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault()
  }

  return (
    <div className='text-center dark:bg-slate-800 dark:text-white p-6 rounded-lg'>
      <p className='text-2xl font-medium text-gray-800 dark:text-white'>Subscribe now & get 20% off</p>
      <p className='text-gray-500 mt-3 dark:text-gray-400'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Delectus, molestias.
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-300 dark:border-gray-600 p-2 rounded-md'>
        <input className='w-full sm:flex-1 outline-none dark:bg-slate-700 dark:text-white p-2 rounded-md' type="email" placeholder='Enter Your Email' required />
        <button type='submit' className='bg-black text-white text-xs px-10 py-4 dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-700'>Subscribe</button>
      </form>
    </div>
  )
}

export default NewsletterBox