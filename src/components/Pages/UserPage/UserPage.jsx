import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import News from '../../Shared/News/News';
import FavoritesPage from '../FavoritesPage/FavoritesPage';
import axios from 'axios';
import './UserPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TickerBar from '../../Shared/TickerBar/TickerBar';

function UserPage() {
  const user = useSelector(store => store.user);
  const earnings = useSelector(store => store.earningsReducer.earnings);
  const selectedSymbol = useSelector(store => store.earningsReducer.selectedSymbol) || '';
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
  const [numNewsArticles, setNumNewsArticles] = useState(2);
  const originalNewsLength = selectedStocksNews?.length;
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    setIsFavorite(Array.isArray(favorites) && favorites.some(favorite => favorite.ticker === selectedSymbol));
  }, [favorites, selectedSymbol]);

  useEffect(() => {
    dispatch({ type: 'FETCH_FAVORITES' });
  }, []);

  useEffect(() => {
    const newTickers = favorites.map((favorite) => favorite.ticker);
    setTickers(newTickers);
  }, [favorites]);

  useEffect(() => {
    if (selectedSymbol !== '') {
      setIsLoading(true);
      dispatch({ type: 'FETCH_STOCK_NEWS', payload: selectedSymbol })
      setIsLoading(false);
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
    try {
      await Promise.all([
        dispatch({ type: 'SUBMIT_SYMBOL', payload: input }),
        dispatch({ type: 'FETCH_STOCK_PRICE', payload: input }),
        dispatch({ type: 'FETCH_STOCK_NEWS', payload: input }),
        dispatch({ type: 'FETCH_STOCK_DATA', payload: input })
      ]);
    } finally {
      setIsLoading(false);
      setSymbolInput('');
    }
  };

  const handleDeleteFavorite = () => {
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

  useEffect(() => {
    const newTickers = favorites.map((favorite) => favorite.ticker);
    setTickers(newTickers);
  }, [favorites]);

  useEffect(() => {
    if (selectedSymbol !== '') {
      setIsLoading(true);
      dispatch({ type: 'FETCH_STOCK_NEWS', payload: selectedSymbol })
      setIsLoading(false);
    }
  }, [selectedSymbol]);

  useEffect(() => {
    if (selectedSymbol) {
      setIsLoading(true);
      dispatch({ type: 'FETCH_STOCK_DATA', payload: selectedSymbol })
      setIsLoading(false);
    }
  }, [selectedSymbol]);


  const selectedEarnings = earnings.filter((earning) => earning.symbol === selectedSymbol && earning.date.includes(selectedYear));

  const handleChangeYear = (event) => {
    event.preventDefault();
    setSelectedYear(event.target.value);
    dispatch({ type: 'FILTER_EARNINGS', payload: event.target.value });
  };

  const handleLoadMoreNews = async () => {
    setIsLoading(true);
    try {
      await dispatch({ type: 'FETCH_MORE_STOCK_NEWS', payload: { symbol: selectedSymbol, numArticles: numNewsArticles + 2 } });
      const displayedArticles = selectedStocksNews.slice(0, numNewsArticles);
      const newArticles = selectedStocksNews.slice(numNewsArticles).filter(article => !displayedArticles.some(displayedArticle => displayedArticle.title === article.title));
      setNumNewsArticles(numNewsArticles + newArticles.length);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bod">
      <TickerBar tickers={tickers} />
      <div className=".container-fluid">
        <div className="row ">
          <h2>Welcome, {user.username}!</h2>
          <hr />
          <div className="col-md-3" style={{ maxWidth: '300px', height: '550px' }}>
            <FavoritesPage tickers={favorites.map((favorite) => favorite.ticker)} />
          </div>
          <div className="col-md-9 ">
            <div className="w-100">
              <div>
                {selectedSymbol && selectedPrice && (
                  <div>
                    <div class="row align-items-center">
                      <div class="col-md-10">
                        <h2 style={{ fontSize: '43px', display: 'inline-flex', alignItems: 'center' }}>
                          {selectedSymbol}'s <img src={`https://storage.googleapis.com/iexcloud-hl37opg/api/logos/${selectedSymbol}.png`} alt="company logo" style={{ height: '43px', width: '43px', marginLeft: '10px' }} /> Earnings Reports
                        </h2>
                      </div>
                    </div>
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="input-group">
                    <div className="row input-row">
                      <div className="col-9">
                        <input
                          type="text"
                          className="form-control input-text-box"
                          placeholder="symbol"
                          aria-label="Text input with dropdown button"
                          name="symbolInput"
                          value={symbolInput}
                          onChange={(event) => setSymbolInput(event.target.value)}
                        />
                      </div>
                      <div className="col-3 d-flex align-items-center justify-content-end">
                        <select className="btn btn-dark mx-2" name="year" id="year" value={selectedYear} onChange={handleChangeYear} style={{ marginRight: '50px' }}>
                          <option value="">All</option>
                          <option value="2023">2023</option>
                          <option value="2022">2022</option>
                          <option value="2021">2021</option>
                          <option value="2020">2020</option>
                        </select>
                        <button type="submit" className="btn btn-dark">Submit</button>
                      </div>
                    </div>
                  </div>
                </form>
                <div className='row'>
                  <div className='col-md-6'>
                    {selectedStockData && selectedStockData.length > 0 && selectedSymbol && (
                      <div>
                        <div>
                          {selectedStockData.map((info, index) => {
                            return (
                              <div className='stock-data-div'>
                                <div key={index}>
                                  <div className="row">
                                    <div className="col-md-6">
                                      <h4>{info.name} ({selectedSymbol})</h4>
                                    </div>
                                    <div className="col-md-6 d-flex justify-content-end">
                                      <button className="btn btn-dark" onClick={isFavorite ? handleDeleteFavorite : handleAddFavorite}>
                                        {isFavorite ? `Delete ${selectedSymbol} from Watchlist` : `Add ${selectedSymbol} to Watchlist`}
                                      </button>
                                    </div>
                                  </div>
                                  <div className='row'>
                                    <div className="price-container">
                                      <h3 className="price">{info.price}</h3>
                                      <h4>({info.changesPercentage?.toFixed(2)}%)</h4>
                                    </div>
                                  </div>
                                  <hr style={{ marginTop: 5, marginBottom: 5 }} />
                                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p style={{ marginRight: 'auto' }}>Share Price:</p>
                                    <p style={{ marginLeft: 'auto' }}>{info.price}</p>
                                  </div>
                                  <hr style={{ marginTop: 5, marginBottom: 5 }} />
                                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p style={{ marginRight: 'auto' }}>Percent Price Change Today:</p>
                                    <p style={{ marginLeft: 'auto' }}>{info.changesPercentage?.toFixed(2)}%</p>
                                  </div>
                                  <hr style={{ marginTop: 5, marginBottom: 5 }} />
                                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p style={{ marginRight: 'auto' }}>Year High:</p>
                                    <p style={{ marginLeft: 'auto' }}>{info.yearHigh}</p>
                                  </div>
                                  <hr style={{ marginTop: 5, marginBottom: 5 }} />
                                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p style={{ marginRight: 'auto' }}>Year Low:</p>
                                    <p style={{ marginLeft: 'auto' }}>{info.yearLow}</p>
                                  </div>
                                  <hr style={{ marginTop: 5, marginBottom: 5 }} />
                                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p style={{ marginRight: 'auto' }}>Market Capitalization:</p>
                                    <p style={{ marginLeft: 'auto' }}>${info.marketCap.toLocaleString()}</p>
                                  </div>
                                  <hr style={{ marginTop: 5, marginBottom: 5 }} />
                                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p style={{ marginRight: 'auto' }}>Earnings Announcement:</p>
                                    <p style={{ marginLeft: 'auto' }}>{info.earningsAnnouncement?.substring(0, 10)}</p>
                                  </div>
                                  <hr style={{ marginTop: 5, marginBottom: 5 }} />
                                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <p style={{ marginRight: 'auto' }}>Today's Volume:</p>
                                    <p style={{ marginLeft: 'auto' }}>{info.volume.toLocaleString()}</p>
                                  </div>
                                  <hr style={{ marginTop: 5, marginBottom: 5 }} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='col-md-6'>
                    {selectedStocksNews && selectedStocksNews.length > 0 ? (
                      <div>
                        <h3>Recent News Articles for {selectedSymbol}:</h3>
                        <div>
                          {selectedStocksNews.slice(0, numNewsArticles).map((article, index) => (
                            <div key={index}>
                              <div>{article.title}</div>
                              <p>{article.publishedDate}</p>
                              <p><img src={article.image} alt={article.title} /></p>
                              <p>{article.site}</p>
                              <p>{article.text}</p>
                              <a href={article.url} rel="noreferrer">find out more</a>
                            </div>
                          ))}
                          {selectedStocksNews?.length > numNewsArticles && (
                            <div>
                              <button onClick={handleLoadMoreNews}>Load More News</button>
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div></div>
                    )}
                    {selectedSymbol && (
                      <div>
                        <button onClick={handleLoadMoreNews}>See New Articles</button>
                      </div>
                    )}
                  </div>
                </div>
                {Array.isArray(selectedEarnings) ? (
                  selectedEarnings.map((report, index) => {
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
                  })
                ) : (
                  <div>Loading earnings reports...</div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className='news text-center'>
          <News />
        </div>
      </div>
    </div>
  );

}
export default UserPage;
