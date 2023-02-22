import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function FavoritesList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.earningsReducer.favorites);
    const earnings = useSelector(state => state.earningsReducer.earnings);
    const selectedSymbol = useSelector(state => state.earningsReducer.selectedSymbol);
    const selectedPrice = useSelector((state) => state.earningsReducer.selectedPrice);
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
        dispatch({ type: 'FETCH_STOCK_PRICE', payload: ticker });
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
    useEffect(() => {
        const intervalId = setInterval(() => {
            dispatch({ type: 'FETCH_STOCK_PRICE', payload: selectedSymbol });
        }, 5000); // fetch new price every 5 seconds
        return () => clearInterval(intervalId);
    }, [selectedPrice]);
    return (
        <div>
            <div id="favorites">
                <h2>Watchlist:</h2>
                <hr />
                {tickers && tickers.length > 0 ? (
                    <ul>
                        {tickers.map((ticker) => (
                            <li key={ticker} onClick={() => handleTickerClick(ticker)}>
                                <div id="stock">
                                    {ticker} {selectedSymbol === ticker && selectedPrice && <span>Price: {selectedPrice}</span>}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p></p>
                )}
            </div>

        </div>
    );
}

export default FavoritesList;