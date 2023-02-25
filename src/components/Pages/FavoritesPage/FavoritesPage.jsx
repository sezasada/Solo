import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

function FavoritesList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(store => store.user);
    const favorites = useSelector((store) => store.earningsReducer.favorites);
    const earnings = useSelector((store) => store.earningsReducer.earnings);
    const selectedSymbol = useSelector((store) => store.earningsReducer.selectedSymbol);
    const selectedPrice = useSelector((store) => store.earningsReducer.selectedPrice);
    const watchlistName = useSelector((store) => store.earningsReducer.watchlistName);
    const [tickers, setTickers] = useState([]);
    const [selectedEarnings, setSelectedEarnings] = useState([]);
    const [tickerPrices, setTickerPrices] = useState({});
    const [newWatchlistName, setNewWatchlistName] = useState('');
    const [showInput, setShowInput] = useState(false); // add state variable to track input display
    const [newsReport, setNewsReport] = useState([]);

    useEffect(() => {
        console.log(user);
        if (user.id) {
            dispatch({ type: 'FETCH_WATCHLIST_NAME', payload: user.id });
        }
    }, []);

    useEffect(() => {
        const fetchTickers = async () => {
            const response = await fetch(`/api/favorites?userId=${user.id}`);
            const data = await response.json();
            setTickers(data.map((favorite) => favorite.ticker));
        };
        fetchTickers();
    }, []);


    useEffect(() => {
        const fetchTickerPrices = async () => {
            const prices = {};
            for (const ticker of tickers) {
                try {
                    const response = await fetch(`/api/earnings/selectedPrice/${ticker}`);
                    const data = await response.json();
                    prices[ticker] = data;
                } catch (error) {
                    console.log(`Error fetching stock price for ${ticker}`, error);
                }
            }
            setTickerPrices(prices);
        };

        if (tickers.length > 0) {
            fetchTickerPrices();
            const intervalId = setInterval(fetchTickerPrices, 10000);

            return () => clearInterval(intervalId);
        }
    }, [tickers]);


    const handleTickerClick = (ticker) => {
        console.log(ticker);
        const filteredEarnings = earnings.filter((earning) => earning.symbol === ticker);
        setSelectedEarnings(filteredEarnings);
        dispatch({ type: 'SET_SELECTED_SYMBOL', payload: ticker });
        dispatch({ type: 'FETCH_STOCK_PRICE', payload: ticker });
        // dispatch({type: 'FETCH_STOCK_NEWS', payload: ticker});
        dispatch({ type: 'FETCH_STOCK_DATA', payload: ticker });

    };

    useEffect(() => {
        setTickers(favorites.map((favorite) => favorite.ticker));
    }, [favorites]);

    const handleSaveWatchlistName = (event) => {
        event.preventDefault();
        dispatch({ type: 'SET_WATCHLIST_NAME', payload: { userId: user.id, watchlistName: newWatchlistName } });
        setShowInput(false);
        setNewWatchlistName('');
    };
    return (
        <div>
            <div id="favorites">
                {showInput ? (
                    <form onSubmit={handleSaveWatchlistName}>
                        <input
                            type="text"
                            value={newWatchlistName}
                            onChange={(event) => setNewWatchlistName(event.target.value)}
                        />
                        <button type="submit">Save</button>
                    </form>
                ) : (
                    <div onClick={() => setShowInput(true)}>
                        <h2>{watchlistName}</h2>
                        <p>edit watchlist name</p>

                    </div>
                )}
                <hr />
                {tickers && tickers.length > 0 ? (
                    <ul>
                        {tickers.map((ticker) => (
                            <li key={ticker} onClick={() => handleTickerClick(ticker)}>
                                <div id="stock">
                                    {ticker}{" "}
                                    {tickerPrices[ticker] && (
                                        <span>Price: {tickerPrices[ticker]}</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No tickers in watchlist.</p>
                )}
            </div>
        </div>
    );
}
export default FavoritesList;