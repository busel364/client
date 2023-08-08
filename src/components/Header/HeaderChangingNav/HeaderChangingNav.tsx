import React, { useEffect, useState } from 'react'
import { Dropdown, Nav, NavDropdown } from 'react-bootstrap'
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import styles from '../modules/header.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { logOut } from '../../../reducers/UserReducer/UserReducer';
import ModeratorOrAdminPanel from './ModeratorOrAdminPanel';


const HeaderChangingNav = () => {

    const dispatch = useAppDispatch();
    const { language, mode, user } = useAppSelector(state => state);
    const [isOn, setIsOn] = useState(false);
    const navigate = useNavigate();
    const [acc, setAcc] = useState<string | null>();

    useEffect(() => {
    }, [user])

    useEffect(() => {
        if (isOn) {
            navigate('');
            setIsOn(false);
        }
    }, [isOn])

    return (user._id ?
        <NavDropdown
            className={`${mode ? styles.lightsettings : styles.darksettings}`} style={{ fontSize: '1.5rem', fontWeight: '300' }}
            title={user.fullName!.length > 5 ? `${user.fullName!.slice(0, 6)}...` : user.fullName}
            id="collasible-nav-dropdown" autoClose="outside">
            <NavDropdown.Item className='text-center' >
                <Link
                    to={user._id!}
                    className={` ${styles.lightnavItem}`}
                    style={{ fontSize: '1.2rem', color: 'black', textDecoration: 'none', fontWeight: '400' }}>
                    {user.fullName}
                </Link>
            </NavDropdown.Item>
            <ModeratorOrAdminPanel />
            {/* <NavDropdown.Divider /> */}
            {/* <NavDropdown.Item>
                    <Link to="userposts"
                        className={`text-center ${styles.link}`}
                        style={{ fontSize: '1.2rem',color:'black'  }}>
                        {language === 'he' ? 'הפוסטים שלי' : language === 'ru' ? 'Мои публикации' : 'My posts'}

                    </Link>
                </NavDropdown.Item> */}
            {/* <NavDropdown.Divider /> */}
            <NavDropdown.Item>
                <Nav.Link
                    onClick={() => {
                        dispatch(logOut())
                        setIsOn(true)
                    }}
                    className={`text-center ${styles.lightnavItem} p-0`}
                    style={{ fontSize: '1.2rem', color: 'black' }}
                    href='/'>
                    {language === 'he' ? 'להתנתק' : language === 'ru' ? 'Выйти' : 'Log out'}

                </Nav.Link>
            </NavDropdown.Item>
        </NavDropdown>
        : <Nav.Link href="login" className={`${mode ? styles.lightnavItem : styles.darknavItem}`} style={{ fontSize: '1.5rem', fontWeight: '300' }}>
            {language === 'he' ? 'להתחבר' : language === 'ru' ? 'Войти' : 'Sign in'}
        </Nav.Link>

    )
}

export default HeaderChangingNav