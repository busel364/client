import React from 'react'
import RegisterForm from './RegisterForm'
import { useAppSelector } from '../../../../app/hooks'
import styles from '../modules/loginRegister.module.css'

const RegisterPage = () => {

    const mode = useAppSelector(state => state.mode);

    return (
        <div className={`container-fluid row py-5 mb-5 px-0 mx-0 ${mode ? styles.loginBody__light : styles.loginBody__dark}`}
        // style={{backgroundColor:mode?'whitesmoke':'#333'}}
        >
            <RegisterForm />
        </div>
    )
}

export default RegisterPage