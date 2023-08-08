import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../../../app/hooks';
import Comment from './Comment';
import styles from '../../../modules/userProfilePages.module.css';
import type { PaginationProps } from 'antd';
import { Pagination } from 'antd';
import CommentCreator from './CommentCreator';
import { UserData } from '../../../../../../utils/types/UserTypes';
import { Post } from '../../../../../../utils/types/PostTypes';

interface Props {
  item: UserData
}


const CommentsGuest = ({ item }: Props) => {

  const [isOn, setIsOn] = useState(false);

  const { posts, user } = useAppSelector(state => state);
  
  const [current, setCurrent] = useState(1);
  const [arr, setArr] = useState<Post[]>([...posts]);

  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };

  useEffect(() => {
    setArr([...posts])
  }, [posts])

  return (!isOn ?
    <div>
      {user.token ?
        <div className='text-end'>
          <button
            className={`${styles.newCommentButton} my-2 mb-5 pt-2 pb-3 me-3 mt-4`}
            onClick={() => setIsOn(true)}>חוות דעת חדשה</button>
        </div>
        :
        null}
      <div className='container p-0'>
        {arr
          .sort((a, b) => a.updatedAt.toLowerCase() < b.updatedAt.toLowerCase() ? 1 : -1)
          .filter((v, i) => (current - 1) * 20 < i * current + 1 && i * current < (current * 20) + 1)
          .map((item, index) => <Comment item={item} key={`${item.title}${item.userSharedPost._id}+${index}`} />)}
      </div>
      <div>
        <Pagination
          showSizeChanger={false}
          current={current}
          onChange={onChange}
          total={posts.length}
          hideOnSinglePage={true}
        />
      </div>
    </div>

    :

    <CommentCreator setIsOn={setIsOn} item={item} />

  )
}

export default CommentsGuest