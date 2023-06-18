import React, { useEffect, useState } from 'react';
import { AutoComplete, Input } from 'antd';
import { City } from '../../../../../utils/types/CitiesTypes';
import { useAppDispatch, useAppSelector } from '../../../../../app/hooks';
import { setCity, setTown } from '../../../../../reducers/FilterReducer/FilterReducer';

interface Props {
    cities: City[],
}

const ServicePageCitySearcher = ({ cities }: Props) => {
    const [options, setOptions] = useState<{ value: string }[]>([]);

    const dispatch = useAppDispatch();
    const city = useAppSelector(state => state.filter.city)

    const onSelect = (data: string) => {
        const city = cities.find(item => data === item.cityName);
        if (city) {
            dispatch(setCity(city));
        }
    };

    const getPanelValue = (searchText: string) =>
        !searchText ? [] : cities.filter(item => JSON.stringify(item).toLowerCase().includes(searchText)).map(item => { return { value: item.cityName! } });

    useEffect(() => {
    }, [city])


    return (
        <div className=''>
            <AutoComplete
                dropdownMatchSelectWidth={252}
                style={{ width: 252, paddingTop: 8 }}
                options={options}
                onSearch={(text) => setOptions(getPanelValue(text))}
                onSelect={onSelect}
                onChange={(e)=>dispatch(setTown(e))}
            >
                <Input
                    className='text-end'
                    size="large"
                    placeholder="חיפוש לפי ישוב"
                />
            </AutoComplete>
        </div>
    );
}

export default ServicePageCitySearcher