import React, { useEffect, useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setService } from '../../../../../reducers/FilterReducer/FilterReducer';

const ServicePageServiceSearcher = () => {

    const dispatch = useAppDispatch();
    const {users, filter} = useAppSelector(state => state)

    const [options, setOptions] = useState<{ value: string }[]>([]);
    const [ser, setSer] = useState(filter.service)

    const onSelect = (data: string) => {
        dispatch(setService(data));
    };

    const getCategories = (value: string): { value: string }[] => {
        const usersCategories = users.filter(item => JSON.stringify(item).toLowerCase().includes(value.toLowerCase())).map(item => { return item.description?.specialization! }).map(item => item.map(value => { return { value } }))
        const categories = [] as { value: string }[];
        for (let index = 0; index < usersCategories.length; index++) {
            categories.push(...usersCategories[index]);
        }
        const arr = Array.from(new Set(categories));
        return arr.filter(item => item.value.toLowerCase().includes(value.toLowerCase()));
    }

    const getPanelValue = (searchText: string) =>
        !searchText ? [] : getCategories(searchText);


    useEffect(() => {
        setService(filter.service)
    }, [filter.service])
    
    return (
        <div className=''>
            <AutoComplete
                dropdownMatchSelectWidth={252}
                style={{ width: 252, paddingTop: 8 }}
                options={options}
                onSearch={(text) => setOptions(getPanelValue(text))}
                onSelect={onSelect}
                onChange={(e)=>{
                    dispatch(setService(e))
                    setSer(e)
                }}
                value={ser}
            >
                <Input
                    className='text-end'
                    size="large"
                    placeholder="חיפוש לפי שירות"
                />
            </AutoComplete>
        </div>
    );

}

export default ServicePageServiceSearcher