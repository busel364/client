import React, { useEffect, useState } from 'react'
import { socket } from '../../../../utils/utils';
import TechHelpSideBar from './TechHelpSideBar';
import ConversationWindow from './ConversationWindow';
import { Message, UserTech } from '../../../../utils/types/TechHelperTypes';
import { Layout, Menu } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { UserOutlined } from '@ant-design/icons';
import { Content } from 'antd/es/layout/layout';
import Loader from '../../Loader';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { addMessage, appendUser, removeUser, setCurUser, setIsNewMessage, setUsers } from '../../../../reducers/TechHelpReducer/TechHelpReducer';
import MenuTechHelpPanel from './MenuTechHelpPanel';

const TechHelpPanel = () => {

    const dispatch = useAppDispatch();

    const { curUser, users,newMessage } = useAppSelector(state => state.techHelper);

    useEffect(() => {
        socket.emit('get_users');
        socket.on('user_disconnect', (data: string) => {
            dispatch(removeUser(data))
        })
        socket.on('user_connect', (data: UserTech) => {
            dispatch(appendUser(data))
            socket.emit('join', { id: data.userId })
        })
        socket.on('users', (data: { username: string, id: string, userId: string }[]) => {
            data = data.filter(item=>item.id!=='item_helper');
            const joined:UserTech[] = [...users];
            const notJoined:UserTech[] =[];
            for (let i = 0; i < data.length; i++) {
                const index = users.findIndex(item=>item.id===data[i].id);
                if(index===-1){
                    notJoined.push({
                        name: data[i].username,
                        id: data[i].id,
                        userId: data[i].userId,
                        messages: [] as Message[],
                        newMessage: false,
                    });
                    socket.emit('join', { id: data[i].userId })
                }
            }
            joined.push(...notJoined);
            // data.forEach(item => socket.emit('join', { id: item.userId }));
            dispatch(setUsers(joined))
            //     data.map((item) => {
            //     return {
            //         name: item.username,
            //         id: item.id,
            //         userId: item.userId,
            //         messages: [] as Message[],
            //         newMessage: false,
            //     }
            // })))
        })
        socket.on("private_message", (data) => {
            dispatch(addMessage({ id: data.from, message: data }));
            dispatch(setIsNewMessage());
        });
    }, [socket,newMessage])


    return (
        // users.length < 1 ?

        // <Loader />

        // :

        <div
        // style={{ direction: 'rtl' }}
        >
            <Layout className='' style={{ height: '80vh' }}>

                <Layout>
                    <Content style={{ margin: '24px 16px 0', overflowY: 'scroll' }}>
                        {
                            !curUser ?

                                <div className='text-center'>
                                    <p className='pt-0 mb-0 ' style={{ fontSize: '1.8rem', fontWeight: '100', color: '#333' }}>תמיכה טכנית</p>
                                    <div className='pt-5 mt-4'>
                                        <UserOutlined style={{ fontSize: '8rem' }} />
                                        <p className='pt-4' style={{ fontSize: '1.5rem', fontWeight: '100', color: '#333' }}>משתמש לא נבחר, נא לבחור מהרשימה</p>
                                    </div>
                                </div>

                                :

                                <div>
                                    <ConversationWindow />
                                </div>
                        }
                    </Content>
                </Layout>
                <Sider
                    style={{ zIndex: '30' }}
                    breakpoint="lg"
                    collapsedWidth="0"
                    reverseArrow={true}
                >
                    <div className="demo-logo-vertical" />
                    <MenuTechHelpPanel users={users} />
                </Sider>
            </Layout>
        </div>
    )
}

export default TechHelpPanel