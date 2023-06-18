import React, { useEffect, useState } from 'react'
import { UserData } from '../../../../../../../utils/types/UserTypes'
import styles from '../../../../modules/userProfilePages.module.css'
import PriceChanger from './PriceChanger'
import { AppstoreAddOutlined } from '@ant-design/icons';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { pricesAdd } from '../../../../../../../reducers/UserReducer/UserReducer';
import { updatePrices } from '../../../../../../../reducers/AsyncActions/AccountActions';

interface Props {
    user: UserData
    setIsOn: (a: boolean) => void
}


const PricesChanger = ({ user, setIsOn }: Props) => {

    const dispatch = useAppDispatch();
    const prices = useAppSelector(state => state.user.prices);


    const handleSubmit = () => {
        dispatch(updatePrices(user.token!));
    }

    return (
        <div className={`container col-12 py-5 text-center`}>
            <div className={`${styles.center} col-12 `}>
                <p className='pt-4 mb-0' style={{ fontSize: '1.8rem', fontWeight: '100', color: '#333' }}>מידע על המחירים</p>
                <div className={styles.form}>
                    {prices && prices.length > 0 ?
                        <div>
                            <AppstoreAddOutlined
                                className={`${styles.plusSquare}`}
                                title='להקים חדש'
                                onClick={() => {
                                    if ((prices[0] && prices[0].price && prices[0].service) && (prices[0].price !== '' || prices[0].service !== ''))
                                        dispatch(pricesAdd());
                                    if (prices.length < 1) {
                                        dispatch(pricesAdd());
                                    }
                                }} />
                            <div className={`col-12 col-md-12 row m-0 p-0`} style={{ margin: '0 auto' }}>
                                {prices.map((item, index) => <PriceChanger
                                    item={item}
                                    key={`${item.price}${index}${item.service.length}${item.id}`} />
                                )}
                                <input className='col-6' type="submit" value="לשמור" onClick={() => {
                                    handleSubmit()
                                    setIsOn(false)
                                    }} />
                                <div className='text-center'>
                                    <p className={`${styles.pass} my-3 pb-0`} style={{ width: '100px', margin: '0 auto' }} onClick={() => setIsOn(false)}>לחזור</p>
                                </div>
                            </div>
                        </div>

                        :

                        <div>
                            <AppstoreAddOutlined
                                className={`${styles.plusSquareBig} mt-4 mb-0`}
                                title='להקים חדש'
                                onClick={() => {
                                    dispatch(pricesAdd());
                                }} />
                            <div className='text-center'>
                                <p className='pt-4 mb-0' style={{ fontSize: '1.4rem', fontWeight: '100', color: '#333' }}>להוסיף מידע</p>
                            </div>
                            <div className='text-center'>
                                <p className={`${styles.pass} my-3 pb-4`} style={{ width: '100px', margin: '0 auto' }} onClick={() => setIsOn(false)}>לחזור</p>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default PricesChanger