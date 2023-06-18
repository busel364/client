import React from 'react'
import { useAppSelector } from '../../../../app/hooks'
import LoginForm from './LoginForm'
import styles from '../modules/loginRegister.module.css'

const LoginPage = () => {

    const mode = useAppSelector(state => state.mode)

    return (
        <div className={`container-fluid row py-5 px-0 mx-0 ${mode ? styles.loginBody__light : styles.loginBody__dark}`}
            // style={{ backgroundColor: mode ? 'whitesmoke' : '#333' }}
            >
            <LoginForm />
        </div>
    )
}

export default LoginPage