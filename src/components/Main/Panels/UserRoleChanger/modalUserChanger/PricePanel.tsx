import React, { useEffect, useState } from 'react'
import styles from '../../../UserPage/modules/userProfilePages.module.css'
import { DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import { Prices } from '../../../../../utils/types/UserTypes';
import { useAppDispatch } from '../../../../../app/hooks';

interface Props {
    item: Prices,
    pricesUpdate: (price: Prices) => void
    pricesRemove: (id: number) => void
}

const PricePanel = ({ item, pricesRemove, pricesUpdate }: Props) => {

    const dispatch = useAppDispatch();

    const [price, setPrice] = useState(item.price ? item.price : '');
    const [service, setService] = useState(item.service ? item.service : '');
    const [isOn, setIsOn] = useState(item.price !== '' && item.service !== '');

    useEffect(() => {
    }, [item])

    return (
        <div style={{ borderBottom: '2px solid  #666666' }} className='mb-5'>
            {!isOn ?
                <div>
                    <div className={`${styles.txt_field} text-end`}>
                        <input type="text"
                            className='text-end'
                            value={price}
                            onChange={(e) => {
                                setPrice(e.target.value);
                                // handleChange(e.target.value, 'price')
                            }}
                            required />
                        <label className='text-end'>מחיר</label>
                        <span></span>
                    </div>
                    <div className={`${styles.txt_field} mb-3`}
                        style={{ textAlign: 'end', display: 'block' }}>
                        <textarea
                            className='text-end'
                            value={service}
                            onChange={(e) => {
                                setService(e.target.value);
                                // handleChange(e.target.value, 'service')
                            }}
                            required>
                        </textarea>
                        <label className={`${styles.labelTextArea}`} >שירות</label>
                        <span className={`${styles.spanTextArea}`}></span>
                    </div>
                </div>

                :

                <div className='row'>
                    <div className='row row-cols-2'>
                        <p className='pt-4 mb-0 col' style={{ fontSize: '1.4rem', fontWeight: '100', color: '#333' }}>{price}</p>
                        <p className='pt-4 mb-0 col' style={{ fontSize: '1.4rem', fontWeight: '100', color: '#333' }}>מחיר</p>
                    </div>
                    <div className='row row-cols-2'>
                        <p className='pt-4 mb-0 col' style={{ fontSize: '1.4rem', fontWeight: '100', color: '#333' }}>{service}</p>
                        <p className='pt-4 mb-0 col' style={{ fontSize: '1.4rem', fontWeight: '100', color: '#333' }}>תיאור השירות</p>
                    </div>
                </div>
            }
            <div className=' text-end mb-2'>
                {isOn ?
                    <EditOutlined
                        className={`${styles.deleteButton} mx-3`}
                        title='לשנות'
                        onClick={() => {
                            setIsOn(false)
                        }}
                    />

                    :

                    <CheckOutlined
                        className={`${styles.deleteButton} mx-3`}
                        title='לשמור'
                        onClick={() => {
                            setIsOn(true)
                            pricesUpdate({ id: item.id, price, service })
                        }}
                    />
                }
                <DeleteOutlined
                    className={`${styles.deleteButton} mx-3`}
                    title='למחוק'
                    onClick={() => pricesRemove(item.id)} />
            </div>
        </div>
    )
}

export default PricePanel