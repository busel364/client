import React, { useEffect, useState } from 'react'
import { QuestionsAndAnswers, UserData } from '../../../../../../../utils/types/UserTypes';
import AnsweredGuest from './AnsweredGuest';
import QuestionCreator from './QuestionCreator';
import NullPrice from '../../prices/NullPrice';
import styles from '../../../../modules/userProfilePages.module.css'


interface Props {
    questionsAndAnswers: QuestionsAndAnswers[],
    user: UserData
}

const QuestionsGuest = ({ questionsAndAnswers, user }: Props) => {
    const [isOn, setIsOn] = useState(false);
    const [answered, setAnswered] = useState<QuestionsAndAnswers[]>();

    useEffect(() => {
        if (questionsAndAnswers && questionsAndAnswers.length > 0) {
            setAnswered(questionsAndAnswers.filter(v => v.answer))
        }
    }, [questionsAndAnswers])


    return (questionsAndAnswers && questionsAndAnswers.length > 0 ?
        <div className='container-fluid m-0 pt-5 row'>
            {!isOn ?
                <div>
                    <div className='text-end'>
                        <button
                            className={`${styles.newCommentButton} my-2 mb-5 pt-2 pb-3 me-3 mt-4`}
                            onClick={() => setIsOn(true)}>שאלה חדשה</button>
                    </div>
                    <AnsweredGuest answered={answered!} />
                </div>

                :

                <div>
                    <QuestionCreator user={user} setIsOn={setIsOn} />
                </div>
                }
        </div>

        :
        <div>
            {!isOn ?
                <div>
                    <div className='text-end'>
                        <button
                            className={`${styles.newCommentButton} my-2 mb-5 pt-2 pb-3 me-3 mt-4`}
                            onClick={() => setIsOn(true)}>שאלה חדשה</button>
                    </div>
                    <div className='pb-5'>
                        <NullPrice />
                    </div>
                </div>

                :

                <div>
                    <QuestionCreator user={user} setIsOn={setIsOn} />
                </div>
            }
        </div>
    )
}


export default QuestionsGuest