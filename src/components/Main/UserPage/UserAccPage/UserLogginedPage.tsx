import React, { useEffect, useState } from 'react'
import styles from '../modules/userAcc.module.css'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { changeAccess } from '../../../../reducers/UserReducer/ChangingPass';
import Checker from './passChanger/Checker';
import Changer from './passChanger/Changer';
import Settings from './Settings/Settings';
import Main from './MainUserPage/Main';

const UserLogginedPage = () => {

    const dispatch = useAppDispatch();

    const access = useAppSelector(state => state.accessChangePass);

    const [isSettingsOn, setIsSettingsOn] = useState(false);
    const [changePassword, setChangePassword] = useState(false);

    
    useEffect(() => {
        dispatch(changeAccess(false));
    }, [dispatch, changePassword])


    return (!isSettingsOn ?

        <Main setIsSettingsOn={setIsSettingsOn}/>
        
        :

        <div className='container-fluid row p-0 m-0' >
            <div className='col '
                style={{ color: 'whitesmoke' }}>
                <div className='my-5' >
                    <div style={{ width: '100%', height: '30vh' }}></div>

                    {!changePassword ?

                        <Settings setChangePassword={setChangePassword} setIsSettingsOn={setIsSettingsOn}/>

                        :

                        !access ?

                            <Checker setChangePassword={setChangePassword} />

                            :

                            <Changer setChangePassword={setChangePassword} setIsSettingsOn={setIsSettingsOn}/>
                    }

                </div>
            </div>
        </div>
    )
}

export default UserLogginedPage

