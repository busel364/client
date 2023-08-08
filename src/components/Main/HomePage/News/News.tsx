import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../app/hooks';
import { getNews } from '../../../../reducers/AsyncActions/NewsActions';
import ConvertHTML from './Converter/ConvertHTML';
import styles from '../../Panels/modules/panels.module.css'
import { Link } from 'react-router-dom';
import { filterTitle, imgFilter } from '../../../../utils/utils';

const News = () => {

    const dispatch = useAppDispatch();

    const { news } = useAppSelector(state => state.newsPosts);

    useEffect(() => {
        dispatch(getNews());
    }, [])

    return (
        <div className='px-0 '>
            <h1
                className='text-center pt-4'
                style={{ fontSize: '2.5rem', fontWeight: '100', color: 'whitesmoke' }}
            >
                חדשות
            </h1>
            <div className='container-fluid row col-12 m-0 p-0 w-100 pb-5' >
                {news.map(item => <div className='col-sm-12 col-md-6 col-lg-6 col-xl-4 container text-end pt-3 px-0 row' key={item._id} style={{margin:'0 auto'}}>
                    {/* <div style={{margin:'0 auto'}}> */}
                        <div className='px-0 py-4 text-center'>
                            <Link
                                style={{ color: 'whitesmoke' }}
                                className={`${styles.pass}`}
                                to={`/news/${item._id}`}
                            >
                                {filterTitle(item.data.html)}
                            </Link>
                        </div>
                        <div className='px-0' style={{width:'310px',margin:'0 auto'}}>
                            <ConvertHTML html={imgFilter(item.data.html)} />
                        </div>
                    {/* </div> */}
                </div>)}
            </div>
        </div>
    )
}

export default News