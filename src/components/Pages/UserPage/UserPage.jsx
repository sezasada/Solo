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
  const favorites = useSelector(store => store.earningsReducer.favorites);
  console.log("this is favorites", favorites);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();


  const handleSubmit = (event) => {
    event.preventDefault();
    const symbolInput = event.target.symbolInput.value;
    dispatch({ type: 'SUBMIT_SYMBOL', payload: symbolInput });
  };
  const handleDeleteFavorite = () => {
    const userId = user.id;
    dispatch({ type: 'DELETE_FAVORITE', payload: { userId, ticker: selectedSymbol } });
    dispatch({ type: "FETCH_FAVORITES" })
  };

  const handleAddFavorite = () => {
    dispatch({ type: 'ADD_FAVORITE', payload: selectedSymbol });
  };
  useEffect(() => {
    setIsFavorite(Array.isArray(favorites) && favorites.some(favorite => favorite.ticker === selectedSymbol));
  }, [favorites, selectedSymbol]);

  useEffect(() => {
    dispatch({ type: "FETCH_FAVORITES" })
  }, [])


  return (
    <div id="bod">
      <div class="container">
        <div className="row">
          <h2>Welcome, {user.username}!</h2>
          <hr />
          <div class="col-md-3">
            <FavoritesPage />
          </div>
          <div class="col-md-9 pl-0 pr-0">
            <div class="w-100">
              <div>
                {selectedSymbol && (
                  <div>
                    <h2>Earnings Reports for: {selectedSymbol}</h2>
                    <button onClick={isFavorite ? handleDeleteFavorite : handleAddFavorite}>{isFavorite ? "Delete from Favorites" : "Add to Favorites"}</button>
                    {/* {isFavorite && <button onClick={handleDeleteFavorite}>Delete from favorites</button>}
            {!isFavorite && <button onClick={handleAddFavorite}>Add to favorites</button>} */}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <input name="symbolInput" placeholder="symbol" />
                  <button type="submit">Submit</button>
                </form>
                {Array.isArray(earnings) && earnings.map((report, index) => {
                  // console.log(report.symbol, selectedSymbol)
                  if (report.symbol !== selectedSymbol) {
                    return null;
                  }
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
      </div>
      <div className='news text-center'>
        <News />
      </div>
    </div>

  );
}

// this allows us to use <App /> in index.js
export default UserPage;
