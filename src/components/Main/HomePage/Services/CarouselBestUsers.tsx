import React, { useEffect, useState } from 'react'
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import styles from '../modules/homePage.module.css'
import stylesNews from '../modules/news.module.css'
import { UserData } from '../../../../utils/types/UserTypes';
import ServicePageBestUsers from './ServicePageBestUsers';

interface Props {
    handleFilterBest: () => UserData[],
    length: number
}

const CarouselBestUsers = ({ handleFilterBest, length }: Props) => {

    // const [length, setLength] = useState<number>(0);
    // const [users, setUsers] = useState<UserData[]>();


    // const handleFilterBest = () => {
    //     const users = handleFilter().filter((item, index) => index < 5).sort((a, b) => a.grades!.reduce((accum, item) => accum + item, 0) / a.grades?.length! - b.grades!.reduce((accum, item) => accum + item, 0) / b.grades?.length!);
    //     console.log(users.length +" _ "+ length);

    //     if (users.length !== length) {
    //         console.log('set');

    //         setLength(users.length);
    //     }
    //     return users;
    // }

    const NextArrow = ({ onClick }: any) => {
        return (
            <div className={`${stylesNews.arrow} ${stylesNews.slickNext}`} onClick={onClick}>
                <CaretRightOutlined />
            </div>
        );
    };

    const PrevArrow = ({ onClick }: any) => {
        return (
            <div className={`${stylesNews.arrow} ${stylesNews.slickPrev}`} onClick={onClick}>
                <CaretLeftOutlined />
            </div>
        );
    };

    const settings = {
        slidesToScroll: 1,
        dots: true,
        infinite: true,
        speed: 6500,
        autoplay: true,
        slidesToShow: length === 5 ? 4 : length > 1 && length < 5 ? length : 1,
        arrows: true,
        className: `my-4 ${stylesNews.slickSlider}`,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1124,
                settings: {
                    slidesToShow: length > 1 && length <= 5 ? 2 : 1,
                }
            },
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: length === 5 ? 4 : length > 1 && length < 5 ? length >= 3 ? 3 : length : 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    };

    useEffect(() => {
        handleFilterBest();
    }, [])

    return (length > 0 ?
        <div className={`text-end pb-4 pt-1 mt-4 container-fluid px-0 mx-0 ${styles.divUser}`} style={{ borderBottom: '3px solid whitesmoke', borderTop: '3px solid whitesmoke' }}>
            <div className='row container px-0 ' style={{ margin: '0 auto' }}>
                <p className='text-center' style={{ fontSize: '1.7rem' }}>בעלי מקצוע מומלצים</p>
                <div style={{ margin: '0 auto' }} className='col-12'>
                    <Slider {...settings}>
                        {handleFilterBest().map((item, index) => <ServicePageBestUsers index={index} item={item} key={item._id} />)}
                    </Slider>
                </div>
            </div>
        </div>

        :

        null

    )
}

export default CarouselBestUsers