import React, { useEffect, useState } from 'react'
import { QuestionsAndAnswers } from '../../../../../../../utils/types/UserTypes'
import { DeleteOutlined, EditOutlined, CheckOutlined } from '@ant-design/icons';
import styles from '../../../../modules/userProfilePages.module.css'
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { deleteQA, updateQA } from '../../../../../../../reducers/AsyncActions/AccountActions';


interface Props {
    item: QuestionsAndAnswers
}


const AnswerChanger = ({ item }: Props) => {

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);

    const [isOn, setIsOn] = useState(false);
    const [answer, setAnswer] = useState(item.answer ? item.answer : '');


    useEffect(() => {
    }, [item, user])

    return (
        <div className={`container col-12 py-5 text-center`}>
            <div className={`${styles.center} col-12 `}>
                <p className='pt-4 mb-0' style={{ fontSize: '1.8rem', fontWeight: '100', color: '#333' }}></p>
                <div className={styles.form}>
                    <div className={`col-sm-10 col-md-12 row m-0 p-0`}>
                        <div style={{ borderBottom: '2px solid  #666666' }} className='mb-5'>
                            <div>
                                <div className={` text-end row`}>
                                    <div className=''>
                                        <p className='pt-2 mb-0 col' style={{ fontSize: '1.4rem', color: '#333' }}>תיאור השאלה</p>
                                        <p className='col' style={{ fontSize: '1.4rem', fontWeight: '100', color: '#333' }}>{item.title}</p>
                                    </div>
                                    <div className=''>
                                        <p className='pt-2 mb-0 col' style={{ fontSize: '1.4rem', color: '#333' }}>שאלה</p>
                                        <p className=' col' style={{ fontSize: '1.4rem', fontWeight: '100', color: '#333' }}>{item.question}</p>
                                    </div>
                                </div>
                                <div className={`${styles.txt_field} mb-3`}
                                    style={{ textAlign: 'end', display: 'block' }}>
                                    <textarea
                                        className='text-end'
                                        value={answer}
                                        onChange={(e) => {
                                            setAnswer(e.target.value);
                                            // handleChange(e.target.value, 'service')
                                        }}
                                        required>
                                    </textarea>
                                    <label className={`${styles.labelTextArea}`} >תשובה</label>
                                    <span className={`${styles.spanTextArea}`}></span>
                                </div>
                            </div>
                            <div className=' text-end mb-2'>
                                <CheckOutlined
                                    className={`${styles.deleteButton} mx-3`}
                                    title='לשמור'
                                    onClick={() => {
                                        dispatch(updateQA(user.token!, { _id: item._id!, answer }))
                                    }}
                                />

                                <DeleteOutlined
                                    className={`${styles.deleteButton} mx-3`}
                                    title='למחוק'
                                    onClick={() => dispatch(deleteQA(user.token!, { _id: item._id! }))} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnswerChanger