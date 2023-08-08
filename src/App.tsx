import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Main from './components/Main/Main';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { getUsers } from './reducers/AsyncActions/UsersActions';
import { decodeBase64, socket } from './utils/utils';
import { getCurUser } from './reducers/AsyncActions/AccountActions';
import TechHelper from './components/Main/TechHelper/TechHelper';
import { addMessage, addMessageToCurUser, setCurUser, setNotAdminMessages, setUsers } from './reducers/TechHelpReducer/TechHelpReducer';
import Footer from './components/Footer/Footer';
import { Message } from './utils/types/TechHelperTypes';

const twentyDays = 1000 * 60 * 60 * 24 * 20;

function App() {

  const dispatch = useAppDispatch();

  const { user } = useAppSelector(state => state);
  const { curUser } = useAppSelector(state => state.techHelper);

  const [messages, setMessages] = useState<any[]>([]);
  const [message, setMessage] = useState('');


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

  const checkUserRoles = () => {
    return user.roles?.toString().toLowerCase().includes('admin') || user.roles?.toString().toLowerCase().includes('moderator');
  }

  const setAuth = () => {
    if (user._id) {
      if (checkUserRoles()) {
        socket.auth = { username: 'tech_helper', userId: 'tech_helper' };
      } else {
        socket.auth = { username: user.fullName, userId: user._id };
      }
      socket.connect();
    }
  }

  useEffect(() => {
    setAuth();
    if (user && !checkUserRoles()) {
      socket.emit('join', { id: user._id });
      dispatch(setCurUser({
        name: user.fullName!,
        id: socket.id,
        userId: user._id!,
        messages: [],
        newMessage: false,
      }))
    }
  }, [user])

  // useEffect(() => {
  //   if (socket.id === 'tech_helper') {
  //     socket.emit('get_users');
  //     socket.on('users', (data: { username: string, id: string, userId: string }[]) => {
  //       // data = data.filter(item => item.username !== 'tech_helper');
  //       data.forEach(item => socket.emit('join', { id: item.userId }))
  //       dispatch(setUsers(data.map((item) => {
  //         return {
  //           name: item.username,
  //           id: item.id,
  //           userId: item.userId,
  //           messages: [] as Message[],
  //           newMessage: false,
  //         }
  //       })))
  //     })
  //     socket.on("private_message", (data) => {
  //       console.log(data);
  //       // mapUsers(data.from, data.userId, data.content, data.name);
  //       // setMessages(prev => [...prev, data])
  //       dispatch(addMessage({ id: data.from, message: data }));
  //       // setCount(prev => prev++);
  //       setMessages(prev => [...prev, { from: data.from, content: data.content, to: 'tech_helper' }])
  //     });
  //   }
  // }, [socket])

  // useEffect(() => {
  //   socket.on("private_message", (data) => {
  //     console.log(data);
  //     if (socket.id !== 'tech_helper') {
  //       dispatch(addMessageToCurUser(data));
  //     }else{
  //       dispatch(addMessage({id: data.from, message:data}))
  //     }
  //     // setMessages(prev => [...prev, data]);
  //   });
  // }, [socket])


  return (
    <div>
      <Header />
      <Main />
      <TechHelper />
      <Footer />
    </div>
  );
}

export default App;
