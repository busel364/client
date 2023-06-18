import React, { useState } from 'react'

const PostCreator = () => {

    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');

  return (
    <div>PostCreator
        <input type='file' accept='images/*' multiple/>
    </div>
  )
}

export default PostCreator