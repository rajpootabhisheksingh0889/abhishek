import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import CompanySection from './CompanySection'
import Faq from './Faq'
import StyledCarousel from './StyledCarousel'

function HomePage() {
  return (
    <div>
      <Navbar/>
      <StyledCarousel />
      <CompanySection/>
      <br/>
      <Faq/>
        <Footer/>
    </div>
  )
}

export default HomePage