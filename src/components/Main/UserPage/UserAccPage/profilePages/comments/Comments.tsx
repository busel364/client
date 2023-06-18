import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { Pagination, PaginationProps } from 'antd';
import { useAppSelector } from '../../../../../../app/hooks';
import { Post } from '../../../../../../utils/types/PostTypes';

const Comments = () => {

  const posts = useAppSelector(state => state.posts);
  const [current, setCurrent] = useState(1);
  const [arr, setArr] = useState<Post[]>([...posts]);


  const onChange: PaginationProps['onChange'] = (page) => {
    setCurrent(page);
  };


  useEffect(() => {
    setArr([...posts])
  }, [posts])


  return (
    <div>
      <div className='container'>
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
  )
}

export default Comments