import React from 'react'
import Services from './Services/Services'

const HomePage = () => {
  return (
    <div className='pt-5'>
      <div className='text-center' style={{ height: '94vh' }}>
        <h1 className='pt-5' style={{ color: 'whitesmoke' }}>
          HomePage
        </h1>
      </div>
      <Services />
    </div>
  )
}

export default HomePage