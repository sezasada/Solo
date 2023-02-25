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
            <div className="news-container">
                {news.map((item, index) => {
                    if (index === 0) {
                        return (<>
                            <div className="news-item" key={item.news_url}>
                                <div className="image-container">
                                    <img className="image" src={item.image_url} alt={item.title} />
                                </div>
                                <div className="text-container">
                                    <h2 className="title">{item.title}</h2>
                                    <p className="description">{item.text}</p>
                                    <p className="source">{item.source_name}</p>
                                    <a className="link" href={item.news_url}>Watch video</a>
                                </div>
                            </div></>)
                    } else {
                        return (
                            <div className="news-item" key={item.news_url}>
                                <div className="image-container">
                                    <img className="image" src={item.image_url} alt={item.title} />
                                </div>
                                <div className="text-container">
                                    <h2 className="title">{item.title}</h2>
                                    <p className="description">{item.text}</p>
                                    <p className="source">{item.source_name}</p>
                                    <a className="link" href={item.news_url}>Watch video</a>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </>
    );
}

export default News;