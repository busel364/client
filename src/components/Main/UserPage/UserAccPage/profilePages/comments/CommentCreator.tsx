import React, { useState } from 'react'
import styles from '../../../modules/userProfilePages.module.css'
import { Rate } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../../../app/hooks';
import { UserData } from '../../../../../../utils/types/UserTypes';
import { createPost } from '../../../../../../reducers/AsyncActions/PostsActions';
import { addGrade } from '../../../../../../reducers/AsyncActions/AccountActions';

interface Props {
    setIsOn: (a: boolean) => void
    item: UserData
}

const CommentCreator = ({ setIsOn, item }: Props) => {

    const dispatch = useAppDispatch();

    const user = useAppSelector(state => state.user);

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [ratio, setRatio] = useState(0);
    const [price, setPrice] = useState(0);
    const [quality, setQuality] = useState(0);
    const [times, setTimes] = useState(0);


    const handleSubmit = () => {
        try {
            dispatch(createPost(user, item._id!,
                {
                    text: description,
                    title,
                    grades: {
                        ratio,
                        price,
                        quality,
                        times
                    }
                }))
                dispatch(addGrade(item._id!, user.token!, (ratio+price+quality+times)/4))
                setIsOn(false)
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className={`container col-12 py-5 text-center`}>
            <div className={`${styles.center} col-12 `}>
                <p className='pt-4 mb-0' style={{ fontSize: '1.8rem', fontWeight: '100', color: '#333' }}>דעה חדשה</p>
                <div className={styles.form}>
                    <div className={`col-sm-10 col-md-12 row m-0 p-0`}>
                        <div className={`${styles.txt_field} text-end`}>
                            <input type="text"
                                className='text-end'
                                value={title!}
                                onChange={(e) => setTitle(e.target.value)}
                                required />
                            <label className='text-end'>כותרת</label>
                            <span></span>
                        </div>
                        <div className={`${styles.txt_field}`}
                            style={{ textAlign: 'end', display: 'block' }}>
                            <textarea
                                className='text-end'
                                value={description!}
                                onChange={(e) => setDescription(e.target.value)}
                                required></textarea>
                            <label className={`${styles.labelTextArea}`} >תיאור</label>
                            <span className={`${styles.spanTextArea}`}></span>
                        </div>
                        <div className='row' style={{ fontSize: '1.3rem' }}>
                            <div>
                                <Rate allowHalf defaultValue={0} count={10} value={quality} onChange={(e) => setQuality(e)} />
                                <p style={{ textDecoration: 'underline' }}>איכות</p>
                            </div>
                            <div>
                                <Rate allowHalf defaultValue={0} count={10} value={price} onChange={(e) => setPrice(e)} />
                                <p style={{ textDecoration: 'underline' }}>מחיר</p>
                            </div>
                            <div>
                                <Rate allowHalf defaultValue={0} count={10} value={times} onChange={(e) => setTimes(e)} />
                                <p style={{ textDecoration: 'underline' }}>זמנים</p>
                            </div>
                            <div>
                                <Rate allowHalf defaultValue={0} count={10} value={ratio} onChange={(e) => setRatio(e)} />
                                <p style={{ textDecoration: 'underline' }}>יחס</p>
                            </div>
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

export default CommentCreator

{/* <div className=''>
             <div className='row row-cols-2'>
                 <div>

                 </div>
                 <button
                     className={`${styles.newCommentButton} pt-2 pb-3`}
                     onClick={() => setIsOn(false)}
                 >לחזור</button>
                 <button
                     className={`${styles.newCommentButton} pt-2 pb-3`}
                     onClick={() => setIsOn(false)}
                 >לשלוח</button>
             </div>
         </div> */}