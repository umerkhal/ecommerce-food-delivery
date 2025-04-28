import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
      <div>
        <img src={assets.logo} className='mb-5 w-32' alt="" />
        <p className='w-full md:w-2/3 text-gray-600'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod. quod.Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.
        </p>
      </div>
      <div>
        <p className='text-xl font-medium mb-5'>COMPONY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
        <li>Home</li>
        <li>About</li>
        <li>Delivery</li>
        <li>Privacy Policy</li>
        </ul>
      </div>
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+92 3098842500</li>
            <li>info@foodie.com</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className='text-center py-4 text-sm'>
          Copyright © 2025 Foodie. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer
