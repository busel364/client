import React, { useEffect } from 'react'
import Services from './Services/Services'
import Carousel from './News/Carousel'
import { useAppDispatch } from '../../../app/hooks'
import { getNews } from '../../../reducers/AsyncActions/NewsActions'
import Footer from '../../Footer/Footer'
import styles from './modules/homePage.module.css'
import { Link, useNavigate } from 'react-router-dom'

const HomePage = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getNews())
  }, [])

  return (
    <div className=''>
      <div className={`text-center ${styles.mainContainer}`} style={{ height: '100vh', backgroundImage: require('../../../utils/imgs/bg1.png'), zIndex: '30', position: 'relative' }}>
        <img className={`${styles.bgImg}`} src={require('../../../utils/imgs/bg2.png')} alt="bg" style={{ position: 'absolute', height: '100vh', width: '100%', left: '0' }} />
        {/* <h1 className='pt-5' style={{ color: 'whitesmoke' }}>
          HomePage
        </h1> */}
        <div className='row mx-0 px-0 ' style={{ position: 'relative', top: '25%' }}>
          <img className='col-sm-10 col-md-8 col-lg-6 col-xl-4' src={require('../../../utils/imgs/2-removebg-preview.png')} style={{ margin: '0 auto' }} alt="mtzadon" />
        </div>
      </div>
      <Services />
      <div className='container-fluid px-0 mx-0' style={{ backgroundColor: 'whitesmoke' }}>
        <div className='col-12 container-fluid mx-0 pb-5' style={{ backgroundColor: 'whitesmoke', margin: '0 auto' }}>
          <div className='pt-5 pe-5 text-end ' style={{ direction: 'rtl' }}>
            <div className='px-1' style={{width:'100px'}}>
              <h2 onClick={()=>navigate('news')} className={` ${styles.titleLink}`} style={{ color: '#333', fontWeight: '100' }}>חדשות</h2>
            </div>
          </div>
          <Carousel />
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  )
}

export default HomePage