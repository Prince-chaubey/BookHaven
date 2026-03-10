import React from 'react'
import Layout from '../../Layout/Layout'
import Hero from '../Hero/Hero';
import BestSeller from '../BestSeller/BestSeller';

const Home = () => {
  return (
    <Layout>
     
      <div className="mt-[100px]">
       <Hero/>
       <BestSeller/>
      </div>
    </Layout>
  )
}

export default Home;