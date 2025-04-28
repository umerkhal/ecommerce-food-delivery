import React from 'react'
import Hero from '../component/Hero'
import LatestCollection from '../component/LatestCollection'
import BestSeller from '../component/BestSeller'
import OverPolicy from '../component/OverPolicy'
import NewsletterBox from '../component/NewsletterBox'
const Home = () => {
  return (
    <div>
    <Hero/>
    <LatestCollection/>
    <BestSeller/>
    <OverPolicy/>
    <NewsletterBox/>
    </div>
  )
}

export default Home
