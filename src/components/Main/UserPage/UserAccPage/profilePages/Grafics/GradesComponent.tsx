import React from 'react'
import { Grades } from '../../../../../../utils/types/PostTypes'
import Grade from './Grade'
import Loader from '../../../../Loader'
interface Props {
    grades: Grades
}

const GradesComponent = ({ grades }: Props) => {

    return (grades ?
        <div className='row m-0  pt-2'>
            <div style={{ margin: '0 auto' }} className='row col-sm-12 col-md-8 '>
                <Grade item={grades.ratio} gradeName={'יחס'} />
                <p className='col p-0 m-0 text-center' style={{ fontSize: '3rem', fontWeight: '100', color: 'whitesmoke' }} >|</p>
                <Grade item={grades.times} gradeName={'זמנים'} />
                <p className='col p-0 m-0 text-center' style={{ fontSize: '3rem', fontWeight: '100', color: 'whitesmoke' }} >|</p>
                <Grade item={grades.price} gradeName={'מחיר'} />
                <p className='col p-0 m-0 text-center' style={{ fontSize: '3rem', fontWeight: '100', color: 'whitesmoke' }} >|</p>
                <Grade item={grades.quality} gradeName={'איכות'} />
            </div>
        </div>

        :

        <Loader />
    )
}

export default GradesComponent