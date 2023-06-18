import React from 'react'
import { UserData } from '../../../../utils/types/UserTypes'
import CustomRoleSelection from './CustomRoleSelection'
import { Link } from 'react-router-dom'

interface Props {
    user: UserData
}

const FilteredUser = ({ user }: Props) => {
    return (
        <div className='text-end container-fluid row py-4'>
            <div className='col'>
                <CustomRoleSelection user={user} />
            </div>
            <div className='col'>
                <p>{user.fullName}</p>
                <Link to={`/${user._id}`}>{user._id}</Link>
            </div>
        </div>
    )
}

export default FilteredUser