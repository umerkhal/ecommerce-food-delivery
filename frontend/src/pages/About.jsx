import React from 'react'
import Title from '../component/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../component/NewsletterBox'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className='my-5 flex flex-col md:flex-row gap-16'>
      <img className='w-full md:w-[370px]' src={assets.about_img} alt="" />
      <div className='flex flex-col justify-center md:w-2/4 text-gray-600 gap-6'>
        <p>Your recent order includes premium-quality products carefully selected to meet your needs. Below, you’ll find detailed information about your purchased items, including price, quantity, and shipping status.</p>
        <p>Your recent order includes premium-quality products carefully selected to meet your needs. Below, you’ll find detailed information about your purchased items, including price, quantity, and shipping status.</p>
        <b className='text-gray-800 underline'>Over Mission</b>
        <p>Your recent order includes premium-quality products carefully selected to meet your needs. Below,</p>
      </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>
      <div className='flex flex-col md:flex-row txt-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Your recent order includes premium-quality products carefully selected to meet</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convenience:</b>
          <p className='text-gray-600'>Your recent order includes premium-quality products carefully selected to meet</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600'>Your recent order includes premium-quality products carefully selected to meet</p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  )
}

export default About
