import React from 'react'
import { DescriptionUser } from '../../../../../../utils/types/UserTypes'
import NullPrice from '../prices/NullPrice'
import Specialization from './Specialization'

interface Props {
  description: DescriptionUser | null
}


const DescriptionGuest = ({ description }: Props) => {

  return (!description?.experience && !description?.main ?
    <div className='py-5'>
      <NullPrice />
    </div>
    :

    <div className='text-end pe-4 py-4'
      style={{ color: 'whitesmoke' }}>
      <h3 className='pt-2 pb-1'>אודות</h3>
      <p style={{fontWeight:'100', fontSize:'1.3rem'}}>{description.main}</p>
      <h4 className='pt-2 pb-1'>תחומי התמחות</h4>
      {description.specialization?.map((item, index) => <Specialization item={item} key={item + '+' + index} />)}
      <h4 className='pt-2 pb-1'>ותק בתחום</h4>
      <p style={{fontWeight:'100', fontSize:'1.3rem'}}>{description.experience}</p>
      <h4 className='pt-2 pb-1'>האחריות כוללת</h4>
      <p style={{fontWeight:'100', fontSize:'1.3rem'}}>{description.warrantly}</p>
    </div>
  )
}

export default DescriptionGuest