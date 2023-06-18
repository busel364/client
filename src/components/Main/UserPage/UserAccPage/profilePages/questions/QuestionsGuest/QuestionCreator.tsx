import React, { useState } from 'react'
import styles from '../../../../modules/userProfilePages.module.css'
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { addQuestion } from '../../../../../../../reducers/AsyncActions/AccountActions';
import { UserData } from '../../../../../../../utils/types/UserTypes';

interface Props {
    user: UserData,
    setIsOn: (a: boolean) => void
}

const QuestionCreator = ({ user, setIsOn }: Props) => {

    const dispatch = useAppDispatch();
    const { token } = useAppSelector(state => state.user)

    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');

    const handleSubmit = () => {
        try {
            dispatch(addQuestion(user._id!, token!, title, question));
            console.log(user._id!,  title, question);
            console.log(token!);
            
            setIsOn(false)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={`container col-12 py-5 text-center`}>
            <div className={`${styles.center} col-12 `}>
                <p className='pt-4 mb-0' style={{ fontSize: '1.8rem', fontWeight: '100', color: '#333' }}>שאלה חדשה</p>
                <div className={styles.form}>
                    <div className={`col-sm-10 col-md-12 row m-0 p-0`}>
                        <div className={`${styles.txt_field} text-end`}>
                            <input type="text"
                                className='text-end'
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                }}
                                required />
                            <label className='text-end'>תיאור השאלה</label>
                            <span></span>
                        </div>
                        <div className={`${styles.txt_field}`}
                            style={{ textAlign: 'end', display: 'block' }}>
                            <textarea
                                className='text-end'
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                required></textarea>
                            <label className={`${styles.labelTextArea}`} >שאלה</label>
                            <span className={`${styles.spanTextArea}`}></span>
                        </div>
                        <input className='col-6' type="submit" value="לשלוח" onClick={() => handleSubmit()} />
                        <div className='text-center'>
                            <p className={`${styles.pass} my-3 pb-0`} style={{ width: '100px', margin: '0 auto' }} onClick={() => setIsOn(false)}>לחזור</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionCreator