import { Menu } from 'antd';
import React from 'react'
import { useAppDispatch } from '../../../../app/hooks';
import { setCurUser } from '../../../../reducers/TechHelpReducer/TechHelpReducer';
import { socket } from '../../../../utils/utils';
import { UserOutlined } from '@ant-design/icons';
import { UserTech } from '../../../../utils/types/TechHelperTypes';

interface Props{
    users:UserTech[]
}

const MenuTechHelpPanel = ({users}:Props) => {

    const dispatch = useAppDispatch();

    return (
        <>
            <Menu
                className='pt-4 '
                theme={"dark"}
                mode="inline"
                style={{ direction: 'rtl' }}
                // defaultSelectedKeys={['1']}
                items={users.filter(item=>item.id!=='tech_helper').map(
                    (item, index) => ({
                        key: item.id,
                        icon: React.createElement(UserOutlined),
                        label: `${item.name} ${item.newMessage ? ' • ' : ''}`,
                        onClick: () => {
                            dispatch(setCurUser({ ...item, newMessage: false }));
                            socket.emit('join', { id: item.userId });
                        }
                    }),
                )}
            />
        </>
    )
}

export default MenuTechHelpPanel