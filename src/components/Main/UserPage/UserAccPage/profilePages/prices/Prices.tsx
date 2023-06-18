import React, { useState } from 'react'
import { UserData } from '../../../../../../utils/types/UserTypes'
import PricesChanger from './PricesChanger/PricesChanger';
import PricesGuest from './PricesGuest';
import styles from '../../../modules/userProfilePages.module.css'
import NullPrice from './NullPrice';
import { useAppDispatch } from '../../../../../../app/hooks';
import { pricesAdd } from '../../../../../../reducers/UserReducer/UserReducer';

interface Props {
  user: UserData
}

const Prices = ({ user }: Props) => {
  const dispatch = useAppDispatch();
  const [isOn, setIsOn] = useState(false);

  return (!isOn ?

    user.prices && user.prices!.length > 0 ?

      <>

        <div className='text-end container'>
          <button
            className={`${styles.newCommentButton} my-4 mb-5 pt-2 pb-3`}
            onClick={() => setIsOn(true)}
          >לשנות מידע</button>
        </div>
        <PricesGuest user={user} />

      </>

      :

      <div className='text-center'>
        <NullPrice />
        <button
          className={`${styles.newCommentButton} my-4 mb-5 pt-2 pb-3`}
          onClick={() => {
            setIsOn(true)
            // dispatch(pricesAdd());
          }}
        >להוסיף מידע</button>
      </div>
    :

    <PricesChanger user={user} setIsOn={setIsOn} />

  )
}

export default Prices