import React, { useEffect } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getUsers } from './reducers/AsyncActions/UsersActions';
import { decodeBase64 } from './utils/utils';
import { getCurUser } from './reducers/AsyncActions/AccountActions';

const twentyDays = 1000 * 60 * 60 * 24 * 20;

function App() {

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsers());
    const userNotParsed = localStorage.getItem('user') ? decodeBase64(localStorage.getItem('user')!) : null;
    if (userNotParsed) {
      const userParsed: { token: string, date: number } = JSON.parse(userNotParsed);
      if (Date.now() - userParsed.date < twentyDays) {
        dispatch(getCurUser(userParsed.token));
      }
    }
  }, [])

  return (
    <div>
      <Header />
      <Main />
      {/* <Footer/> */}
    </div>
  );
}

export default App;
