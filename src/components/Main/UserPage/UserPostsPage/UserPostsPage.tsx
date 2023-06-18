import React from 'react'
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../../app/hooks'
import UserPostsContainer from './UserPostsContainer/UserPostsContainer';
import styles from '../modules/userPosts.module.css'

const UserPostsPage = () => {

    const mode = useAppSelector(state => state.mode);

    return (
        <div className='container-fluid row m-0' >
            <div className='container col-10 offset-1 pt-5' style={{ backgroundColor: mode ? 'rgba(60, 60, 60,0.5)' : 'rgba(241, 241, 245,0.2)' }}>
                <h1 className='text-center mt-5' style={{color:'whitesmoke',fontWeight:'100'}}>פוסטים</h1>
                <UserPostsContainer />
                <div className='text-center mb-5 py-5'>
                    <Link className={`${mode ? styles.lightformButton : styles.darkformButton} px-3 py-2 my-5`} to={''}>להקים פוסט חדש</Link>
                </div>
            </div>

        </div>
    )
}

export default UserPostsPage