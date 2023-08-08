import React, { useEffect, useState } from 'react'
import styles from '../../modules/userAcc.module.css'
import { useAppSelector } from '../../../../../app/hooks';
import { SettingOutlined } from '@ant-design/icons';
import UserProfileCurPage from '../UserProfileCurPage';
import { base_url } from '../../../../../utils/utils';

interface Props {
    setIsSettingsOn: (v: boolean) => void
}

const Main = ({ setIsSettingsOn }: Props) => {

    const { user, posts } = useAppSelector(state => state);

    const [currentPage, setCurrentPage] = useState('חוות דעת');
    const t = ['חוות דעת', 'מחירים', "אודות", "גרפים", "שאלות"];

    const [rotate, setRotate] = useState(false);
    const [grade, setGrade] = useState(0);

    useEffect(() => {
        if (posts.length > 0) {
            // const dec = 4 * posts.length;
            // const value = posts.reduce(
            //     (acc, post) => acc +
            //         (post.grades.price + post.grades.quality +
            //             post.grades.ratio + post.grades.times), 0) / dec;
            const value = user.grades!.reduce((acc, value) => acc + value, 0) / user.grades!.length;
            setGrade(Number.parseFloat(value.toFixed(2)));
        } else {
            setGrade(0);
        }
        setTimeout(() => window.scrollTo(0, 0), 0);
    }, [posts, user])


    return (
        <div
        // style={{ paddingBottom: '300px' }}
        >
            <div className=' py-5 text-center'>
                <h1 style={{ color: 'whitesmoke' }} className='py-5'>{user.fullName}</h1>
                <div className='container-fluid row p-0 m-0'>
                    <div className='col-0 col-md-1 col-lg-3'></div>
                    <div className='col-12 col-md-11 col-lg-9 row p-0 m-0 '>
                        <div className={`col-sm-7 col-md-6 col-lg-7 row  mx-2 ${styles.firstSetting}`} style={{ color: 'whitesmoke' }}>
                            <div className='row row-cols-3'
                                style={{ margin: '0 auto' }}>
                                <p className='col' style={{ fontSize: '1.5rem', fontWeight: '100' }}>:חוות דעת<br></br>{posts.length}</p>
                                <p className='col ' style={{ fontSize: '2.5rem', fontWeight: '100' }}>|</p>
                                <p className='col' style={{ fontSize: '1.5rem', fontWeight: '100' }}>:ציון כללי<br></br>{grade}</p>
                            </div>
                            <div className='text-center row'
                                style={{ margin: '0 auto', width: '250px', height: '75px' }}>
                                <button
                                    className={`${styles.settingButton} pb-3 pt-2`}
                                    onMouseEnter={() => { setRotate(true) }}
                                    onMouseLeave={() => { setRotate(false) }}
                                    onClick={() => setIsSettingsOn(true)}>
                                    <SettingOutlined
                                        style={{ fontSize: '2rem', marginRight: '10px' }}
                                        spin={rotate}
                                    />הגדרות
                                </button>
                            </div>
                        </div>
                        <div className={`col-4 col-md-4 col-lg-4 p-0 ${styles.accImg}`}
                            style={{ width: '250px', margin: '0 auto' }}>
                            <img className='col p-0'
                                style={{ height: '300px', width: '250px', margin: '0 auto' }}
                                src={!user.avatarUrl ? require('../../../../../utils/imgs/istockphoto-1337144146-612x612.jpg') : `${base_url}${user.avatarUrl}`}
                                alt={user.fullName!} />
                        </div>
                    </div>
                    <div className={`col-12 col-md-6 row pt-5 m-0 ${styles.secondSetting}`} style={{ color: 'whitesmoke' }}>
                        <div className='row row-cols-3'
                            style={{ margin: '0 auto' }}>
                            <p className='col' style={{ fontSize: '1.5rem', fontWeight: '100' }}>:חוות דעת<br></br>4555</p>
                            <p className='col ' style={{ fontSize: '2.5rem', fontWeight: '100' }}>|</p>
                            <p className='col' style={{ fontSize: '1.5rem', fontWeight: '100' }}>:ציון כללי<br></br>9.86</p>
                        </div>
                        <div className='text-center row'
                            style={{ margin: '0 auto' }}>
                            <button
                                className={`${styles.settingButton} pb-3 pt-2`}
                                onMouseEnter={() => { setRotate(true) }}
                                onMouseLeave={() => { setRotate(false) }}
                                onClick={() => setIsSettingsOn(true)}>
                                <SettingOutlined
                                    style={{ fontSize: '2rem', marginRight: '10px' }}
                                    spin={rotate}
                                />הגדרות
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`container-fluid p-0 `}>
                <div className='row m-0' style={{ borderTop: '2px solid white', borderBottom: '2px solid white' }}>
                    <div className='col-0 col-sm-3 col-md-2 col-lg-4 col-xl-6'></div>
                    <div className={`col-sm-12 col-md-10 col-lg-8 col-xl-6 m-0 p-0 ${styles.blockChanger1}`}>
                        <div className={`${styles.blockChanger2} row pe-3`}>
                            {t.map(item =>
                                <div key={item} className={`col ${item === 'חוות דעת' ? 'text-center ps-4' : 'text-center'} ${styles.blockChangerItem}`} style={{ color: 'whitesmoke' }}
                                    onClick={() => setCurrentPage(item)}>
                                    <p className={`pt-2 pb-3 m-0 ${styles.pagesItem}`} style={{ fontSize: '1.5rem', fontWeight: '100' }}>{item}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <UserProfileCurPage user={user} curPage={currentPage} />
            </div>
        </div>

    )
}

export default Main