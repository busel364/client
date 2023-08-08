import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../../app/hooks'
import ServicePageUser from './ServicePageUser'
import styles from '../modules/homePage.module.css'
import { City } from '../../../../utils/types/CitiesTypes'
import ServicePageCitySearcher from './ServicePageCitySearcher/ServicePageCitySearcher'
import ServicePageServiceSearcher from './ServicePageServiceSearcher/ServicePageServiceSearcher'
import { UserData } from '../../../../utils/types/UserTypes'
import NullUsers from './NullUsers'
import ServicePageBestUsers from './ServicePageBestUsers'
import Loader from '../../Loader'
import CarouselBestUsers from './CarouselBestUsers'


interface Props {

}

const ServicePage = ({ }: Props) => {

    const { filter } = useAppSelector(state => state);
    const [length, setLength] = useState(0);

    const { users } = useAppSelector(state => state);
    const [cities, setCities] = useState<City[]>([])
    // const [activeItem, setActiveItem] = useState(0);

    const getCities = () => {
        fetch('https://data.gov.il/api/3/action/datastore_search?resource_id=5c78e9fa-c2e2-4771-93ff-7f400a12f7ba&limit=1267', {
            method: 'GET',
            mode: 'cors',
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(data => {
                setCities(data.result.records.map((item: any) => {
                    return {
                        bureau: item["לשכה"],
                        cityName: item["שם_ישוב"],
                        _id: item._id
                    }
                }));
            })
            .catch(e => console.log(e))
    }

    const handleFilter = (): UserData[] => {
        return users.filter(user=>user.roles?.toString().includes('user')).filter(user =>
            JSON.stringify(user.description?.specialization).toLowerCase().includes(filter.service.toLowerCase()))
            // .filter(user=>JSON.stringify(user).toLowerCase().includes(filter.city? filter.city.cityName?filter.city.cityName.toLowerCase(): '': ''))
            .filter(user => JSON.stringify(user).toLowerCase().includes(filter.town ? filter.town.toLowerCase() : ''))
    }

    const handleFilterBest = (): UserData[] => {
        const users = handleFilter().sort((a, b) => a.grades!.reduce((accum, item) => accum + item, 0) / a.grades?.length! - b.grades!.reduce((accum, item) => accum + item, 0) / b.grades?.length!);
        if (users.length !== length)
            setLength(users.length);
        return users;
    }

    useEffect(() => {
        getCities();
        setTimeout(() => window.scrollTo(0, 0), 0);
    }, [])



    return (cities.length > 0 ?
        <div className='py-5 px-0 mx-0' style={{ color: 'whitesmoke' }}>
            <div className='pt-5 row container-fluid'>
                <div className='col-sm-0 col-md-2 col-lg-4'></div>
                <div className='text-end col-sm-12 col-md-5 col-lg-4 mx-0 px-0 mb-3'>
                    <p className='pb-0 mb-0 pe-3' style={{ fontSize: '1.5rem' }}>ישוב</p>
                    <ServicePageCitySearcher cities={cities} />
                </div>
                <div className='text-end col-sm-12 col-md-5 col-lg-4 mx-0 px-0'>
                    <p className='pb-0 mb-0  pe-3' style={{ fontSize: '1.5rem' }}>שירות</p>
                    <ServicePageServiceSearcher />
                </div>
            </div>
            {handleFilterBest().length > 0 ?

                <CarouselBestUsers length={length} handleFilterBest={handleFilterBest} />

                :

                null
            }

            <div className='text-end container px-4'>
                {handleFilter().length > 0 ?

                    handleFilter().map(user => <ServicePageUser user={user} key={user._id} />)

                    :

                    <NullUsers />
                }
            </div>
        </div >

        :

        <Loader />
    )
}

export default ServicePage