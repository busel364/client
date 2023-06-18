import React from 'react'
import { UserData } from '../../../../../../utils/types/UserTypes'
import Price from './Price'

interface Props {
  user: UserData
}

const PricesGuest = ({ user }: Props) => {

  return (

    <div className='text-end container'>
      <div className='row'>
        <div className='col-0 col-sm-2 col-md-4'></div>
        <div
          className='row col-12 col-sm-10 col-md-8'
          style={{ color: 'whitesmoke', fontSize: '1.3rem' }}>
          <p className='col-5'>מחיר</p>
          <p className='col-7'>תיאור השירות</p>
        </div>
      </div>
      {user.prices!.map((item, i) => <Price item={item} key={i} />)}
    </div>

  )
}

export default PricesGuest