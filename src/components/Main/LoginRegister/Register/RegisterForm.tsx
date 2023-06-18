import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import styles from '../modules/loginRegister.module.css'
import { registerUser } from '../../../../reducers/AsyncActions/AccountActions';

const RegisterForm = () => {

    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [fullName, setName] = useState('');
    const [tel, setTel] = useState('');


    const user = useAppSelector(state => state.user);

    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    useEffect(() => {
        if (user._id) {
            navigate(user._id);
        }
    }, [user])


    return (
        <div className={`container col-12 py-5 my-5 text-center`}>
            <div className={`${styles.center} col-10 col-sm-6 col-md-4 py-3 my-5`}>
                <p className='pt-4 pb-3' style={{ fontSize: '1.8rem', fontWeight: '100', color: '#333' }}>צור חשבון</p>
                <div className={styles.form}>
                    <div className={`${styles.txt_field} text-end`}>
                        <input type="text"
                            value={fullName}
                            onChange={(e) => setName(e.target.value)}
                            required />
                        <label>שם פרטי</label>
                        <span></span>
                    </div>
                    <div className={`${styles.txt_field} text-end`}>
                        <input type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        <label >דואר אלקטרוני</label>
                        <span></span>
                    </div>
                    <div className={`${styles.txt_field} text-end`}>
                        <input type="text"
                            value={tel}
                            onChange={(e) => setTel(e.target.value)}
                            required />
                        <label>טלפון</label>
                        <span></span>
                    </div>
                    <div className={`${styles.txt_field} text-end`}>
                        <input type="password"
                            value={password1}
                            onChange={(e) => setPassword1(e.target.value)}
                            required />
                        <label>סיסמה</label>
                        <span></span>
                    </div>
                    <div className={`${styles.txt_field} text-end`}>
                        <input type="password"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                            required />
                        <label>חזור על הסיסמה</label>
                        <span></span>
                    </div>
                    <input type="submit" value="להירשם" onClick={() => {
                        if (password1 === password2) {
                            dispatch(registerUser({ email, fullName, tel, password: password1 }))
                        }
                    }} />
                    <div className={styles.signup_link}>כבר נרשמת? <a href="/registration">לחזור לכניסה</a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default RegisterForm