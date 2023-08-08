import React, { useEffect } from 'react'
import { services } from '../../../../utils/utils'
import { Link, useNavigate } from 'react-router-dom'
import styles from '../modules/homePage.module.css'
import stylesMap from '../../UserPage/modules/userAcc.module.css'
import { useAppDispatch } from '../../../../app/hooks'
import { setService } from '../../../../reducers/FilterReducer/FilterReducer'

const Services = () => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <div className='container-fluid' style={{ backgroundColor: 'whitesmoke' }}>
            <div style={{ direction: 'rtl' }}>
                <div style={{width: '311px'}}>
                    <h2 onClick={() => navigate('services')} className={`py-3 pe-5 ${styles.titleLink}`} style={{ color: '#333', fontWeight: '100' }}>שירותים המבוקשים</h2>
                </div>
            </div>
            <div className='row m-0'>
                <div className={`col-12 m-0 p-0 ${styles.blockChanger1}`}>
                    <div className={`${styles.blockChanger2} row`}>
                        {services.map(item =>
                            <Link
                                style={{ width: '290px' }}
                                key={item.title}
                                onClick={() => dispatch(setService(item.title))}
                                to={"/services"} className={`${styles.servicesLink} col container p-0 text-center`}>
                                <div>
                                    <img
                                        className={styles.imgServiceBlock}
                                        src={item.img}
                                        // src={''}
                                        alt={item.title}
                                        title={item.title} />
                                </div>
                                <h3 className=' py-2 pe-3'>
                                    {item.title}
                                </h3>
                            </Link>
                        )}
                    </div>
                </div>
            </div>
            <div className='row'>
            </div>
        </div>
    )
}

export default Services