import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import News from '../../Shared/News/News';
import FavoritesPage from '../FavoritesPage/FavoritesPage';
import './UserPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function UserPage() {
  const user = useSelector(store => store.user);
  const earnings = useSelector(store => store.earningsReducer.earnings);
  const selectedSymbol = useSelector(store => store.earningsReducer.selectedSymbol);
  const selectedPrice = useSelector(store => store.earningsReducer.selectedPrice);
  const favorites = useSelector(store => store.earningsReducer.favorites);
  const selectedStocksNews = useSelector(store => store.earningsReducer.selectedStocksNews);
  const selectedStockData = useSelector(store => store.earningsReducer.selectedStockData);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [symbolInput, setSymbolInput] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (selectedSymbol !== '') {
      setIsLoading(true);
      dispatch({ type: 'FETCH_STOCK_NEWS', payload: selectedSymbol })
      setIsLoading(false)
    }
  }, [selectedSymbol]);
  
  useEffect(() => {
    if (selectedSymbol) {
      setIsLoading(true);
      dispatch({ type: 'FETCH_STOCK_DATA', payload: selectedSymbol })
      setIsLoading(false);
    }
  }, [selectedSymbol]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const input = event.target.symbolInput.value;
    setIsLoading(true);
    await Promise.all([
      dispatch({ type: 'SUBMIT_SYMBOL', payload: input }),
      dispatch({ type: 'FETCH_STOCK_PRICE', payload: input }),
      dispatch({ type: 'FETCH_STOCK_NEWS', payload: input }),
      dispatch({ type: 'FETCH_STOCK_DATA', payload: input })
    ]);
    setIsLoading(false);
    setSymbolInput('');
  };

  const handleDeleteFavorite = () => {
    const userId = user.id;
    dispatch({ type: 'DELETE_FAVORITE', payload: { userId: user.id, ticker: selectedSymbol } });
  };

  const handleAddFavorite = () => {
    dispatch({ type: 'ADD_FAVORITE', payload: selectedSymbol });
  };

  useEffect(() => {
    setIsFavorite(Array.isArray(favorites) && favorites.some(favorite => favorite.ticker === selectedSymbol));
  }, [favorites, selectedSymbol]);

  useEffect(() => {
    dispatch({ type: 'FETCH_FAVORITES' });
  }, []);

  const selectedEarnings = earnings.filter((earning) => earning.symbol === selectedSymbol && earning.date.includes(selectedYear));

  const handleChangeYear = (event) => {
    setSelectedYear(event.target.value);
    dispatch({ type: 'FILTER_EARNINGS', payload: event.target.value });
  };

  return (
    <div id="bod">
      <div className="container">
        <div className="row">
          <h2>Welcome, {user.username}!</h2>
          <hr />
          <div className="col-md-3">
            <FavoritesPage />
          </div>
          <div className="col-md-9 pl-0 pr-0">
            <div className="w-100">
              <div>
                {selectedSymbol && selectedPrice && (
                  <div>
                    <h2>Earnings Reports for: {selectedSymbol} {selectedPrice && <p>Price: {selectedPrice}</p>}</h2>
                    <button onClick={isFavorite ? handleDeleteFavorite : handleAddFavorite}>
                      {isFavorite ? 'Delete from Watchlist' : 'Add to Watchlist'}
                    </button>
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <input
                    name="symbolInput"
                    placeholder="symbol"
                    value={symbolInput}
                    onChange={(event) => setSymbolInput(event.target.value)}
                  />
                  <button type="submit">Submit</button>
                </form>
                <div>
                  <label htmlFor="year">Year:</label>
                  <select name="year" id="year" onChange={handleChangeYear}>
                    <option value="">All</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                  </select>
                </div>
                {selectedStockData && selectedStockData.length > 0 && selectedSymbol && (
                  <div>
                    <h5> Data For {selectedSymbol}:</h5>
                    <hr />
                    <ul>
                      {selectedStockData.map((info, index) => {
                        return (
                          <li key={index}>
                            <li>Company name: {info.name}</li>
                            <li>Share Price: {info.price}</li>
                            <li>Percent Price Change Today: {info.changesPercentage?.toFixed(2)}%</li>
                            <li>Year High: {info.yearHigh}</li>
                            <li>Year Low: {info.yearLow}</li>
                            <li>Market Capitalization: ${info.marketCap.toLocaleString()}</li>
                            <li>Earnings Announcement: {info.earningsAnnouncement?.substring(0, 10)}</li>
                            <li>Todays volume: {info.volume.toLocaleString()}</li>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                )}
                {Array.isArray(selectedEarnings) ? (
                  selectedEarnings.map((report, index) => {
                    return (
                      <div id="reports-container" key={index}>
                        <div id="report">
                          <p>Symbol {report.symbol}</p>
                          <p>Date: {report.date}</p>
                          <p>Earnings Per Share (EPS): {report.eps.toFixed(2)}</p>
                          <p>EPS Estimated: {report.epsEstimated.toFixed(2)}</p>
                          <p>Time: {report.time}</p>
                          <p>Revenue: ${report.revenue.toLocaleString()}</p>
                          <p>Revenue Estimated: ${report.revenueEstimated.toLocaleString()}</p>
                          <p>Updated From Date: {report.updatedFromDate}</p>
                          <p>Fiscal Date Ending: {report.fiscalDateEnding}</p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>Loading earnings reports...</div>
                )}
                {selectedStocksNews && selectedStocksNews.length > 0 ? (
                  <div>
                    <h3>Recent News Articles for {selectedSymbol}:</h3>
                    <ul>
                      {selectedStocksNews.map((article, index) => (
                        <li key={index}>
                          <a href={article.url} rel="noreferrer">{article.title}</a>
                          <p>{article.publishedDate}</p>
                          <p><img src={article.image} alt={article.title} /></p>
                          <p>{article.site}</p>
                          <p>{article.text}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='news text-center'>
        <News />
      </div>
    </div>
  );
}
export default UserPage;