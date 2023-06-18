import React, { useEffect, useState } from 'react'
import { UserData } from '../../../../utils/types/UserTypes'
import { base_url } from '../../../../utils/utils'
import { Post } from '../../../../utils/types/PostTypes'
import styles from '../modules/services.module.css'
import { useNavigate } from 'react-router-dom'

interface Props {
    item: UserData,
    index: number,
    activeItem: number,
    setActiveItem: (e: number) => void
}

const ServicePageBestUsers = ({ item, activeItem, index, setActiveItem }: Props) => {

    const [posts, setPosts] = useState<Post[]>();
    const navigate = useNavigate();

    const getPostsById = (_id: string) => {
        fetch(`${base_url}/posts/${_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                } else {
                    throw new Error(response.status.toString())
                }
            })
            .then(posts => {
                setPosts(posts);
            })
    }

    useEffect(() => {
        getPostsById(item._id!);
    }, [])


    return (
        // <li aria-current={activeItem === index} className={` transition-[width] hover:w-[12%] w-[8%] overflow-hidden first:w[1%] last:w[1%] [&[aria-current='true']]:w-[48%] rounded-2xl bg-[#c9c6c7]`}>
        //     {/* ${styles.carousel__item } */}
        //     <img
        //         className='w-full h-full object-cover'
        //         src={!item.avatarUrl ? require('../../../../utils/imgs/istockphoto-1337144146-612x612.jpg') : `${base_url}${item.avatarUrl}`}
        //         alt={item.fullName!} />
        // </li>
        <div className='col pb-5'>
            <div style={{ margin: '0 auto', width: '185px', cursor:'pointer' }} className={`${styles.divBestUser}`} onClick={()=>navigate(`/${item._id}`)}>
                <div style={{ height: '200px', width: '185px', backgroundColor:'black' }} >
                    <img
                        className={`col`}
                        style={{ height: '200px', width: '185px' }}
                        src={!item.avatarUrl ? require('../../../../utils/imgs/istockphoto-1337144146-612x612.jpg') : `${base_url}${item.avatarUrl}`}
                        alt={item.fullName!}
                    />
                </div>
                <div className='text-center' style={{ width: '185px' }}>
                    <div className='m-0 p-0' style={{ backgroundColor: 'whitesmoke', color: '#333', fontSize: '1.4rem', fontWeight: '100' }}>
                        <p className='m-0 p-0'>חוות דעת</p>
                        <p className='m-0 p-0' style={{ fontSize: '1.2rem' }}>{posts?.length}</p>
                    </div>
                    <div className='m-0 p-0' style={{ backgroundColor: 'rgb(177, 177, 177)', color: '#333', fontSize: '1.3rem', fontWeight: '100', borderBottomLeftRadius:'15px',borderBottomRightRadius:'15px' }}>
                        <p className='m-0 p-0'>ציון כללי</p>
                        <p className='m-0 p-0' style={{ fontSize: '1.2rem' }}>{item.grades ? item.grades?.length > 0 ? item.grades?.reduce((acc, item) => acc + item, 0) / item.grades?.length : 0 : 0}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ServicePageBestUsers