import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../../../app/hooks'
import NullPrice from '../prices/NullPrice';
import { Grades, Post } from '../../../../../../utils/types/PostTypes';
import GradesComponent from './GradesComponent';
import PieComponent from './PieComponent';

const Grafics = () => {

  const posts = useAppSelector(state => state.posts);
  const [grades, setGrades] = useState<Grades>();

  useEffect(() => {
    if (posts.length > 0) {
      const calcGrades = calculateGrades(posts);
      setGrades(calcGrades);
    }
  }, [posts.length])

  const calculateGrades = (posts: Post[]): Grades => {
    if (posts.length < 100) {
      const ratio = posts.reduce((accum, value) => accum + value.grades.ratio, 0) / posts.length;
      const price = posts.reduce((accum, value) => accum + value.grades.price, 0) / posts.length;
      const quality = posts.reduce((accum, value) => accum + value.grades.quality, 0) / posts.length;
      const times = posts.reduce((accum, value) => accum + value.grades.times, 0) / posts.length;
      return {
        ratio,
        price,
        quality,
        times
      };
    } else {
      const ratio = posts.filter((v, index) => index < 100).reduce((accum, value) => accum + value.grades.ratio, 0) / 100;
      const price = posts.filter((v, index) => index < 100).reduce((accum, value) => accum + value.grades.price, 0) / 100;
      const quality = posts.filter((v, index) => index < 100).reduce((accum, value) => accum + value.grades.quality, 0) / 100;
      const times = posts.filter((v, index) => index < 100).reduce((accum, value) => accum + value.grades.times, 0) / 100;
      return {
        ratio,
        price,
        quality,
        times
      };
    }

  }


  const data = {
    labels: ['מאוד מרוצים', 'מרוצים', 'לא מרוצים'],
    datasets: [
      {
        label: ' ',
        data: [
          posts.filter((v, i) => i < 100 && (v.grades.times + v.grades.ratio + v.grades.quality + v.grades.price) / 4 >= 8).length,
          posts.filter((v, i) => i < 100 && ((v.grades.times + v.grades.ratio + v.grades.quality + v.grades.price) / 4 >= 5 && (v.grades.times + v.grades.ratio + v.grades.quality + v.grades.price) / 4 < 8)).length,
          posts.filter((v, i) => i < 100 && ((v.grades.times + v.grades.ratio + v.grades.quality + v.grades.price) / 4 < 5)).length
        ],
        backgroundColor: [
          'rgb(3, 155, 3)',
          'rgb(255, 165, 0)',
          'rgb(255, 99, 132)',
        ],
        borderColor: [
          'whitesmoke',
        ],
        borderWidth: 1,
      },
    ],
  };


  return (posts.length > 0 ?
    <div style={{ color: 'whitesmoke' }}>
      <div className='container pt-4 pe-4'>
        <p className='text-end' style={{fontSize:'1.5rem'}}>מחושב על {posts.length<100?posts.length:100} לקוחות אחרונים</p>
      </div>
      <GradesComponent grades={grades!} />
      <PieComponent data={data} />
    </div>

    :

    <div style={{ paddingBottom: '200px' }}>
      <NullPrice />
    </div>
  )
}

export default Grafics