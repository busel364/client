import React from 'react'
import { services } from '../../../../utils/utils'
import { Link } from 'react-router-dom'
import styles from '../modules/homePage.module.css'
import { useAppDispatch } from '../../../../app/hooks'
import { setService } from '../../../../reducers/FilterReducer/FilterReducer'

const Services = () => {

    const dispatch = useAppDispatch();

    return (
        <div className='container-fluid' style={{ backgroundColor: 'whitesmoke' }}>
            <h2 className='py-3 pe-5 text-end' style={{ color: '#333', fontWeight: '100' }}>שירותים המבוקשים</h2>
            <div className='row'>
                {services.map(item =>
                    <Link                     
                    // style={{height:'300px', width:'300px'}}
                        key={item.title}
                        onClick={()=>dispatch(setService(item.title))}
                        to={"/services"} className={`${styles.servicesLink} col container p-0 text-center`}>
                        <div>
                            <img
                                className={styles.imgServiceBlock}
                                src={'https://www.nomorechores.com/wp-content/uploads/2017/09/dreamstime_m_81089211.jpg'}
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
    )
}

export default Services