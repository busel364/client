import React from 'react'
import { useAppSelector } from '../../../app/hooks'
import { NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from '../modules/header.module.css'

const ModeratorOrAdminPanel = () => {

    const { user } = useAppSelector(state => state);

    return (user.roles?.toString().toLowerCase().includes('admin') ?
        <NavDropdown.Item className='text-center' >
            <Link
                to={'/admin'}
                className={` ${styles.lightnavItem}`}
                style={{ fontSize: '1.2rem', color: 'black', textDecoration: 'none', fontWeight: '400' }}>
                פאנל הניהול
            </Link>
        </NavDropdown.Item>

        :

        user.roles?.toString().toLowerCase().includes('moderator') ?

            <NavDropdown.Item className='text-center' >
                <Link
                    to={'/moderator'}
                    className={` ${styles.lightnavItem}`}
                    style={{ fontSize: '1.2rem', color: 'black', textDecoration: 'none', fontWeight: '400' }}>
                    פאנל מנחה
                </Link>
            </NavDropdown.Item>

            :

            null
    )
}

export default ModeratorOrAdminPanel