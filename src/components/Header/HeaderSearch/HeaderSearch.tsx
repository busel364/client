import React, { useEffect, useState } from 'react';
import { AutoComplete, Button, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { SelectProps } from 'antd/es/select';
import { Link } from 'react-router-dom';
import { UserData } from '../../../utils/types/UserTypes';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { getUsers } from '../../../reducers/AsyncActions/UsersActions';


const searchResult = (query: string, users: UserData[]) =>
    users.filter((_, index) => index < 7)
        .map((user, idx) => {
            const category: string = `${query}`;
            return {
                key: user._id,
                value: category,
                label: (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <span>
                            <Link to={`${user._id}`}>
                                {user.fullName}
                            </Link>
                        </span>
                    </div>
                ),
            };
        });

const HeaderSearch: React.FC = () => {
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);
    const users = useAppSelector(state => state.users);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [])

    const handleSearch = (value: string) => {
        setOptions(value ?
            searchResult(value,
                users.filter(item =>
                    JSON.stringify(item).toLowerCase().includes(value.toLowerCase())
                )
            )
            : []);
    };

    return (
        <div >
            <AutoComplete
                dropdownMatchSelectWidth={252}
                style={{ width: 252, paddingTop: 8 }}
                options={options}
                onSearch={handleSearch}
            >
                <Input.Search
                    className='text-end'
                    size="large"
                    placeholder="חיפוש"
                    enterButton={
                        <Button
                            style={{ paddingBottom: '6px', height: '39.59px',backgroundColor:'whitesmoke' }}
                            icon={<SearchOutlined />}
                        />}
                />
            </AutoComplete>
        </div>
    );
};

export default HeaderSearch