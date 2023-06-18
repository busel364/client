import React, { useEffect, useState } from 'react'
import { UserData } from '../../../../utils/types/UserTypes'
import { base_url } from '../../../../utils/utils'
import styles from '../modules/services.module.css'
import Paragraph from 'antd/es/typography/Paragraph'
import { AppDispatch } from '../../../../app/store'
import { Post } from '../../../../utils/types/PostTypes'
import { useNavigate } from 'react-router-dom'


interface Props {
  user: UserData
}

const ServicePageUser = ({ user }: Props) => {

  const navigate = useNavigate();

  const [grades, setGrades] = useState<{
    ratio: number | null,
    quality: number | null,
    times: number | null,
    price: number | null
  }>();
  const [ellipsis, setElepsis] = useState(true);
  const [posts, setPosts] = useState<Post[]>();

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
    console.log(ellipsis);

    if (!user.description?.main) {
      setElepsis(false);
      if (user.description?.experience || user.description?.specialization!.length! > 0) {
        setElepsis(true);
      }
    }
  }, [])

  useEffect(() => {
    getPostsById(user._id!);
    if (posts?.length! > 0) {
      setGrades({
        price: posts!.reduce((accum, item) => accum + item.grades.price, 0) / posts?.length!,
        quality: posts!.reduce((accum, item) => accum + item.grades.quality, 0) / posts?.length!,
        ratio: posts!.reduce((accum, item) => accum + item.grades.ratio, 0) / posts?.length!,
        times: posts!.reduce((accum, item) => accum + item.grades.times, 0) / posts?.length!
      })
    }
  }, [posts?.length, user._id, posts])

  return (
    <div className={`pt-4 ${styles.divUser}`} style={{ alignItems: 'end', color: 'whitesmoke', whiteSpace: 'nowrap' }}>
      <div className={` p-0 ${styles.accImg}`}
        style={{ width: '125px' }}
        onClick={() => navigate(`/${user._id}`)}
      >
        <div>
          <h3 className='text-center' style={{ fontWeight: '100', color: 'whitesmoke' }}>{user.fullName}</h3>
        </div>
        <div style={{ backgroundColor: 'black', height: '150px', width: '125px' }}>
          <img className={`col p-0 ${styles.img}`}
            style={{ height: '150px', width: '125px', margin: '0 auto' }}
            src={!user.avatarUrl ? require('../../../../utils/imgs/istockphoto-1337144146-612x612.jpg') : `${base_url}${user.avatarUrl}`}
            alt={user.fullName!} />
        </div>
      </div>
      <div>
        <Paragraph className='pt-4 text-end' style={{ color: 'whitesmoke', fontSize: '1.2rem' }} ellipsis={{ rows: 2, expandable: true, symbol: 'עוד' }} onClick={()=>setElepsis(false)}>
          {user.description?.main}<br />
          {user.description?.experience ? <span className='row'><b style={{ fontWeight: '400' }}>:ותק בתחום </b><p className='col' style={{ fontWeight: '100' }}>{user.description?.experience} </p></span> : null}
          {user.description?.specialization?.length! > 0 ?
            <div>
              <p>:תחום התמחות</p>
              {user.description?.specialization?.map(item => <p key={item}>{item} •</p>)}
            </div>
            :
            null}
          {grades ?
            <div className='row'>
              <div className='col-sm-0 col-lg-6'></div>
              <div className='row col-sm-12 col-lg-6 text-end'>
                {grades.ratio ?
                  <p className='col'>
                    <span style={{ borderRadius: '50%', border: '1px solid whitesmoke' }} className='px-2'>
                      {grades.ratio.toFixed(0)}
                    </span>
                    <span className='px-2'>
                      יחס
                    </span>
                  </p>
                  : null}
                {grades.times ?
                  < p className='col'>
                    <span style={{ borderRadius: '50%', border: '1px solid whitesmoke' }} className='px-2'>
                      {grades.times.toFixed(0)}
                    </span>
                    <span className='px-2'>
                      זמנים
                    </span>
                  </p>
                  : null}
                {grades.price ?
                  <p className='col'>
                    <span style={{ borderRadius: '50%', border: '1px solid whitesmoke' }} className='px-2'>
                      {grades.price.toFixed(0)}
                    </span>
                    <span className='px-2'>
                      מחיר
                    </span>
                  </p>
                  : null}
                {grades.quality ?
                  <p className='col'>
                    <span style={{ borderRadius: '50%', border: '1px solid whitesmoke' }} className='px-2'>
                      {grades.quality.toFixed(0)}
                    </span>
                    <span className='px-2'>
                      איכות
                    </span>
                  </p>
                  : null}
              </div>
            </div>

            :

            null}
        </Paragraph>
      </div>

    </div >
  )
}

export default ServicePageUser