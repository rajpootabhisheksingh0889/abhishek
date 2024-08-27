import React from 'react'
import Footer from './Footer'
import Navbar from './Navbar'
import CompanySection from './CompanySection'
import Faq from './Faq'

function HomePage() {
  return (
    <div>
      <Navbar/>
      <CompanySection/>
      <br/>
      <Faq/>
        <Footer/>
    </div>
  )
}

export default HomePage