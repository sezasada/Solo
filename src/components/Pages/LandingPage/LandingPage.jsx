import React, { useEffect, useState } from 'react';
import './LandingPage.css';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// CUSTOM COMPONENTS
import RegisterForm from '../RegisterPage/RegisterForm';

function LandingPage() {
  const user = useSelector(store => store.user);
  const earnings = useSelector(store => store.earningsReducer.earnings);
  const selectedSymbol = useSelector(store => store.earningsReducer.selectedSymbol);
  const dispatch = useDispatch();
  const [heading, setHeading] = useState('Welcome');
  const history = useHistory();


  const handleSubmit = (event) => {
    event.preventDefault();
    const symbolInput = event.target.symbolInput.value;
    dispatch({ type: 'SUBMIT_SYMBOL', payload: symbolInput });
  };

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <div className="container">
      <div>
        <div>
          {selectedSymbol && (
            <div>
              <h2>Earnings Reports for: {selectedSymbol}</h2>
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
      <h2>{heading}</h2>
      <div className="grid">
        <div className="grid-col grid-col_4">
          <RegisterForm />

          <center>
            <h4>Already a Member?</h4>
            <button className="btn btn_sizeSm" onClick={onLogin}>
              Login
            </button>
          </center>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
