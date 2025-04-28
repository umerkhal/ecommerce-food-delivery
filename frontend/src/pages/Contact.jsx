import React from 'react'
import Title from '../component/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../component/NewsletterBox'

const Contact = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 border-t'>
      <Title text1={'Contact'} text2={'Us'}/>
      </div>
      <div className='my-5 flex flex-col justify-center md:flex-row gap-10 mb-28'>
        <img className='w-full md:max-w-[380px]' src={assets.contact_img} alt="" />
      <div className='flex flex-col justify-center items-start gap-6'>
        <p className='font-semibold text-xl text-gray-600'>Over Store</p>
        <p className='text-gray-500'>54708 Willms Station <br />Suite 350, Washington, USA</p>
        <p className='text-gray-500'>Tel: (412) 555-0132 <br />Email: admin@forever.com</p>
        <p className='font-semibold text-xl text-gray-600'>Careers at Forever</p>
        <p className='text-gray-500'>Learn about our teams and job openings</p>
        <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
      </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default Contact
