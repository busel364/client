import React from 'react'
import { useAppSelector } from '../../../../../app/hooks';
import UserPost from './UserPost';

const UserPostsContainer = () => {

    const mode = useAppSelector(state => state.mode);

    const userPosts = [{ title: 'title1', imgs: [''], text: '', tags: '' },
    { title: 'title2', imgs: [''], text: '', tags: '' },
    { title: 'title3', imgs: [''], text: '', tags: '' },
    { title: 'title4', imgs: [''], text: '', tags: '' }]
    
    return ( userPosts.length>0?
        <div className='my-5 row'>
            {userPosts.map(item=><UserPost item={item} key={item.title+Date.now()}/>)}
        </div>
        :
        <div className='mt-5 '>
            <h2 className='text-center' style={{color:mode?'black':'whitesmoke',fontWeight:'200'}}>אין פה אף פוסט, אבל אפשר להקים חדש בלחיצת כפתור למטה</h2>
            {/* <div style={{ height: '70vh' }}></div> */}
        </div>
    )
}

export default UserPostsContainer