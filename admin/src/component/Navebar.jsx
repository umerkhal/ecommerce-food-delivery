import React from 'react'
import {assets} from "../assets/assets"
const Navebar = ({setToken}) => {
  return (
    <div className='flex justify-between items-center py-4 px-5 sm:px-10'>
      <img className='w-[max(10%,80px)]' src={assets.logo} alt="" />
      <button onClick={() => setToken('')} className='bg-gray-600 text-white cursor-pointer px-5 py-2 sm:px-7 rounded-full text-xs sm:text-sm'>Logout</button>
    </div>
  )
}

export default Navebar
