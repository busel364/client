import React from 'react'
import RegisterForm from './RegisterForm'
import { useAppSelector } from '../../../../app/hooks'
import styles from '../modules/loginRegister.module.css'

const RegisterPage = () => {

    const mode = useAppSelector(state => state.mode);

    return (
        <div className={`container-fluid row py-5 px-0 mx-0 ${mode ? styles.loginBody__light : styles.loginBody__dark}`}
        style={{margin:'60px'}}
        >
            <div className='my-5'>
                <RegisterForm />
            </div>
        </div>
    )
}

export default RegisterPage