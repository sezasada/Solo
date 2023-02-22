import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function FavoritesList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.earningsReducer.favorites);
    const earnings = useSelector(state => state.earningsReducer.earnings);
    const selectedSymbol = useSelector(state => state.earningsReducer.selectedSymbol);

    const [tickers, setTickers] = useState([]);
    const [selectedEarnings, setSelectedEarnings] = useState([]);

    useEffect(() => {
        dispatch({ type: 'FETCH_EARNINGS' });
    }, []);

    useEffect(() => {
        const fetchTickers = async () => {
            const response = await fetch('/api/favorites?userId=1');
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

    useEffect(() => {
        setTickers(favorites.map((favorite) => favorite.ticker));
    }, [favorites]);

    useEffect(() => {
        const fetchTickers = async () => {
            const response = await fetch('/api/favorites?userId=1');
            const data = await response.json();
            setTickers(data.map((favorite) => favorite.ticker));
        };
        fetchTickers();
    }, [favorites]);

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
            
        </div>
    );
}

export default FavoritesList;