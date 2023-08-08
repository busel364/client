import React, { useState } from 'react'
import { UserData } from '../../../../utils/types/UserTypes'
import CustomRoleSelection from './CustomRoleSelection'
import { Link } from 'react-router-dom'
import stylesPanel from '../modules/panels.module.css'
import styles from '../../UserPage/modules/userAcc.module.css'
import { useAppDispatch } from '../../../../app/hooks'
import { setSelectedUser } from '../../../../reducers/SelectedUserReducer/SelectedUserReducer'

interface Props {
    user: UserData,
    setIsOn: (a: boolean) => void,
}

const FilteredUser = ({ user, setIsOn }: Props) => {

    const dispatch = useAppDispatch();

    return (
        <div className='text-end container-fluid row py-4 px-0' style={{ margin: '0 auto' }}>
            <div className={`col ${stylesPanel.firstRoleSelector}`}>
                <CustomRoleSelection user={user} />
            </div>
            <div className='col'>
                <p
                    className={styles.pass}
                    onClick={() => {
                        dispatch(setSelectedUser(user))
                        setIsOn(true)
                    }}>{user.fullName}</p>
                <Link to={`/${user._id}`}>{user._id}</Link>
            </div>
            <div className={`col ${stylesPanel.secondRoleSelector}`}>
                <CustomRoleSelection user={user} />
            </div>
        </div>
    )
}

export default FilteredUser