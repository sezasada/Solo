import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './FavoritesPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-regular-svg-icons';
import { faCheckCircle } from '@fortawesome/free-regular-svg-icons'

// Watchlist component

function FavoritesList() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((store) => store.user);
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
        dispatch({ type: 'UPDATE_TICKERS' });
    }, []);
    useEffect(() => {
        console.log(user);
        if (user.id) {
            dispatch({ type: 'FETCH_WATCHLIST_NAME', payload: user.id });
            dispatch({ type: 'FETCH_WATCHLIST_STOCKS' });
        }
    }, []);
    useEffect(() => {
        const intervalId = setInterval(() => {
            if (newData) {
                dispatch({ type: 'FETCH_WATCHLIST_STOCKS' });
            }
        }, 5000);

        return () => clearInterval(intervalId);
    }, [newData]);

    const handleTickerClick = (ticker) => {
        const filteredEarnings = earnings.filter((earning) => earning.symbol === ticker);
        setSelectedEarnings(filteredEarnings);
        dispatch({ type: 'SET_SELECTED_SYMBOL', payload: ticker });
    };

    const handleSaveWatchlistName = (event) => {
        event.preventDefault();
        dispatch({ type: 'SET_WATCHLIST_NAME', payload: { userId: user.id, watchlistName: newWatchlistName } });
        setShowInput(false);
        setNewWatchlistName('');

    };

    return (
        <div className="favorites-container">
            <div className="favorites">
                {showInput ? (
                    <form onSubmit={handleSaveWatchlistName}>
                        <div className='name-div text-center bg-dark' style={{ borderBottom: '1px solid grey' }}>
                            <input
                                className='name-div text-center bg-dark'
                                style={{ color: 'white', height: '40px', fontSize: '25px', width: '100%', border: 'none', outline: 'none' }}
                                type="text"
                                placeholder='Insert New Name'
                                value={newWatchlistName}
                                onChange={(event) => setNewWatchlistName(event.target.value)}
                            />
                            <span onClick={handleSaveWatchlistName}>
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    className="fa-pen-to-square"
                                    style={{ color: 'white', fontSize: '22px', marginLeft: '10px', cursor: 'pointer' }}
                                />
                            </span>
                        </div>
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
                                    style={{ color: 'white' }}
                                    className="fa-pen-to-square"
                                />
                            </span>
                        </div>
                    </div>
                )}

                {watchlistsTickers.map((stock) => (
                    <div key={stock.ticker} onClick={() => handleTickerClick(stock.ticker)}>
                        <div className="ticker" style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid grey", paddingTop: "5px", paddingBottom: "5px" }}>
                            <div className='thisisit' style={{ display: "flex", flexDirection: "column", paddingLeft: "10px" }}>
                                <h7 className='tick' >{stock.ticker}</h7>
                                <div className="company-name" style={{ fontSize: "13px" }}>
                                    {stock.name}{" "}
                                </div>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", paddingRight: "10px" }}>
                                <span style={{ color: stock.price && stock.changesPercentage ? (stock.changesPercentage > 0 ? "green" : "red") : "black" }}>
                                    {stock.price ? stock.price.toFixed(2) : "-"}
                                </span>
                                <span style={{ color: stock.price && stock.changesPercentage ? (stock.changesPercentage > 0 ? "green" : "red") : "black" }}>
                                    {stock.changesPercentage ? `(${stock.changesPercentage.toFixed(2)}%)` : ""}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}


            </div>
        </div>
    );



}

export default FavoritesList;
