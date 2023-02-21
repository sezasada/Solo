import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react';

function UserPage() {
  const user = useSelector((store) => store.user);
  const earnings = useSelector(store => store.earnings);
  const selectedSymbol = useSelector(store => store.selectedSymbol);
  const favorites = useSelector(store => store.favorites);
  const dispatch = useDispatch();
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();
    const symbolInput = event.target.elements.symbolInput.value;
    dispatch({ type: 'SUBMIT_SYMBOL', payload: symbolInput });
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_EARNINGS' });
  }, []);

  const handleDeleteFavorite = () => {
    const userId = 1;
    dispatch({ type: 'DELETE_FAVORITE', payload: { userId, ticker: selectedSymbol } });
    setIsFavorite(false);
  };

  const handleAddFavorite = () => {
    dispatch({ type: 'ADD_FAVORITE', payload: selectedSymbol });
    setIsFavorite(true);
  };

  useEffect(() => {
    setIsFavorite(favorites.some(favorite => favorite.ticker === selectedSymbol)); // update state when favorites changes
  }, [favorites, selectedSymbol]);


  return (
    <div>
      <div className="container">
        <h2>Welcome, {user.username}!</h2>
        <p>Your ID is: {user.id}</p>
        <LogOutButton className="btn" />
      </div>
      <div>
        <button onClick={() => history.push("/favorites")}>Favorites Page</button>
        {selectedSymbol && (
          <div>
            <h2>Earnings Reports for: {selectedSymbol}</h2>
            {isFavorite && <button onClick={handleDeleteFavorite}>Delete from favorites</button>}
            {!isFavorite && <button onClick={handleAddFavorite}>Add to favorites</button>}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input name="symbolInput" placeholder="symbol" />
          <button type="submit">Submit</button>
        </form>
        {earnings.map((report, index) => {
          if (report.symbol !== selectedSymbol) {
            return null;
          }
          return (
            <div id="reports-container" >
              <div id="report" key={index}>
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
      </div>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
