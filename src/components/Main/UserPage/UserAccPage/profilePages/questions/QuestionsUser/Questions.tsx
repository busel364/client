import React, { useEffect, useState } from 'react'
import { QuestionsAndAnswers } from '../../../../../../../utils/types/UserTypes'
import NullPrice from '../../prices/NullPrice';
import userAccStyle from '../../../../modules/userAcc.module.css'
import Answered from './Answered';
import NotAnswered from './NotAnswered';
import { useAppDispatch, useAppSelector } from '../../../../../../../app/hooks';
import { getCurUser } from '../../../../../../../reducers/AsyncActions/AccountActions';

interface Props {
  questionsAndAnswers: QuestionsAndAnswers[]
}

const Questions = ({ questionsAndAnswers }: Props) => {

  const dispatch = useAppDispatch();
  const {token} = useAppSelector(state=>state.user);

  const [answered, setAnswered] = useState<QuestionsAndAnswers[]>();
  const [notAnswered, setNotAnswered] = useState<QuestionsAndAnswers[]>();
  const [isOn, setIsOn] = useState(false);

  useEffect(() => {
    dispatch(getCurUser(token!))
  }, [])
  

  useEffect(() => {
    if (questionsAndAnswers) {
      setAnswered(questionsAndAnswers.filter((item) => item.answer))
      setNotAnswered(questionsAndAnswers.filter((item) => !item.answer))
    }
  }, [questionsAndAnswers])


  return (questionsAndAnswers && questionsAndAnswers.length>0?
    <div className='container-fluid m-0 pt-5 row'>
      <div className='row row-cols-3 col-sm-12 col-md-8 col-lg-4' style={{ margin: '0 auto' }}>
        <div className={`col text-center  ${userAccStyle.blockChangerItem}`} style={{ color: 'whitesmoke' }}
          onClick={() => setIsOn(true)}>
          <p className={`pt-2 pb-3 m-0 ${userAccStyle.pagesItem}`} style={{ fontSize: '1.5rem', fontWeight: '100' }}>לא נענו</p>
        </div>
        <p className='col text-center' style={{ color: 'whitesmoke', fontSize: '2rem' }}>|</p>
        <div className={`col text-center ${userAccStyle.blockChangerItem}`} style={{ color: 'whitesmoke' }}
          onClick={() => setIsOn(false)}>
          <p className={`pt-2 pb-3 m-0 ${userAccStyle.pagesItem}`} style={{ fontSize: '1.5rem', fontWeight: '100' }}>נענו</p>
        </div>
      </div>
      {!isOn ?
        <div>
          <Answered answered={answered!}/>
        </div>

        :

        <div>
          <NotAnswered notAnswered={notAnswered!}/>
        </div>}
    </div>

    :

    <div>
      <NullPrice />
    </div>
  )
}

export default Questions