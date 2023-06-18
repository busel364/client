import React, { useEffect, useState } from 'react'

import styles from '../../modules/userAcc.module.css'
import { updatePassword } from '../../../../../reducers/AsyncActions/AccountActions';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { changeAccess } from '../../../../../reducers/UserReducer/ChangingPass';

interface Props {
    setChangePassword: (v: boolean) => void
    setIsSettingsOn: (v: boolean) => void
}

const Changer = ({ setChangePassword, setIsSettingsOn }: Props) => {

    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.user);
    const userCopy = JSON.stringify(user);

    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    return (
        <div className={`container col-12 py-5 my-5 text-center`}>
            <div className={`${styles.center} col-10 col-sm-6 col-md-4 py-3 my-5`}>
                <p className='pt-4 pb-3' style={{ fontSize: '1.8rem', fontWeight: '100', color: '#333' }}>שינוי סיסמא</p>
                <div className={styles.form}>
                    <div className={`${styles.txt_field} text-end`}>
                        <input type="password"
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                            required />
                        <label >סיסמא חדשה</label>
                        <span></span>
                    </div>
                    <div className={`${styles.txt_field} text-end`}>
                        <input type="password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            required />
                        <label >תחזור על הסיסמא החדשה</label>
                        <span></span>
                    </div>
                    <input type="submit" value="לשמור שינויים" onClick={() => {
                        if (password1 === password2) {
                            try {
                                dispatch(updatePassword(password1));
                                setIsSettingsOn(false);
                                dispatch(changeAccess(false));
                                setChangePassword(false);
                            } catch (error) {
                                console.log("Server error");
                                
                            }

                        }
                    }} />
                    <p className={`${styles.pass} mt-4`} onClick={() => setChangePassword(false)}>לחזור</p>
                </div>
            </div>
        </div>
    )
}

export default Changer