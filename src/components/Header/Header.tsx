import React, { useEffect, useState } from 'react'
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Switch } from 'antd'
import { DownOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, message, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import styles from './modules/header.module.css'
import HeaderChangingNav from './HeaderChangingNav/HeaderChangingNav';
import { changeLanguage } from '../../reducers/LanguageReducer/LanguageReducer';
import { changeMode } from '../../reducers/ModeReducer/ModeReducer';
import HeaderSearch from './HeaderSearch/HeaderSearch';
import HeaderServices from './HeaderServices/HeaderServices';
// import { changeMode } from '../../reducers/ModeReducer';
// import { changeLanguage } from '../../reducers/LanguageReducer';


const items: MenuProps['items'] = [
    {
        label: 'English',
        key: 'English selected',
    },
    {
        label: 'עברית',
        key: 'עברית נבחרה',
    },
    {
        label: 'Русский',
        key: 'Выбран Русский',
    },
];


const Header = () => {

    const dispatch = useAppDispatch();
    const language = useAppSelector(state => state.language);
    const mode = useAppSelector(state => state.mode)
    // const mode = useAppSelector(state => state.mode);

    const [isOn, setIsOn] = useState(false);
    const [visible, setVisible] = useState(true);
    const [prevScrollPos, setPrevScrollPos] = useState(0);

    const onClick: MenuProps['onClick'] = ({ key }) => {
        // message.info(`${key}`);
        if (key === 'English selected') {
            dispatch(changeLanguage('en'));
        }
        if (key === 'עברית נבחרה') {
            dispatch(changeLanguage('he'));
        }
        if (key === 'Выбран Русский') {
            dispatch(changeLanguage('ru'));
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', () => {
            const currentScrollPos = window.scrollY;
            if (currentScrollPos > 200) {
                setVisible(() => prevScrollPos > currentScrollPos);
                setPrevScrollPos(currentScrollPos);
            }
        });
    }, [prevScrollPos])

    return (
        <div>
            <div className={isOn ? styles.headerBlock : styles.headerBlockNone} onClick={() => setIsOn(false)}></div>
            <div className={`text-center ${!isOn ? visible ? styles.header : `${styles.header} ${styles.headerHidden}` : styles.header}`} >
                <Navbar collapseOnSelect expand="lg" bg={mode ? 'light' : 'dark'} variant={mode ? 'light' : 'dark'} expanded={isOn} className='py-2 '>
                    <Container>
                        <Navbar.Brand href="#home" className='p-0 m-0 container' style={{ width: '160px' }}>
                            <div className='container-fluid row ms-0 ps-0' style={{ width: '340px' }}>

                            </div>
                        </Navbar.Brand>
                        <div onClick={() => setIsOn(prev => !prev)}>
                            <Navbar.Toggle style={{ height: '50px' }} aria-controls="responsive-navbar-nav" value={'false'} />
                        </div>
                        <Navbar.Collapse id="responsive-navbar-nav" style={{ height: '50px' }}>
                            <Nav className="ms-auto">
                                <HeaderSearch />
                                <HeaderServices />
                                <Nav.Link href="#contact" className={`${mode ? styles.lightnavItem : styles.darknavItem}`} style={{ fontSize: '1.5rem', fontWeight: '300' }}>{language === 'he' ? 'צור קשר' : language === 'ru' ? 'Контактная информация' : 'Contact us'}</Nav.Link>
                                <HeaderChangingNav />
                                <Nav.Item className='p-0 m-0' style={{ margin: '0 auto' }}>
                                    <Switch
                                        checkedChildren="בהיר" unCheckedChildren="כהה"
                                        checked={mode}
                                        className='mx-3 mt-3'
                                        onClick={() => dispatch(changeMode())}
                                    />
                                </Nav.Item>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </div>
    )
}

export default Header


{/* <NavDropdown
                                    className={`${mode ? styles.lightsettings : styles.darksettings}`} style={{ fontSize: '1.5rem', fontWeight: '300' }}
                                    title={language === 'he' ? 'הגדרות' : language === 'ru' ? 'Настройки' : 'Settings'}
                                    id="collasible-nav-dropdown" autoClose="outside">
                                    <NavDropdown.Item>
                                        <Dropdown menu={{ items, onClick }} trigger={['click']} >
                                             <Space >
                                            <p style={{ fontSize: '1.2rem' }}>
                                                {language === 'he' ? 'שפה' : language === 'ru' ? 'Язык' : 'Language'}
                                                <DownOutlined className='ms-2' />
                                            </p>
                                             </Space> 
                                        </Dropdown>
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item>
                                        <p style={{ fontSize: '1.2rem' }}>
                                            {language === 'he' ? 'גרסה' : language === 'ru' ? 'Версия' : 'Mode'}
                                            <Switch
                                                checkedChildren="Light" unCheckedChildren="Dark"
                                                checked={mode}
                                                className='mx-3'
                                                onClick={() => dispatch(changeMode())}
                                            />
                                        </p>
                                    </NavDropdown.Item>
                                </NavDropdown> */}
