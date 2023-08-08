import React, { useEffect, useState } from 'react'
import { UserData } from '../../../../utils/types/UserTypes'
import UserProfileCurPage from './UserProfileCurPage';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import UserGuestPage from './UserGuestPage';
import UserLogginedPage from './UserLogginedPage';
import { getPostsById } from '../../../../reducers/AsyncActions/PostsActions';
import UserLogginedPageNotPartner from './UserLogginedPageNotPartner';
import { useNavigate } from 'react-router-dom';

interface Props {
    item: UserData
}

const UserProfile = ({ item }: Props) => {

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const user = useAppSelector(state => state.user);

    useEffect(() => {
        dispatch(getPostsById(item._id!))
        let m = setInterval(() => {
            dispatch(getPostsById(item._id!))
        }, 60000)
        return () => {
            clearInterval(m);
        }

    }, [item._id])

    useEffect(() => {
        if ((user._id !== item._id) && !item.roles?.toString().toLocaleLowerCase().includes('user')) {
            navigate('/');
        }
    }, [])



    if (user._id === item._id) {
        return user.roles?.toString().toLocaleLowerCase().includes('user') ? <UserLogginedPage /> : <UserLogginedPageNotPartner />;
    } else {
        return item.roles?.toString().toLocaleLowerCase().includes('user') ? <UserGuestPage item={item} /> : <>{navigate('/')}</>;
    }
}

export default UserProfile