import { AutoComplete, Input, SelectProps } from 'antd';
import React, { useEffect, useState } from 'react'
import { UserData } from '../../../../utils/types/UserTypes';
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getUsers } from '../../../../reducers/AsyncActions/UsersActions';
import { base_url } from '../../../../utils/utils';
import { News } from '../../../../utils/types/NewsTypes';
import { removeNew, setNew } from '../../../../reducers/NewsReducer/NewsReducer';
import { getNews } from '../../../../reducers/AsyncActions/NewsActions';

interface Props {
    filterTitle: (a: string) => string,
    setFilter: (a: string) => void,
    setIsOn: (a: boolean) => void,
}

const AutoCompleteNews = ({ setFilter, setIsOn, filterTitle }: Props) => {
    const dispatch = useAppDispatch();

    const [options, setOptions] = useState<SelectProps<object>['options']>([]);
    const news = useAppSelector(state => state.newsPosts.news);

    useEffect(() => {
        dispatch(getNews());
    }, [])

    const searchResult = (query: string, news: News[]) =>
        news.filter((_, index) => index < 7)
            .map((newsPost, idx) => {
                const category: string = `${query}`;
                return {
                    key: newsPost._id,
                    value: category,
                    label: (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                            onClick={() => {
                                dispatch(setNew(newsPost))
                                setIsOn(true)
                            }}>
                            <span className='row container-fluid'>
                                <p className='col-10 text-end'>
                                    {filterTitle(newsPost.data.html)}
                                </p>
                                <p className='col-10 text-end'>
                                    {newsPost.author.fullName}
                                </p>
                                {/* <div className='col-2'>
                                    <img
                                        style={{ height: '50px', width: '40px' }}
                                        src={!newsPost.avatarUrl ? require('../../../../utils/imgs/istockphoto-1337144146-612x612.jpg') : `${base_url}${user.avatarUrl}`}
                                        alt={user.fullName!} />
                                </div> */}
                            </span>
                        </div>
                    ),
                };
            });

    const handleSearch = (value: string) => {
        dispatch(removeNew());
        setOptions(value ?
            searchResult(value,
                news.filter(item =>
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

export default AutoCompleteNews