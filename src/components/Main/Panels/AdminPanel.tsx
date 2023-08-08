import React, { useEffect, useState } from 'react'
import UserStatusChanger from './UserRoleChanger/UserStatusChanger'
import { UserOutlined, AppstoreAddOutlined, FormOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useAppSelector } from '../../../app/hooks';
import PostsCreatorAndChanger from './PostsCreatorAndChanger/PostsCreatorAndChanger';
import { useNavigate } from 'react-router-dom';
import TechHelpPanel from './TechHelpPanel/TechHelpPanel';
import { socket } from '../../../utils/utils';

const { Content, Sider } = Layout;


const AdminPanel = () => {

    const [value, setValue] = useState('ניהול משתמשים');
    const [isAdmin, setIsAdmin] = useState(true);
    const [isOn, setIsOn] = useState(false);
    const [users,setUsers] = useState<string[]>([])

    const { user } = useAppSelector(state => state);

    const setAuth = () => {
        socket.auth = { username: 'tech_helper',userId:'tech_helper' };
        socket.connect();
    }

    const navigate = useNavigate();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        // setAuth();
        if (!user.roles?.toString().includes('admin')) {
            navigate('/');
        }
        setIsAdmin(true);
    }, [socket])
        

    return (isAdmin ?
        <div className='' >
            <Layout className='' style={{ paddingTop: '66px' }}>
                <Layout>
                    <Content style={{ margin: '24px 16px 0', overflowY: 'scroll' }}>
                        <div style={{ padding: 24, minHeight: '90vh', background: colorBgContainer }}>
                            {value === 'ניהול משתמשים' ? <UserStatusChanger /> : value === 'ליצור ולנהל פוסטים'? <PostsCreatorAndChanger setIsOn={setIsOn} isOn={isOn}/> : <TechHelpPanel />}
                        </div>
                    </Content>
                </Layout>
                <Sider
                    style={{ zIndex: '30', top: '10%' }}
                    breakpoint="lg"
                    collapsedWidth="0"
                    reverseArrow={true}
                >
                    <div className="demo-logo-vertical" />
                    <Menu
                        className='pt-4'
                        theme={"dark"}
                        mode="inline"
                        style={{direction:'rtl'}}
                        defaultSelectedKeys={['1']}
                        items={[{ icon: UserOutlined, name: 'ניהול משתמשים' }, { icon: AppstoreAddOutlined, name: 'ליצור ולנהל פוסטים' }, {icon: FormOutlined, name:'עזרא טכנית'}].map(
                            (item, index) => ({
                                key: String(index + 1),
                                icon: React.createElement(item.icon),
                                label: item.name,
                                onClick: () => {
                                    setValue(item.name)
                                    setIsOn(false)
                                }
                            }),
                        )}
                    />
                </Sider>
            </Layout>
        </div>
        :

        <div></div>
    );
};
//     return (
//         <div className='pt-5' style={{ color: 'whitesmoke' }}>
//             <h1 className='pt-5 text-center' style={{ fontWeight: '100' }}>פאנל הניהול</h1>
//             <div className="container" style={{ margin: '0 auto' }}>
//                 <UserStatusChanger />
//             </div>
//         </div>
//     )
// }

export default AdminPanel