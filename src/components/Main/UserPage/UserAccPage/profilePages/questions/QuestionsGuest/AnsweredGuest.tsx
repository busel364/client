import React from 'react'
import { QuestionsAndAnswers } from '../../../../../../../utils/types/UserTypes'
import AnswerGuest from './AnswerGuest'
import NullQuestions from '../NullQuestions'
import styles from '../../../../modules/userProfilePages.module.css'

interface Props {
    answered: QuestionsAndAnswers[]
}

const AnsweredGuest = ({ answered }: Props) => {
    return (answered && answered.length > 0 ?
        <div className={`container col-12 py-5 text-center`}>
            <div className={`${styles.center} col-12 `}>
                <p className='pt-4 mb-0' style={{ fontSize: '1.8rem', fontWeight: '100', color: '#333' }}>שאלות ותשובות</p>
                <div className={styles.form}>
                    <div className={`col-sm-10 col-md-12 row m-0 p-0`}>
                        {answered.map(item => <AnswerGuest key={item._id} item={item} />)}
                    </div>
                </div>
            </div>
        </div>

        :
        <div className='pb-5'>
            <NullQuestions />
        </div>
    )
}

export default AnsweredGuest