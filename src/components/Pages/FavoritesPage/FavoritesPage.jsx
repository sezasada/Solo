import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './FavoritesPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';

function FavoritesList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
    const favorites = useSelector((store) => store.earningsReducer.favorites);
    const earnings = useSelector((store) => store.earningsReducer.earnings);
    const selectedSymbol = useSelector((store) => store.earningsReducer.selectedSymbol) || '';
    const selectedStockData = useSelector((store) => store.earningsReducer.selectedStockData);
    const watchlistName = useSelector((store) => store.earningsReducer.watchlistName);
    const watchlistsTickers = useSelector(store => store.earningsReducer.watchlistsTickers);
    const newData = useSelector(state => state.earningsReducer.newData);
    const [tickers, setTickers] = useState([]);
    const [selectedEarnings, setSelectedEarnings] = useState([]);
    const [newWatchlistName, setNewWatchlistName] = useState('Watchlist');
    const [showInput, setShowInput] = useState(false); 
    const [newsReport, setNewsReport] = useState([]);
    const [tickerInfo, setTickerInfo] = useState({});

    useEffect(() => {
        console.log(user);
        if (user.id) {
            dispatch({ type: 'FETCH_WATCHLIST_NAME', payload: user.id });
            dispatch({ type: "FETCH_WATCHLIST_STOCKS" })

            setInterval(() => {
                dispatch({type: "FETCH_WATCHLIST_STOCKS"})
            }, 5000);
        }
    }, []);

    const handleTickerClick = (ticker) => {
        const filteredEarnings = earnings.filter((earning) => earning.symbol === ticker);
        setSelectedEarnings(filteredEarnings);
        dispatch({ type: 'SET_SELECTED_SYMBOL', payload: ticker });
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

    console.log('selectedStockData', selectedStockData)
    return (
        <div className="favorites-container">
            <div className="favorites">
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
                    <div>
                        <div
                            className="name-div text-center bg-dark"
                            style={{ borderBottom: "1px solid grey" }}
                        >
                            <h4 style={{ width: "100%" }} className="d-inline-block text-white p-2 text-center">
                                {watchlistName}
                            </h4>
                            <span onClick={() => setShowInput(true)}>
                                <FontAwesomeIcon
                                    icon={faPenToSquare}
                                    className="fa-pen-to-square"
                                />
                            </span>
                        </div>
                    </div>
                )}
                {watchlistsTickers && watchlistsTickers.length > 0 ? (
                    <div>
                        {watchlistsTickers.map((stock) => (
                            <div key={stock.ticker} onClick={() => handleTickerClick(stock.ticker)}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid grey', paddingTop: '5px', paddingBottom: '5px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: '10px' }}>
                                        <h7>{stock.ticker}</h7>
                                        <div style={{ fontSize: '13px' }}>{stock.name}{" "}</div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', paddingRight: '10px' }}>
                                        <span style={{ color: stock.price && stock.changesPercentage ? (stock.changesPercentage > 0 ? 'green' : 'red') : 'black' }}>
                                            {stock.price ? stock.price.toFixed(2) : '-'}
                                        </span>
                                        <span style={{ color: stock.price && stock.changesPercentage ? (stock.changesPercentage > 0 ? 'green' : 'red') : 'black' }}>
                                            {stock.changesPercentage ? `(${stock.changesPercentage.toFixed(2)}%)` : ''}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No tickers in watchlist.</p>
                )}
            </div>
        </div>
    );



}

export default FavoritesList;
