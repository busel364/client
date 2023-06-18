import React from 'react'
import { QuestionsAndAnswers } from '../../../../../../../utils/types/UserTypes'

interface Props {
    item: QuestionsAndAnswers
}

const AnswerGuest = ({ item }: Props) => {
    return (
        <div className={` text-end row mb-4`} style={{ color: '#333' }}>
            <div className='' style={{ backgroundColor: 'rgb(102, 102, 102,0.2)', borderRadius: '15px' }}>
                <div className=''>
                    <p className='col mb-0 pt-3' style={{ fontSize: '1.4rem' }}>{item.title}</p>
                </div>
                <div className=''>
                    <p className=' col' style={{ fontSize: '1.4rem', fontWeight: '100' }}>{item.question}</p>
                </div>
            </div>
            <div className='' style={{ backgroundColor: 'rgb(100, 149, 237,0.3)', borderRadius: '15px' }}>
                <div className='mb-2'>
                    <p className='pt-2 mb-2 col' style={{ fontSize: '1.4rem' }}>תשובה</p>
                    <p className='col' style={{ fontSize: '1.4rem', fontWeight: '100' }}>{item.answer}</p>
                </div>
            </div>
        </div>
    )
}

export default AnswerGuest