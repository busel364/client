import React, { useState } from 'react'
import styles from '../modules/panels.module.css'
import AutoCompleteUserStatusChanger from './AutoCompleteUserStatusChanger'
import { UserData } from '../../../../utils/types/UserTypes';
import { useAppSelector } from '../../../../app/hooks';
import FilteredUser from './FilteredUser';
import NullUsers from '../../HomePage/Services/NullUsers';

const UserStatusChanger = () => {

  const [filter, setFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserData | null>();
  const { users } = useAppSelector(state => state);

  const getFilteredUsers = (): UserData[] => {
    if (selectedUser) {
      return users.filter(item => JSON.stringify(item).toLowerCase().includes(JSON.stringify(selectedUser).toLowerCase()))
    }
    return users.filter(item => JSON.stringify(item).toLowerCase().includes(filter.toLowerCase()));
  }
  

  return (
    <div className={`container-fluid col-12 text-center`}>
      <p className='pt-0 mb-0' style={{ fontSize: '1.8rem', fontWeight: '100', color: '#333' }}>ניהול משתמשים</p>
      <div className={styles.form}>
        <div className={`col-12 row m-0 p-0`}>
          <AutoCompleteUserStatusChanger setFilter={setFilter} setSelectedUser={setSelectedUser} />
          {
            getFilteredUsers().length > 0 ?

              getFilteredUsers().map(item => <FilteredUser key={item._id} user={item} />)

              :

              <NullUsers />
          }

        </div>
      </div>
    </div>
  )
}

export default UserStatusChanger