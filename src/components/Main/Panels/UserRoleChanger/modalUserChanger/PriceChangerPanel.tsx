import React, { useEffect, useState } from 'react'
import { AppstoreAddOutlined } from '@ant-design/icons';
import styles from '../../../UserPage/modules/userProfilePages.module.css'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { Prices, UserData } from '../../../../../utils/types/UserTypes';
import PricePanel from './PricePanel';
import { adminUpdatePrices } from '../../../../../reducers/AsyncActions/SelectedUserActions';

interface Props {
    user: UserData
    setIsOn: (a: boolean) => void
}

const PriceChangerPanel = ({ setIsOn, user }: Props) => {

    const dispatch = useAppDispatch();
    // const user = useAppSelector(state=>state.selectedUser);
    
    const a = useAppSelector(state => state.user);
    const [prices, setPrices] = useState<Prices[]>(user!.prices ? user!.prices : [] as Prices[]);

    const handleSubmit = () => {
        dispatch(adminUpdatePrices(a.token!, user!._id!, prices));
    }

    const pricesAdd = () => {
        setPrices(prev => [
            {
                id: prices.length > 0 ? prices[0].id + 1 : 1,
                price: '',
                service: ''
            },
            ...prev])
    }

    const pricesRemove = (id: number) => {
        const index = prices.findIndex(item => item.id === id);
        const arr = [...prices];
        arr.splice(index, 1);
        setPrices(arr);
    }

    const pricesUpdate = (price: Prices) => {
        const index = prices.findIndex(item => item.id === price.id);
        const arr = [...prices];
        arr[index] = price;
        setPrices(arr);
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
                                        pricesAdd();
                                    if (prices.length < 1) {
                                        pricesAdd();
                                    }
                                }} />
                            <div className={`col-12 col-md-12 row m-0 p-0`} style={{ margin: '0 auto' }}>
                                {prices.map((item, index) => <PricePanel
                                    pricesRemove={pricesRemove}
                                    pricesUpdate={pricesUpdate}
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
                                    pricesAdd();
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

export default PriceChangerPanel