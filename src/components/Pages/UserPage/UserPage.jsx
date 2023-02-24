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
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const [symbolInput, setSymbolInput] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [newsReport, setNewsReport] = useState([]);
  const [stockData, setStockData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (selectedSymbol) {
      fetch(`https://financialmodelingprep.com/api/v3/stock_news?tickers=${selectedSymbol}&limit=2&apikey=19198710f19b50ecd5513c63a590ad31`)
        .then(response => response.json())
        .then(data => {
          setNewsReport(data);
        })
        .catch(error => {
          console.log('Error displaying news for:', error);
        });
    }
  }, [selectedSymbol]);

  useEffect(() => {
    if (selectedSymbol) {
      const intervalId = setInterval(() => {
        fetch(`https://financialmodelingprep.com/api/v3/quote/${selectedSymbol}?apikey=19198710f19b50ecd5513c63a590ad31`)
          .then(response => response.json())
          .then(data => {
            setStockData(data);
          })
          .catch(error => {
            console.log('Error displaying news for:', error);
          });
      }, 10000); // update every 10 seconds
    }
  }, [selectedSymbol]);
  const handleSubmit = (event) => {
    event.preventDefault();
    const input = event.target.symbolInput.value;
    dispatch({ type: 'SUBMIT_SYMBOL', payload: input });
    dispatch({ type: 'FETCH_STOCK_PRICE', payload: input });
    setSymbolInput('');
    setNewsReport([]);
    setStockData([]);
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
  console.log(selectedSymbol);
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
                {selectedSymbol && (
                  <div>
                    <h2>Earnings Reports for: {selectedSymbol} {selectedPrice && <p>Price: {selectedPrice}</p>}</h2>
                    <button onClick={isFavorite ? handleDeleteFavorite : handleAddFavorite}>
                      {isFavorite ? 'Delete from Watchlist' : 'Add to Watchlist'}
                    </button>
                  </div>)}
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
                {stockData && stockData.length > 0 && (
                  <div>
                    <h5> Data For {selectedSymbol}:</h5>
                    <hr />
                    <ul>
                      {stockData.map((info, index) => (
                        <li key={index}>
                          <li>Company name: {info.name}</li>
                          <li>Share Price: {info.price}</li>
                          <li>Percent Price Change Today{info.changesPercentage}</li>
                          <li>Year High: {info.yearHigh}</li>
                          <li>Year Low: {info.yearLow}</li>
                          <li>Market Capitalization: {info.marketCap}</li>
                          <li>Earnings Announcement: {info.earningsAnnouncement}</li>
                          <li>Todays volume: {info.volume}</li>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {Array.isArray(selectedEarnings) && selectedEarnings.map((report, index) => {
                  return (
                    <div id="reports-container" key={index}>
                      <div id="report">
                        <p>Symbol {report.symbol}</p>
                        <p>Date: {report.date}</p>
                        <p>Earnings Per Share (EPS): {report.eps}</p>
                        <p>EPS Estimated: {report.epsEstimated}</p>
                        <p>Time: {report.time}</p>
                        <p>Revenue: ${report.revenue.toLocaleString()}</p>
                        <p>Revenue Estimated: ${report.revenueEstimated.toLocaleString()}</p>
                        <p>Updated From Date: {report.updatedFromDate}</p>
                        <p>Fiscal Date Ending: {report.fiscalDateEnding}</p>
                      </div>
                    </div>
                  );
                })}
                {newsReport && newsReport.length > 0 && (
                  <div>
                    <h3>Recent News Articles for {selectedSymbol}:</h3>
                    <ul>
                      {newsReport.map((article, index) => (
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