import React, { useState } from 'react'
import { useAppSelector } from '../../../../../app/hooks';
import {
    UpOutlined,
    DownOutlined
} from '@ant-design/icons';

import styles from '../../modules/userPosts.module.css'

interface Props {
    item: {
        title: string;
        imgs: string[];
        text: string;
        tags: string;
    }
}

const UserPost = ({ item }: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    const mode = useAppSelector(state => state.mode);

    return (!isOpen ?
        <div className={`container my-3 py-3 col-5 ${styles.formPostBlock}`} onClick={() => setIsOpen(true)}>
            <div className='row'>
                <img
                    className={`col-10 offset-1 ${styles.imgUserPostBlock}`}
                    src={item.imgs[0]}
                    title={item.title}
                    alt={item.title} />
                <h3 className='col-9 offset-1 mt-3 text-center'>
                    {item.title}
                </h3>
                <DownOutlined className='col mt-3' style={{ fontSize: '2rem', cursor: 'pointer'  }} />
            </div>
        </div>
        :
        <div className={`container my-3 py-3 col-10 ${styles.formPostBlock}`} >
            <div className='row'>
                <h3 className='col-8 text-center offset-2'>
                    {item.title}
                </h3>

                <UpOutlined className='col' style={{ fontSize: '2rem', cursor: 'pointer' }} onClick={()=>setIsOpen(false)}/>
            </div>
        </div>
    )
}

export default UserPost