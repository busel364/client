import React from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { useAppSelector } from '../../../../app/hooks'
import { filterTitle, imgFilter } from '../../../../utils/utils'
import styles from '../../Panels/modules/panels.module.css'
import stylesNews from '../modules/news.module.css'
import ConvertHTML from './Converter/ConvertHTML'
import { Link } from 'react-router-dom'
import { CaretRightOutlined, CaretLeftOutlined } from '@ant-design/icons';

const Carousel = () => {

    const { news } = useAppSelector(state => state.newsPosts);

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
        slidesToShow: 4,
        arrows: true,
        className: `py-4 ${stylesNews.slickSlider}`,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 1124,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 1920,
                settings: {
                    slidesToShow: 3,
                }
            },
            {
                breakpoint: 735,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    };
    return (
        <div style={{ margin: '0 auto' }} className='col-10'>
            <Slider {...settings}>
                {news.map(item =>
                    <div className=' text-center px-0 row mx-0' key={item._id} style={{ display: 'flex' }}>
                        <Link className='px-0'
                        style={{textDecoration:'none'}}
                            to={`/news/${item._id}`}>
                            <p
                                style={{ color: '#333' }}
                                className={`${styles.pass}`}
                            >
                                {filterTitle(item.data.html)}
                            </p>
                            <div className=''>
                                <div className='px-0 text-center' style={{ margin: '0 auto', width: '300px' }}>
                                    <ConvertHTML html={imgFilter(item.data.html)} />
                                </div>
                            </div>
                        </Link>
                    </div>)}
            </Slider>
        </div>
    )
}

export default Carousel