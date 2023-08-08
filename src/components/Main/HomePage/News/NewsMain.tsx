import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../../../../app/hooks';
import ConvertHTML from './Converter/ConvertHTML';
import News from './News';

const NewsMain = () => {
    const { news } = useAppSelector(state => state.newsPosts);

    useEffect(() => {
        setTimeout(() => window.scrollTo(0, 0), 0);
    }, [])


    return (
        <div style={{ paddingTop: '66px', paddingLeft: '0', paddingRight: '0', }}>
            <Routes>
                {news.map(item => <Route
                    key={item._id}
                    path={item._id}
                    element={<ConvertHTML html={item.data.html} key={item._id} />}
                />)}
                <Route
                    path=''
                    element={<News />} />
            </Routes>
        </div>
    )
}

export default NewsMain