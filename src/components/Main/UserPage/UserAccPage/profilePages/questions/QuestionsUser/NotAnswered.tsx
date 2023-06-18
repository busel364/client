import React from 'react'
import { QuestionsAndAnswers } from '../../../../../../../utils/types/UserTypes'
import styles from '../../../../modules/userProfilePages.module.css'
import AnswerChanger from './AnswerChanger'
import NullQuestions from '../NullQuestions'

interface Props {
    notAnswered: QuestionsAndAnswers[]
}

const NotAnswered = ({ notAnswered }: Props) => {
    return ( notAnswered && notAnswered.length>0?
        <div className={`container col-12 py-5 text-center`}>
            <div className={`${styles.center} col-12 `}>
                <div className={styles.form}>
                    <div>
                        <div className={`col-12 col-md-12 row m-0 p-0`} style={{ margin: '0 auto' }}>
                            {notAnswered.map((item) => <AnswerChanger
                                item={item}
                                key={item._id} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        :

        <div className='text-center '>
            <h3 style={{ color: 'whitesmoke', fontWeight: '200' }} className='pt-5'>אין פה שאלות בינתיים</h3>
        </div >
    )
}

export default NotAnswered