import React from 'react'
import { Post } from '../../../../../../utils/types/PostTypes'

interface Props {
    item: Post
}

const Comment = ({ item }: Props) => {



    return (
        <div style={{ color: 'whitesmoke', fontSize: '1.3rem' }} className='text-end container row px-2 pt-4 pb-5'>
            <p>{item.userSharedPost.fullName}</p>
            <p>{new Date(Date.parse(item.updatedAt)).toLocaleDateString()} :משוב</p>
            <div className='col-12'>
                <p className='mb-1'>:תיאור השירות</p>
                <p className='text-end'>{item.title}</p>
            </div>
            <div className='col-12'>
                <p className='mb-1'>:חוות דעת</p>
                <p className='text-end'>{item.text}</p>
            </div>
            <div className='col-12 row px-0 text-end'>
                <p className='col px-0  text-end'>
                    <span style={{ borderRadius: '50%', border: '1px solid whitesmoke' }} className='px-2'>
                        {item.grades.ratio.toFixed(0)}
                    </span>
                    <span className='px-2'>
                        יחס
                    </span>
                </p>
                <p className='col px-0  text-end'>
                    <span style={{ borderRadius: '50%', border: '1px solid whitesmoke' }} className='px-2'>
                        {item.grades.times.toFixed(0)}
                    </span>
                    <span className='px-2'>
                        זמנים
                    </span>
                </p>
                <p className='col px-0 text-end'>
                    <span style={{ borderRadius: '50%', border: '1px solid whitesmoke' }} className='px-2'>
                        {item.grades.price.toFixed(0)}
                    </span>
                    <span className='px-2'>
                        מחיר
                    </span>
                </p>
                <p className='col px-0 text-end'>
                    <span style={{ borderRadius: '50%', border: '1px solid whitesmoke' }} className='px-2'>
                        {item.grades.quality.toFixed(0)}
                    </span>
                    <span className='px-2'>
                        איכות
                    </span>
                </p>
            </div>
        </div>
    )
}

export default Comment