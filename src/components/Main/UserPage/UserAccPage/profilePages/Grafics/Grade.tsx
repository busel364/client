import { Divider } from 'antd'
import React from 'react'

interface Props {
    item: number,
    gradeName: string
}

const Grade = ({ gradeName, item }: Props) => {
    return (
        <div className=' text-center col p-0'>
                <p className='pb-0 mb-0 pt-3'>{gradeName}</p>
                <p className='pt-0 mt-0' style={{ fontSize: '1.5rem' }}>{item.toFixed(2)}</p>
        </div>
    )
}

export default Grade