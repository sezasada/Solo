import React, { useState, useEffect } from 'react';
import './News.css';
function News() {
    const [news, setNews] = useState([]);
    useEffect(() => {
        fetch('https://stocknewsapi.com/api/v1/category?section=general&items=3&page=1&token=9knkgcm8m9iqlnrnj0hyqumlsnpjrocziwvo31mf')
            .then(response => response.json())
            .then(data => {
                setNews(data.data); // update the component state with the API response's data array
            })
            .catch(error => {
                console.error('Error fetching API data:', error);
            });
    }, []); // run the effect only once, on component mount

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