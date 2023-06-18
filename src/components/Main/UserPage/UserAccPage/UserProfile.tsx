import React, { useEffect, useState } from 'react'
import { UserData } from '../../../../utils/types/UserTypes'
import UserProfileCurPage from './UserProfileCurPage';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import UserGuestPage from './UserGuestPage';
import UserLogginedPage from './UserLogginedPage';
import { getPostsById } from '../../../../reducers/AsyncActions/PostsActions';

interface Props {
    item: UserData
}

const UserProfile = ({ item }: Props) => {

    const dispatch = useAppDispatch();

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


    if (user._id === item._id) {
        return <UserLogginedPage />
    } else {
        return <UserGuestPage item={item} />
    }
}

export default UserProfile