import React from 'react'
import { Prices } from '../../../../../../utils/types/UserTypes'

interface Props {
    item: Prices
}

const Price = ({ item }: Props) => {
    return (
        <div className='row'>
            <div className='col-0 col-sm-2 col-md-4 '></div>
            <div
                className='row col-12 col-sm-10 col-md-8 '
                style={{ color: 'whitesmoke', fontSize: '1.3rem' }}>
                <p className='col-5'>{item.price}</p>
                <p className='col-7'>{item.service}</p>
            </div>
        </div>
    )
}

export default Price