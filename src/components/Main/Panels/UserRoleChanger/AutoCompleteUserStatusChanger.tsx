import { AutoComplete, Input, SelectProps } from 'antd';
import React, { useEffect, useState } from 'react'
import { UserData } from '../../../../utils/types/UserTypes';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getUsers } from '../../../../reducers/AsyncActions/UsersActions';
import { base_url } from '../../../../utils/utils';
import { removeSelectedUser, setSelectedUser } from '../../../../reducers/SelectedUserReducer/SelectedUserReducer';

interface Props {
    setFilter: (a: string) => void,
    setIsOn: (a: boolean) => void,
}

const AutoCompleteUserStatusChanger = ({ setFilter, setIsOn }: Props) => {

    const dispatch = useAppDispatch();

    const [options, setOptions] = useState<SelectProps<object>['options']>([]);
    const users = useAppSelector(state => state.users);

    useEffect(() => {
        dispatch(getUsers());
    }, [])

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
                        }}
                            onClick={() => {
                                dispatch(setSelectedUser(user))
                                setIsOn(true)
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

    const handleSearch = (value: string) => {
        dispatch(removeSelectedUser());
        setOptions(value ?
            searchResult(value,
                users.filter(item =>
                    JSON.stringify(item).toLowerCase().includes(value.toLowerCase())
                )
            )
            : []);
    };

    return (
        <div className='px-0' >
            <AutoComplete
                dropdownMatchSelectWidth={216}
                style={{ width: 216, paddingTop: 8 }}
                options={options}
                onSearch={handleSearch}
            >
                <Input
                    className='text-end'
                    size="large"
                    placeholder="חיפוש"
                    onChange={(e) => setFilter(e.target.value)}
                />
            </AutoComplete>
        </div>
    );
};

export default AutoCompleteUserStatusChanger