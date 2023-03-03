import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './News.css';
function News() {

    const marketNews = useSelector(store => store.earningsReducer.marketNews);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: 'FETCH_MARKET_NEWS' });
    }, []);

    const [news, setNews] = useState([]);
    useEffect(() => {
        setNews(marketNews);
    }, [marketNews]);


    return (
        <>
            <div style={{ display: 'flex', margin: '30px', borderBottom: '1px solid grey', borderTop: '1px solid grey' }}>
                {news.map((item, index) => {
                    return (
                        <div style={{ display: 'flex', flex: '1', flexDirection: 'column', marginRight: '10px', marginLeft: '10px' }}>
                            <div className="news-item" style={{ padding: '10px', height: '100%' }} key={item.news_url}>
                            <h3 style={{ width: '100%', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="d-inline-block bg-dark text-white p-2 text-center">{item.title}</h3>
                                <div className="image-container" style={{ height: '270px', marginBottom: '10px', width: '100%' }}>
                                    <img className="image" style={{ border: '1px solid grey', margin: '0 auto', width: '100%', height: '100%', objectFit: 'cover' }} src={item.image_url} alt={item.title} />
                                </div>
                                <div style={{ backgroundColor: '#343434', marginBottom: '20px', paddingTop: '10px' }}>
                                    <div className="text-container" style={{ flex: '1' }}>
                                        <p style={{ fontStyle: 'italic', paddingLeft: '5px' }} className="source">{item.source_name}</p>
                                        <h5 style={{ paddingLeft: '5px' }} className="description">{item.text}</h5>
                                        <a className="link-danger" href={item.news_url}>Watch video</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>



        </>
    );
}

export default News;