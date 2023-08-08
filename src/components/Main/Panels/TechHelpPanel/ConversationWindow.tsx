import React, { useEffect, useState } from 'react'
import { Message, UserTech } from '../../../../utils/types/TechHelperTypes';
import { SendOutlined } from '@ant-design/icons';
import styles from '../modules/panels.module.css'
import { socket } from '../../../../utils/utils';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { addMessage } from '../../../../reducers/TechHelpReducer/TechHelpReducer';


interface Props {
    // curUser: UserTech,
    // sendMessage: (m: string) => void,
    messages: Message[]
}

const ConversationWindow = () => {

    const dispatch = useAppDispatch();

    const { curUser } = useAppSelector(state => state.techHelper);

    const [messages, setMessages] = useState<Message[]>([]);
    const [message, setMessage] = useState('');
    const [count, setCount] = useState(0);

    const sendMessage = (message: string) => {
        if (curUser) {
            // socket.emit("send_message", { message })
            // socket.emit('join', { id: curUser.id });
            const m = { content: message, to: curUser.id, from: 'tech_helper' };
            socket.emit("private message", m)
            // setMessages(prev => [...prev, m])
            // mapUsers(curUser.id, curUser.userId, m, curUser.name);
            dispatch(addMessage({ id: curUser.id, message: m }));
            setCount(prev => prev++);
            setMessages(prev => [...prev, m]);
            setMessage('');
        }
    }

    useEffect(() => {
    }, [count, messages])
    

    useEffect(() => {
        console.log('eff11');
        // socket.on("private_message", (data) => {
        //     console.log(data);
        //     // mapUsers(data.from, data.userId, data.content, data.name);
        //     // setMessages(prev => [...prev, data])
        //     dispatch(addMessage({ id: data.from, message: data }));
        //     setCount(prev => prev++);
        //     setMessages(prev => [...prev, { from: data.from, content: data.content, to: 'tech_helper' }])
        // });
    }, [socket, dispatch])


    return (
        <div style={{ position: 'relative' }}>
            <div className={`${styles.techBlock}`}>
                <div className='text-center py-1' style={{ borderBottom: 'grey 3px solid', position: 'relative' }}>
                    <p className='p-0 m-0 ' style={{ fontSize: '1.8rem' }}>{curUser!.name}</p>
                </div>
                <div style={{ height: '57vh', padding: '5px', overflowY: 'auto' }}>
                    {curUser!.messages.map((item, index) => <div
                        key={`${index}`}
                        style={{ color: 'whitesmoke' }}
                    >
                        {item.from === 'tech_helper' ?

                            <div style={{ direction: 'rtl' }}>
                                <p className=' py-1 px-2 col-8 m-1' style={{ backgroundColor: 'rgb(72, 72, 255)', borderRadius: '10px' }}>{item.content}</p>
                            </div>

                            :

                            <div>
                                <p className='text-end py-1 px-2 col-8 m-1' style={{ backgroundColor: 'rgb(124, 72, 255)', borderRadius: '10px' }}>{item.content}</p>
                            </div>
                        }

                    </div>)}
                </div>
                <div className={`row m-0 mt-2 `} style={{ height: '78px', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
                    <div className='p-0' style={{ backgroundColor: 'white', height: '78px', width: '50px' }}>
                        <SendOutlined
                            onClick={() => {
                                if (message !== '') {
                                    try {
                                        sendMessage(message);
                                    } catch (error) {
                                        console.log(error);
                                    }
                                }
                            }}
                            title='לשלוח'
                            className={`${styles.sendIcon} pe-2 pt-4`}
                            style={{ fontSize: '2rem', transform: 'scale(-1, 1)' }} />
                    </div>
                    <textarea
                        className={`${styles.techTextArea} p-0 pe-3 col text-end`}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder='הודעה...'>
                    </textarea>
                </div>
            </div>
        </div>
    )
}

export default ConversationWindow