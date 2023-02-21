import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
function FavoritesList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites);
    const earnings = useSelector(state => state.earnings);
    const selectedSymbol = useSelector(state => state.selectedSymbol);

    const [tickers, setTickers] = useState([]);
    const [selectedEarnings, setSelectedEarnings] = useState([]);

    useEffect(() => {
        dispatch({ type: 'FETCH_EARNINGS' });
    }, []);

    useEffect(() => {
        const fetchTickers = async () => {
            const response = await fetch(`/favorites?userId=${user.id}`);
            const data = await response.json();
            setTickers(data.map((favorite) => favorite.ticker));
        };
        fetchTickers();
    }, []);

    const handleTickerClick = (ticker) => {
        console.log(ticker);
        const filteredEarnings = earnings.filter((earning) => earning.symbol === ticker);
        setSelectedEarnings(filteredEarnings);
        dispatch({ type: 'SET_SELECTED_SYMBOL', payload: ticker });
    };
    return (
        <div>
            <div id="favorites">
                <h2>Favorites:</h2>
                {tickers && tickers.length > 0 ? (
                    <ul>
                        {tickers.map((ticker) => (
                            <li key={ticker} onClick={() => handleTickerClick(ticker)}>
                                <div id="stock">
                                    {ticker}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>Loading tickers...</p>
                )}
            </div>
            <div id="back-btn">
                <button id="back" onClick={() => history.push('/')}>Previous Page</button>
            </div>
            {selectedEarnings.length > 0 && (
                <div>
                    <h2>Earnings For: {selectedSymbol}</h2>
                    {selectedEarnings.map((report) => (
                        <div id="reports-container">
                            <div id="report" key={report.date}>
                                <p>Date: {report.date}</p>
                                <p>Earnings Per Share (EPS): {report.eps}</p>
                                <p>EPS Estimated: {report.epsEstimated}</p>
                                <p>Time: {report.time}</p>
                                <p>Revenue: ${report.revenue.toLocaleString()}</p>
                                <p>Revenue Estimated: {report.revenueEstimated.toLocaleString()}</p>
                                <p>Updated From Date: {report.updatedFromDate}</p>
                                <p>Fiscal Date Ending: {report.fiscalDateEnding}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default FavoritesList;