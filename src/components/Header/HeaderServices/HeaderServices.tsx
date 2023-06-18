import React, { useEffect, useState } from 'react'
import { Nav, NavDropdown } from 'react-bootstrap'
import { useAppSelector } from '../../../app/hooks'
import styles from '../modules/header.module.css'
import { services } from '../../../utils/utils'

const HeaderServices = () => {

    const mode = useAppSelector(state => state.mode);
    const [sc, setSC] = useState<any[]>([]);
    // const services = useAppSelector(state=> state.sevrices);
    // const services = ['service1', 'service2', 'service3', 'service4', 'service5']

    useEffect(() => {
        const copy = JSON.stringify(services);
        const servicesCopy = JSON.parse(copy);
        servicesCopy.push({ title: 'כל השרוטים', img: '', route: 'all_services' })
        setSC(servicesCopy);
    }, [])


    return (
        // <NavDropdown
        //     className={`${mode ? styles.lightsettings : styles.darksettings}`} style={{ fontSize: '1.5rem', fontWeight: '300' }}
        //     title='שירותים'
        //     id="collasible-nav-dropdown" autoClose="outside">
        //     {sc.map((item) => <NavDropdown.Item key={item.title} href={`/${item.title}`}>
        //         <p
        //             className='text-center'
        //             style={{ fontSize: '1.2rem' }}>
        //             {item.title}
        //         </p>
        //     </NavDropdown.Item>)}
        // </NavDropdown>
        <Nav.Link href="services text-center" className={`${mode ? styles.lightnavItem : styles.darknavItem} px-2`} style={{ fontSize: '1.5rem', fontWeight: '300' }}>
            שירותים
        </Nav.Link>
    )
}

export default HeaderServices