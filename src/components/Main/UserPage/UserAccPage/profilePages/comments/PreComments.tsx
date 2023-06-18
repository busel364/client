import React, { useState } from 'react'
import CommentsGuest from './CommentsGuest';
import Comments from './Comments';
import { UserData } from '../../../../../../utils/types/UserTypes';
import { useAppSelector } from '../../../../../../app/hooks';
import styles from '../../../modules/userProfilePages.module.css'
import CommentCreator from './CommentCreator';

interface Props {
    user: UserData
}

const PreComments = ({ user }: Props) => {

    const userState = useAppSelector(state => state.user);
    const posts = useAppSelector(state => state.posts);

    const [isOn, setIsOn] = useState(false);

    if (posts.length < 1) {
        return (!isOn ?
            <div className='text-center '
                style={{ paddingBottom: '200px' }}>
                <h3 style={{ color: 'whitesmoke', fontWeight: '200' }} className='pt-5'>אין פה אף חוות דעת</h3>
                {userState ?
                    userState._id !== user._id ?
                        <div className='pb-5'>
                            <button
                                className={`${styles.newCommentButton} my-2 mb-5 pt-2 pb-3`}
                                onClick={() => setIsOn(true)}
                            >ליצור חדש</button>
                        </div>
                        : null
                    : null}
            </div>

            :

            <CommentCreator setIsOn={setIsOn} item={user}/>
        )
    } else {
        return user._id === userState._id ? <Comments /> : <CommentsGuest item={user}/>;
    }
}

export default PreComments