import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import CompanySection from './CompanySection'
import Faq from './Faq'
import StyledCarousel from './StyledCarousel'
import AgentHome from './AgentHome'
import FeaturedProductPage from './FeaturedProductPage'

function HomePage() {
  return (
    <div>
      <Navbar/>
      <StyledCarousel />
      <CompanySection/>
      <AgentHome/>
      <FeaturedProductPage/>
      <br/>
      <Faq/>
        <Footer/>
    </div>
  )
}

export default HomePage