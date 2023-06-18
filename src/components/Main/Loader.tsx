import React from 'react'
import { LoadingOutlined } from '@ant-design/icons';

const Loader = () => {
  return (
    <div className='loader text-center'>
    <LoadingOutlined style={{fontSize:'16rem', color:'whitesmoke',marginTop:'40vh', marginBottom:'30vh'}}/>
</div>
  )
}

export default Loader