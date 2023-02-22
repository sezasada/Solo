import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';
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

  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const input = event.target.symbolInput.value;
    dispatch({ type: 'SUBMIT_SYMBOL', payload: input });
    dispatch({ type: 'FETCH_STOCK_PRICE', payload: input });
    setSymbolInput('');
  };

  const handleDeleteFavorite = () => {
    const userId = user.id;
    dispatch({ type: 'DELETE_FAVORITE', payload: { userId, ticker: selectedSymbol } });
    dispatch({ type: 'FETCH_FAVORITES' });
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

  const selectedEarnings = earnings.filter((earning) => earning.symbol === selectedSymbol);

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
                      {isFavorite ? 'Delete from Favorites' : 'Add to Favorites'}
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
                    </div>)
                })}
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

// this allows us to use <App /> in index.js
export default UserPage;
