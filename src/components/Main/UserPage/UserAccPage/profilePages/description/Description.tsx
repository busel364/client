import React, { useState } from 'react'
import styles from '../../../modules/userProfilePages.module.css'
import { DescriptionUser } from '../../../../../../utils/types/UserTypes'
import NullPrice from '../prices/NullPrice'
import DescriptionChanger from './DescriptionChanger'
import DescriptionGuest from './DescriptionGuest'

interface Props {
  description: DescriptionUser | null
}

const Description = ({ description }: Props) => {

  const [isOn, setIsOn] = useState(false);

  return (!isOn ?

    !description ?

      <div className='text-end container pb-5'>
        <button
          className={`${styles.newCommentButton} my-4 mb-5 pt-2 pb-3`} onClick={() => setIsOn(true)}>להוסיף מידע</button>
        <NullPrice />
      </div>

      :

      <div className='text-end container pb-5'>
        <button
          className={`${styles.newCommentButton} my-4 mb-5 pt-2 pb-3`} onClick={() => setIsOn(true)}>לשנות מידע</button>
        <DescriptionGuest description={description} />
      </div>

    :

    <div>
      <DescriptionChanger setIsOn={setIsOn} description={description} />
    </div>

  )
}

export default Description