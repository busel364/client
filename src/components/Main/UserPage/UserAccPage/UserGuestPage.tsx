import React, { useEffect, useState } from 'react'
import { UserData } from '../../../../utils/types/UserTypes';
import styles from '../modules/userAcc.module.css'
import UserProfileCurPage from './UserProfileCurPage';
import { base_url } from '../../../../utils/utils';
import { useAppSelector } from '../../../../app/hooks';
import { Post } from '../../../../utils/types/PostTypes';

interface Props {
    item: UserData
}

const UserGuestPage = ({ item }: Props) => {

    const posts: Post[] = useAppSelector(state => state.posts);

    const [currentPage, setCurrentPage] = useState('חוות דעת');
    const t = ["שאלות", "גרפים", "אודות", 'מחירים', 'חוות דעת'];

    const [grade, setGrade] = useState(0);

    useEffect(() => {
        if (posts.length > 0) {
            // const dec = 4 * posts.length;
            // const value = posts.reduce(
            //     (acc, post) => acc +
            //         (post.grades.price + post.grades.quality +
            //             post.grades.ratio + post.grades.times), 0) / dec;
            const value = item.grades!.reduce((acc,value)=>acc+value,0)/item.grades!.length;
            setGrade(Number.parseFloat(value.toFixed(2)));
        } else {
            setGrade(0);
        }
    }, [posts, item])



    return (
        <div
        // style={{ paddingBottom: '300px' }}
        >
            <div className=' py-5 text-center'>
                <h1 style={{ color: 'whitesmoke' }} className='py-5'>{item.fullName}</h1>
                <div className='container-fluid row p-0 m-0 '>
                    <div className='col-0 col-md-1 col-lg-3'></div>
                    <div className='col-12 col-md-11 col-lg-9 row p-0 m-0 mb-4'>
                        <div className={`col-sm-7 col-md-6 col-lg-7 row  mx-2 ${styles.firstSetting}`} style={{ color: 'whitesmoke' }}>
                            <div className='row row-cols-3'
                                style={{ margin: '0 auto' }}>
                                <p className='col' style={{ fontSize: '1.5rem', fontWeight: '100' }}>:חוות דעת<br></br>{posts.length}</p>
                                <p className='col ' style={{ fontSize: '2.5rem', fontWeight: '100' }}>|</p>
                                <p className='col' style={{ fontSize: '1.5rem', fontWeight: '100' }}>:ציון כללי<br></br>{grade}</p>
                            </div>
                        </div>
                        <div className={`col-4 col-md-4 col-lg-4 p-0 ${styles.accImg}`}
                            style={{ width: '250px', margin: '0 auto' }}>
                            <img className='col p-0'
                                style={{ height: '300px', width: '250px', margin: '0 auto' }}
                                src={!item.avatarUrl ? require('../../../../utils/imgs/istockphoto-1337144146-612x612.jpg') : `${base_url}${item.avatarUrl}`}
                                alt={item.fullName!} />
                        </div>
                        <div className={`col-12 col-md-6 row pt-5 m-0 ${styles.secondSetting}`} style={{ color: 'whitesmoke' }}>
                            <div className='row row-cols-3'
                                style={{ margin: '0 auto' }}>
                                <p className='col' style={{ fontSize: '1.5rem', fontWeight: '100' }}>:חוות דעת<br></br>4555</p>
                                <p className='col ' style={{ fontSize: '2.5rem', fontWeight: '100' }}>|</p>
                                <p className='col' style={{ fontSize: '1.5rem', fontWeight: '100' }}>:ציון כללי<br></br>9.86</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`container-fluid p-0 `}>
                    <div className='row m-0' style={{ borderTop: '2px solid white', borderBottom: '2px solid white' }}>
                        <div className='col-0 col-lg-6'></div>
                        <div className={`col-12 col-lg-6 m-0 p-0 ${styles.blockChanger1}`}>
                            <div className={`${styles.blockChanger2} row`}>
                                {t.map(item =>
                                    <div key={item} className={`col ${item === 'חוות דעת' ? 'text-center ps-4' : 'text-center'} ${styles.blockChangerItem}`} style={{ color: 'whitesmoke' }}
                                        onClick={() => setCurrentPage(item)}>
                                        <p className={`pt-2 pb-3 m-0 ${styles.pagesItem}`} style={{ fontSize: '1.5rem', fontWeight: '100' }}>{item}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <UserProfileCurPage user={item} curPage={currentPage} />
                </div>
            </div>
        </div>
    )
}

export default UserGuestPage