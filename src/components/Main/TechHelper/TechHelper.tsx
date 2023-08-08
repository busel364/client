import React, { useEffect, useState } from 'react'
import styles from '../HomePage/modules/homePage.module.css'
import { CommentOutlined, CloseOutlined, SendOutlined } from '@ant-design/icons';
import io from 'socket.io-client';
import { base_url, socket } from '../../../utils/utils';
import { useAppSelector } from '../../../app/hooks';
import { Message } from '../../../utils/types/TechHelperTypes';

// const socket = io('http://localhost:4444', { autoConnect: false });

// interface Props{
//     checkUserRoles: ()=>boolean,
//     sendMessage: (m:Message)=>void
// }

const TechHelper = () => {

    const { user } = useAppSelector(state => state);
    const { curUser } = useAppSelector(state => state.techHelper);

    const [isOn, setIsOn] = useState(false);
    const [messages, setMessages] = useState<any[]>([]);
    const [message, setMessage] = useState('');

    const checkUserRoles = () => {
        return user.roles?.toString().toLowerCase().includes('admin') || user.roles?.toString().toLowerCase().includes('moderator');
    }

    // const setAuth = () => {
    //     if (user._id) {
    //       if (checkUserRoles()) {
    //         socket.auth = { username: 'tech_helper', userId: 'tech_helper' };
    //       } else {
    //         socket.auth = { username: user.fullName, userId: user._id };
    //       }
    //       socket.connect();
    //     }
    //   }
    
    //   useEffect(() => {
    //     setAuth();
    //   }, [user])

    // socket.on("connect_error", (err) => {
    //     if (err.message === "invalid username") {

    //     }
    // });

    const sendMessage = () => {
        if (message !== '') {
            console.log(message);
            // socket.emit("send_message", { message })
            socket.emit("private message", {
                content: message,
                to: 'tech_helper',
                // user._id !== '642fe7e9c575c6f01cd8054e' ? '642fe7e9c575c6f01cd8054e' : '6409b6b4b9d548001f0a6e55',
                from: socket.id
            })
            setMessages(prev => [...prev, message])
            setMessage('');
        }
    }

    useEffect(() => {
        socket.on("private_message", (data) => {
            // console.log(data);
            setMessages(prev => [...prev, data]);
        });
        // socket.on("receive_message", (data) => {
        //     console.log(data);
        //     setMessages(prev => [...prev, data])
        //     console.log(messages);
        // })
    }, [socket])


    return (user._id && !checkUserRoles() ?
        !isOn ?

            <div
                className={`${styles.techHelpIcon} text-center`}
                onClick={() => {
                    setIsOn(true);
                    // setAuth();
                }}>
                <CommentOutlined
                    title='צ׳אט עם הנציג'
                    className={`${styles.icon}`} />
            </div>

            :

            <div style={{ position: 'relative' }}>
                {/* <div style={{ position: 'fixed', height: '100vh', width: '100%', zIndex: '40', left: '0', top: '0' }}
                    onClick={() => setIsOn(false)}>
                </div> */}
                <div className={`${styles.techBlock}`}>
                    <div className='text-center py-1' style={{ borderBottom: 'grey 3px solid', position: 'relative' }}>
                        <p className='p-0 m-0 ' style={{ fontSize: '1.4rem' }}>צ׳אט עם הנציג</p>
                        <div className={`${styles.closeButton}`} style={{ height: '43px', borderLeft: '3px solid grey', position: 'absolute', right: '2%', top: '0' }}
                            onClick={() => setIsOn(false)} >
                            <CloseOutlined
                                title='לסגור'
                                className={`${styles.closeIcon}`}
                                style={{ fontSize: '2rem', position: 'relative', top: '10%', paddingLeft: '5px' }} />
                        </div>
                    </div>
                    <div style={{ height: '370px', padding: '5px', overflowY: 'auto' }}>
                        {messages.map((item, index) => <div
                            key={`${index}`}
                            style={{ color: 'whitesmoke' }}
                        >
                            {item.content ?
                                <div>
                                    <p className='text-end py-1 px-2 col-8 m-1' style={{ backgroundColor: 'rgb(124, 72, 255)', borderRadius: '10px' }}>{item.content}</p>
                                </div>
                                :
                                <div style={{ direction: 'rtl' }}>
                                    <p className=' py-1 px-2 col-8 m-1' style={{ backgroundColor: 'rgb(72, 72, 255)', borderRadius: '10px' }}>{item}</p>
                                </div>
                            }

                        </div>)}
                    </div>
                    <div className={`row m-0 mt-2 ${styles.divInput}`} style={{ width: '300px', height: '78px', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
                        <div className='col-2 p-0' style={{ backgroundColor: 'white', height: '78px' }}>
                            <SendOutlined
                                onClick={sendMessage}
                                title='לשלוח'
                                className={`${styles.sendIcon}  pe-2 pt-3`}
                                style={{ fontSize: '2rem', transform: 'scale(-1, 1)' }} />
                        </div>
                        <textarea
                            className={`${styles.techTextArea} p-0 pe-3 col-10 text-end`}
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder='הודעה...'>
                        </textarea>
                    </div>
                </div>
            </div>

        :

        null
    )
}

export default TechHelper