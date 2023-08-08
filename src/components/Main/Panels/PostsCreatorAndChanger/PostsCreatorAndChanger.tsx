import React, { useEffect, useState } from 'react'
import { AppstoreAddOutlined } from '@ant-design/icons';
import styles from '../modules/panels.module.css'
import PostEditor from './PostEditor';
import { News } from '../../../../utils/types/NewsTypes';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import ConvertHTML from '../../HomePage/News/Converter/ConvertHTML';
import { getNews } from '../../../../reducers/AsyncActions/NewsActions';
import { Link } from 'react-router-dom';
import { removeNew, setNew } from '../../../../reducers/NewsReducer/NewsReducer';
import { filterTitle } from '../../../../utils/utils';

interface Props {
  setIsOn: (a: boolean) => void,
  isOn: boolean
}

const PostsCreatorAndChanger = ({ isOn, setIsOn }: Props) => {
  const dispatch = useAppDispatch();

  const { news, selectedNew } = useAppSelector(state => state.newsPosts);

  // const [selectedNewsPost, setSelectedNewsPost] = useState<News | null>(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    dispatch(getNews());
    if (!isOn) {
      dispatch(removeNew());
    }
  }, [dispatch, isOn,news])

  return (!isOn ?
    <div className={`container-fluid col-12 text-center`} style={{ position: 'relative' }}>
      <p className='pt-0 mb-0' style={{ fontSize: '1.8rem', fontWeight: '100', color: '#333' }}>ניהול פוסטים</p>
      <AppstoreAddOutlined
        className={`${styles.plusSquare}`}
        title='להקים חדש'
        onClick={() => {
          setIsOn(true)
        }} />
      {/* 
        autocompleter
        newsPosts
        <ConvertHTML html={item.data.html}/>
        */}
      <div>
        {news.map(item =>
          <div className='row row-cols-2 py-3' key={item._id}>
            <div className='col' style={{ fontSize: '1.5rem' }}>
              <Link className={styles.pass} to={`/${item.author._id!}`}>{item.author.fullName}</Link>
            </div>
            <div className='col'>
              <p
                className={styles.pass}
                style={{ fontSize: '1.5rem' }}
                onClick={() => {
                  dispatch(setNew(item));
                  setIsOn(true);
                }}>{filterTitle(item.data.html)}</p>
              <Link style={{wordBreak:'break-word'}} to={`/news/${item._id}`}>{item._id}</Link>
            </div>
          </div>)}
      </div>
    </div>

    :

    <div>
      <PostEditor setIsOn={setIsOn} design={selectedNew?.data.design} _id={selectedNew?._id} />
    </div>
  )
}

export default PostsCreatorAndChanger