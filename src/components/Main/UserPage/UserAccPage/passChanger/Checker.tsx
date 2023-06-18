import React, { useEffect, useState } from 'react'

import styles from '../../modules/userAcc.module.css'
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks'
import { checkPassword } from '../../../../../reducers/AsyncActions/AccountActions'

interface Props {
    setChangePassword: (v: boolean) => void
}

const Checker = ({ setChangePassword }: Props) => {

    const dispatch = useAppDispatch();

    const access = useAppSelector(state => state.accessChangePass)

    const [password, setPassword] = useState('');

    useEffect(() => {
        if (!access) {
            setPassword('');
        }
    }, [access])


    return (
        <div className={`container col-12 py-5 my-5 text-center`}>
            <div className={`${styles.center} col-10 col-sm-6 col-md-4 py-3 my-5`}>
                <p className='pt-4 pb-3' style={{ fontSize: '1.8rem', fontWeight: '100', color: '#333' }}>שינוי סיסמא</p>
                <div className={styles.form}>
                    <div className={`${styles.txt_field} text-end`}>
                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <label >סיסמא ישנה</label>
                        <span></span>
                    </div>
                    <input type="submit" value="לשלב הבא" onClick={() => {
                        dispatch(checkPassword(password));
                    }} />
                    <p className={`${styles.pass} mt-4`} onClick={() => setChangePassword(false)}>לחזור</p>
                </div>
            </div>
        </div>

    )
}

export default Checker