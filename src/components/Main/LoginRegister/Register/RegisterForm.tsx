import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import styles from '../modules/loginRegister.module.css'
import { registerUser } from '../../../../reducers/AsyncActions/AccountActions';
import { removeError, setError } from '../../../../reducers/ErrorsReducer/ErrorsReducer';
import { errors } from '../../../../utils/utils';

const RegisterForm = () => {

    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [fullName, setName] = useState('');
    const [tel, setTel] = useState('');


    const user = useAppSelector(state => state.user);
    const { register } = useAppSelector(state => state.errors);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const handleRegisterUser = () => {
        if (!register && password1 === password2) {
            dispatch(registerUser({ email, fullName, tel, password: password1 }))
            console.log({ email, fullName, tel, password: password1 });
            
        } else {
            dispatch(setError(errors.register))
        }
    }

    useEffect(() => {
        if (user._id) {
            navigate(user._id);
        }
    }, [user])

    useEffect(() => {
    }, [register])


    return (
        <div style={{margin: '40px 0', height:'100vh'}}>
            <div className={`container col-12 py-5 my-5 text-center`}>
                <div className={`${styles.center} col-10 col-sm-6 col-md-4 py-3 my-5`}>
                    <p className='pt-4 pb-3' style={{ fontSize: '1.8rem', fontWeight: '100', color: '#333' }}>צור חשבון</p>
                    <div className={styles.form}>
                        <div className={`${styles.txt_field} text-end`}>
                            <input type="text"
                                className='text-end'
                                value={fullName}
                                onChange={(e) => {
                                    setName(e.target.value)
                                    if (register) {
                                        dispatch(removeError(errors.register))
                                    }
                                }}
                                required />
                            <label>שם פרטי</label>
                            <span></span>
                        </div>
                        <div className={`${styles.txt_field} text-end`}>
                            <input type="text"
                                className='text-end'
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    if (register) {
                                        dispatch(removeError(errors.register))
                                    }
                                }}
                                required />
                            <label >דואר אלקטרוני</label>
                            <span></span>
                        </div>
                        <div className={`${styles.txt_field} text-end`}>
                            <input type="text"
                                className='text-end'
                                value={tel}
                                onChange={(e) => {
                                    setTel(e.target.value)
                                    if (register) {
                                        dispatch(removeError(errors.register))
                                    }
                                }}
                                required />
                            <label>טלפון</label>
                            <span></span>
                        </div>
                        <div className={`${styles.txt_field} text-end`}>
                            <input type="password"
                                className='text-end'
                                value={password1}
                                onChange={(e) => {
                                    setPassword1(e.target.value)
                                    if (register) {
                                        dispatch(removeError(errors.register))
                                    }
                                }}
                                required />
                            <label>סיסמה</label>
                            <span></span>
                        </div>
                        <div className={`${styles.txt_field} text-end`}>
                            <input type="password"
                                className='text-end'
                                value={password2}
                                onChange={(e) => {
                                    setPassword2(e.target.value)
                                    if (register) {
                                        dispatch(removeError(errors.register))
                                    }
                                }}
                                required />
                            <label>חזור על הסיסמה</label>
                            <span></span>
                        </div>
                        <p className='text-end' style={{ color: 'red', fontSize: '1.3rem', fontWeight: '100' }}>{register ? 'חלק מהנתונים לא נכונים' : ''}</p>
                        <input type="submit" value="להירשם" onClick={handleRegisterUser} />
                        <div className={styles.signup_link}>כבר נרשמת? <a href="/login">לחזור לכניסה</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterForm