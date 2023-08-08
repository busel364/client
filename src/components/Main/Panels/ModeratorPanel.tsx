import React, { useEffect } from 'react'
import TechHelpPanel from './TechHelpPanel/TechHelpPanel'
import { useAppSelector } from '../../../app/hooks'
import { useNavigate } from 'react-router-dom';

const ModeratorPanel = () => {

  const {user} = useAppSelector(state=>state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.roles?.toString().includes('moderator')) {
      navigate('/');
  }
  }, [])
  

  return (
    <div style={{paddingTop:'70px'}}>
      <TechHelpPanel />
    </div>
  )
}

export default ModeratorPanel