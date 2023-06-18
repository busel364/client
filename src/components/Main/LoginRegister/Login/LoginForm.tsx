import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import styles from '../modules/loginRegister.module.css'
import { fetchUser } from '../../../../reducers/AsyncActions/AccountActions';

const LoginForm = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [reset, setReset] = useState(false);

    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const { mode, language, user } = useAppSelector(state => state);

    useEffect(() => {
      if(user._id){
        navigate(`/${user._id}`);
      }
    }, [user])
    
    return (!reset ?
        <div className={`container col-12 py-5 my-5 text-center`} >
            <div className={`${styles.center} col-10 col-sm-6 col-md-4 py-3 my-5`}>
                <p className='pt-4 pb-3' style={{ fontSize: '1.8rem', fontWeight: '100', color: '#333' }}>להתחבר</p>
                <div className={styles.form}>
                    <div className={`${styles.txt_field} text-end`}>
                        <input type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        <label >שם משתמש</label>
                        <span></span>
                    </div>
                    <div className={`${styles.txt_field} text-end`}>
                        <input type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required />
                        <label>סיסמה</label>
                        <span></span>
                    </div>
                    <div className={styles.pass} onClick={() => setReset(true)}>?שכחת ססמה</div>
                    <input type="submit" value="להכנס" onClick={() => dispatch(fetchUser({email,password}))}/>
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
                    <div className={`${styles.txt_field} text-end`}>
                        <input type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required />
                        <label >שם משתמש</label>
                        <span></span>
                    </div>
                    <input type="submit" value="לשחזר" />
                    <p className={`${styles.pass} mt-4`} onClick={() => setReset(false)}>לחזור לכניסה</p>
                </div>
            </div>
        </div>
    )
}

export default LoginForm