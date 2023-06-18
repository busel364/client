import React from 'react'
import { UserData } from '../../../../utils/types/UserTypes'
import { Select, Space } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { updateRoles } from '../../../../reducers/AsyncActions/AccountActions';

interface Props {
    user: UserData
}

const { Option } = Select;

const CustomRoleSelection = ({ user }: Props) => {
    const dispatch = useAppDispatch();
    const stateUser = useAppSelector(state=>state.user);
    const handleChange = (value: string[]) => {
        if(stateUser.roles?.toString().includes('admin')){
        dispatch(updateRoles( user._id!,  stateUser.token!, value))
    }
    };

    return (
        <Select
            className=' text-end'
            mode="multiple"
            // style={{ width: '100%' }}
            placeholder="select one country"
            defaultValue={user.roles}
            onChange={handleChange}
            optionLabelProp="label"
        >
            <Option value="user" label="משתמש רגיל">
                <Space>
                    <span role="img" aria-label="user">
                        User
                    </span>
                    משתמש רגיל
                </Space>
            </Option>
            <Option value="moderator" label="מנחה">
                <Space>
                    <span role="img" aria-label="moderator">
                        Moderator
                    </span>
                    מנחה
                </Space>
            </Option>
            <Option value="admin" label="אדמין">
                <Space>
                    <span role="img" aria-label="admin">
                        Admin
                    </span>
                    אדמין
                </Space>
            </Option>
        </Select>
    );
}

export default CustomRoleSelection