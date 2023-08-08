import React, { useEffect, useState } from 'react'
import styles from '../modules/panels.module.css'
import AutoCompleteUserStatusChanger from './AutoCompleteUserStatusChanger'
import { UserData } from '../../../../utils/types/UserTypes';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import FilteredUser from './FilteredUser';
import NullUsers from '../../HomePage/Services/NullUsers';
import ModalChanger from './modalUserChanger/ModalChanger';
import { getUsers } from '../../../../reducers/AsyncActions/UsersActions';
import { removeSelectedUser } from '../../../../reducers/SelectedUserReducer/SelectedUserReducer';

const UserStatusChanger = () => {
  const dispatch = useAppDispatch();
  const { selectedUser } = useAppSelector(state => state)

  const [filter, setFilter] = useState('');
  const [isOn, setIsOn] = useState(false);

  const { users } = useAppSelector(state => state);

  const getFilteredUsers = (): UserData[] => {
    // if (selectedUser) {
    //   return users.filter(item => JSON.stringify(item).toLowerCase().includes(JSON.stringify(selectedUser).toLowerCase()))
    // }
    return users.filter(item => JSON.stringify(item).toLowerCase().includes(filter.toLowerCase()));
  }

  useEffect(() => {
    dispatch(getUsers());
    if (!isOn) {
      dispatch(removeSelectedUser());
    }
  }, [selectedUser, isOn])


  return (
    <div className={`container-fluid col-12 text-center`}>
      <p className='pt-0 mb-0' style={{ fontSize: '1.8rem', fontWeight: '100', color: '#333' }}>ניהול משתמשים</p>
      {isOn ? selectedUser ? <ModalChanger user={selectedUser} setIsOn={setIsOn} /> : null : null}
      <div className={styles.form}>
        <div className={`col-12 row m-0 p-0`}>
          <AutoCompleteUserStatusChanger setFilter={setFilter} setIsOn={setIsOn}/>
          {
            getFilteredUsers().length > 0 ?

              getFilteredUsers().map(item => <FilteredUser setIsOn={setIsOn} key={item._id} user={item} />)

              :

              <NullUsers />
          }

        </div>
      </div>
    </div>
  )
}

export default UserStatusChanger