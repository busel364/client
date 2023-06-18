import React from 'react'

interface Props{
    item:string,
}

const Specialization = ({item}:Props) => {
  return (
    <p className='pe-3' style={{fontWeight:'100', fontSize:'1.3rem'}}>{item} •</p>
  )
}

export default Specialization