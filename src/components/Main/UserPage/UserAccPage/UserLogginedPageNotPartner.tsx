import React, { useEffect, useState } from 'react'
import { changeAccess } from '../../../../reducers/UserReducer/ChangingPass';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import Checker from './passChanger/Checker';
import Changer from './passChanger/Changer';
import SettingToNotPartner from './Settings/SettingToNotPartner';

const UserLogginedPageNotPartner = () => {
    const dispatch = useAppDispatch();

    const access = useAppSelector(state => state.accessChangePass);

    const [isSettingsOn, setIsSettingsOn] = useState(false);
    const [changePassword, setChangePassword] = useState(false);


    useEffect(() => {
        dispatch(changeAccess(false));
        setTimeout(() => window.scrollTo(0, 0), 0);
    }, [dispatch, changePassword])

    return (
        <div className='container-fluid row p-0 m-0' >
            <div className='col '
                style={{ color: 'whitesmoke' }}>
                <div className='my-5' >
                    <div style={{ width: '100%', height: '30vh' }}></div>

                    {!changePassword ?

                        <SettingToNotPartner setChangePassword={setChangePassword} setIsSettingsOn={setIsSettingsOn} />

                        :

                        !access ?

                            <Checker setChangePassword={setChangePassword} />

                            :

                            <Changer setChangePassword={setChangePassword} setIsSettingsOn={setIsSettingsOn} />
                    }

                </div>
            </div>
        </div>
    )
}

export default UserLogginedPageNotPartner