import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import styles from '../modules/loginRegister.module.css'
import { fetchUser, returnPassword } from '../../../../reducers/AsyncActions/AccountActions';
import { removeError } from '../../../../reducers/ErrorsReducer/ErrorsReducer';
import { errors } from '../../../../utils/utils';
import {CheckOutlined} from '@ant-design/icons';
import { setIsSuccess } from '../../../../reducers/ReturnPasswordReducer/ReturnPasswordReducer';



const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reset, setReset] = useState(false);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    //passReturn - returnPasswordReducer
    //returnPass - errorsReducer

    const { user, passReturn } = useAppSelector(state => state);
    const { login, returnPass } = useAppSelector(state => state.errors);

    const handleFetchUser = () => {
        if (!login) {
            dispatch(fetchUser({ email, password }))
        }
    }

    const handleReturnPass = () => {
        if (!returnPass) {
            dispatch(returnPassword(email))
        }
    }

    useEffect(() => {
        if (user._id) {
            navigate(`/${user._id}`);
        }
    }, [user])

    useEffect(() => {
    }, [login, passReturn, returnPass])

    return (!reset ?
        <div className={`container col-12 py-5 my-5 text-center`} >
            <div className={`${styles.center} col-10 col-sm-6 col-md-4 py-3 my-5`}>
                <p className='pt-4 pb-3' style={{ fontSize: '1.8rem', fontWeight: '100', color: '#333' }}>להתחבר</p>
                <div className={styles.form} style={{ direction: 'rtl' }}>
                    <div className={`${styles.txt_field} text-end`}>
                        <input type="text"
                            className='text-end'
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                                if (login) {
                                    dispatch(removeError(errors.login));
                                }
                            }}
                            required />
                        <label>שם משתמש</label>
                        <span></span>
                    </div>
                    <div className={`${styles.txt_field} text-end`}>
                        <input type="password"
                            className='text-end'
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                                if (login) {
                                    dispatch(removeError(errors.login));
                                }
                            }}
                            required />
                        <label>סיסמה</label>
                        <span></span>
                    </div>
                    <p className='text-end' style={{ color: 'red', fontSize: '1.3rem', fontWeight: '100' }}>{login ? 'שם משתמש או סיסמה לא נכונים' : ''}</p>
                    <div className={styles.pass} onClick={() => setReset(true)}>שכחת סיסמה?</div>
                    <input type="submit" value="להיכנס" onClick={handleFetchUser} />
                    <div className={styles.signup_link}>עדיין לא נרשמת? <a href="/registration">צור חשבון</a>
                    </div>
                </div>
            </div>
        </div>

        :

        <div className={`container col-12 py-5 my-5 text-center`}>
            <div className={`${styles.center} col-10 col-sm-6 col-md-4 py-3 my-5`}>
                <p className='pt-4 pb-3' style={{ fontSize: '1.8rem', fontWeight: '100', color: '#333' }}>שחזור סיסמא</p>
                <div className={styles.form}>
                    {!passReturn ?
                        <div>
                            <div className={`${styles.txt_field} text-end`}>
                                <input type="text"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value)
                                        if (returnPass) {
                                            dispatch(removeError(errors.returnPass));
                                        }
                                    }}
                                    required />
                                <label >שם משתמש</label>
                                <span></span>
                            </div>
                            <p className='text-end' style={{ color: 'red', fontSize: '1.3rem', fontWeight: '100' }}>{login ? 'משתמש לא קיים' : ''}</p>

                            <input type="submit" value="להמשיך" onClick={handleReturnPass} />
                            <p className={`${styles.pass} mt-4`} onClick={() => {
                                setReset(false)
                            }}>לחזור לכניסה</p>
                        </div>

                        :

                        <div>
                            <CheckOutlined style={{color:'black', fontSize:'10rem'}}/>
                            <p style={{fontSize:'1.6rem', fontWeight:'100'}}>דוא"ל שחזור נשלח לאימייל שלך</p>
                            <p className={`${styles.pass} mt-4`} onClick={() => {
                                setReset(false)
                                dispatch(setIsSuccess(false))
                            }}>לחזור לכניסה</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default LoginForm