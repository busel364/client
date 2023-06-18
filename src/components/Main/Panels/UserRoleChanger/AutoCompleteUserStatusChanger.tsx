import { AutoComplete, Input, SelectProps } from 'antd';
import React, { useEffect, useState } from 'react'
import { UserData } from '../../../../utils/types/UserTypes';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getUsers } from '../../../../reducers/AsyncActions/UsersActions';
import { base_url } from '../../../../utils/utils';

interface Props {
    setFilter: (a: string) => void
    setSelectedUser:(a:UserData|null) => void
}

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
                        <span className='row container-fluid'>
                            <p className='col-10 text-end'>
                                {user.fullName}
                            </p>
                            <div className='col-2'>
                                <img
                                    style={{ height: '50px', width: '40px' }}
                                    src={!user.avatarUrl ? require('../../../../utils/imgs/istockphoto-1337144146-612x612.jpg') : `${base_url}${user.avatarUrl}`}
                                    alt={user.fullName!} />
                            </div>
                        </span>
                    </div>
                ),
            };
        });


const AutoCompleteUserStatusChanger = ({ setFilter,setSelectedUser }: Props) => {
    const [options, setOptions] = useState<SelectProps<object>['options']>([]);
    const users = useAppSelector(state => state.users);

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getUsers());
    }, [])

    const handleSelect = (value: UserData) => {
        setSelectedUser(value);
    }

    const handleSearch = (value: string) => {
        setSelectedUser(null);
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
                onSelect={handleSelect}
            >
                <Input
                    className='text-end'
                    size="large"
                    placeholder="חיפוש"
                    onChange={(e)=>setFilter(e.target.value)}
                />
            </AutoComplete>
        </div>
    );
};

export default AutoCompleteUserStatusChanger