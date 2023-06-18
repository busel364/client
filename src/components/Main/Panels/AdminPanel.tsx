import React, { useEffect, useState } from 'react'
import UserStatusChanger from './UserRoleChanger/UserStatusChanger'
import { UserOutlined, AppstoreAddOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { useAppSelector } from '../../../app/hooks';
import PostsCreatorAndChanger from './PostsCreatorAndChanger/PostsCreatorAndChanger';
import { useNavigate } from 'react-router-dom';

const { Content, Sider } = Layout;


const AdminPanel = () => {

    const [value, setValue] = useState('ניהול משתמשים');
    const [isAdmin, setIsAdmin] = useState(true);

    const { user } = useAppSelector(state => state);

    const navigate = useNavigate();

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    useEffect(() => {
        if (!user.roles?.toString().includes('admin')) {
            navigate('/');
        }
        setIsAdmin(true);
    }, [])


    return ( isAdmin?
        <div className='' >
            <Layout className='' style={{ paddingTop: '66px' }}>
                <Layout>
                    <Content style={{ margin: '24px 16px 0', overflowY: 'scroll' }}>
                        <div style={{ padding: 24, minHeight: '90vh', background: colorBgContainer }}>
                            {value === 'ניהול משתמשים' ? <UserStatusChanger /> : <PostsCreatorAndChanger />}
                        </div>
                    </Content>
                </Layout>
                <Sider
                    breakpoint="lg"
                    collapsedWidth="0"
                    reverseArrow={true}
                >
                    <div className="demo-logo-vertical" />
                    <Menu
                        className='pt-4'
                        theme={"dark"}
                        mode="inline"
                        defaultSelectedKeys={['1']}
                        items={[{ icon: UserOutlined, name: 'ניהול משתמשים' }, { icon: AppstoreAddOutlined, name: 'ליצור ולנהל פוסטים' }].map(
                            (item, index) => ({
                                key: String(index + 1),
                                icon: React.createElement(item.icon),
                                label: item.name,
                                onClick: () => setValue(item.name)
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