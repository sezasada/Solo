import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CpiPage.css';
import MoneyInput from './MoneyInput/MoneyInput';
import TickerBar from '../../Shared/TickerBar/TickerBar';
function CpiPage() {
    const dispatch = useDispatch();
    const cpiData = useSelector((store) => store.cpiReducer);
    const watchlistsTickers = useSelector((store) => store.earningsReducer.watchlistsTickers);

    useEffect(() => {
        dispatch({ type: "FETCH_CPI_DATA" });
    }, []);

    const favorites = watchlistsTickers.map((stock) => stock.ticker);
    const avgCPI = cpiData && cpiData.length > 0 ? longTermAverage(cpiData) : 'Loading...';
    const cagr = cpiData && cpiData.length > 1 ? CAGR(cpiData) : 'Loading...';
    const percentChange = cpiData && cpiData.length > 1 ? calculatePercentChange(cpiData) : 'Loading...';
    const annualPercentChange = cpiData && cpiData.length > 12 ? calculateAnnualPercentChange(cpiData) : 'Loading...';
    const valueOneYearAgo = cpiData && cpiData.length > 12 ? findValueOneYearAgo(cpiData) : 'Loading...';
    const nextRelease = cpiData && cpiData.length > 0 ? findNextRelease(cpiData) : 'Loading...';
    const latestReport = cpiData && cpiData.length > 0 ? findLatestReport(cpiData) : null;
    const secondLatestReport = cpiData && cpiData.length > 1 ? findSecondLatestReport(cpiData) : null;

    function findLatestReport(data) {
        if (!data || data.length === 0) {
            return null;
        }

        let sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
        return sortedData[0];
    }


    function longTermAverage(data) {
        if (!data || data.length === 0) {
            return null;
        }

        let total = 0;
        for (let i = 0; i < data.length; i++) {
            total += parseFloat(data[i].value);
        }

        return (total / data.length).toFixed(2);
    }


    // Compound annual growth rate

    function CAGR(data) {
        if (!data || data.length < 2) {
            return null;
        }

        let startValue = parseFloat(data[0].value);
        let endValue = parseFloat(data[data.length - 1].value);

        let years = data.length / 12;

        let cagr = ((Math.pow((endValue / startValue), (1 / years))) - 1) * 100;

        return cagr.toFixed(2);
    }


    // Last report 

    function findSecondLatestReport(data) {
        if (!data || data.length < 2) {
            return null;
        }

        let sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
        return sortedData[1];
    }

    // Change from last month

    function calculatePercentChange(data) {
        if (!data || data.length < 2) {
            return null;
        }

        let sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));

        let currentMonthValue = sortedData[0].value;
        let previousMonthValue = sortedData[1].value;

        let percentChange = ((currentMonthValue - previousMonthValue) / previousMonthValue) * 100;

        return percentChange.toFixed(2);
    }


    // Change from one year ago 

    function calculateAnnualPercentChange(data) {
        if (!data || data.length < 13) {
            return null;
        }

        let sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));

        let currentMonthValue = sortedData[0].value;
        let previousYearValue = sortedData[12].value; // Get the value from 12 months ago

        let percentChange = ((currentMonthValue - previousYearValue) / previousYearValue) * 100;

        return percentChange.toFixed(2);
    }


    // Value from one year ago 
    function findValueOneYearAgo(data) {
        if (!data || data.length < 13) {
            return null;
        }

        let sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));

        let previousYearValue = sortedData[12].value; // Get the value from 12 months ago

        return previousYearValue;
    }


    // Next Months CPI Release
    function findNextRelease(data) {
        if (!data || data.length === 0) {
            return null;
        }

        let sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
        let latestDate = new Date(sortedData[0].date);

        let nextMonth = new Date(latestDate.getFullYear(), latestDate.getMonth() + 1 + 1, 0); // +1 for next month, +1 as JS months are zero-based

        return nextMonth;
    }


    // Split the data into two halves
    const half = Math.ceil(cpiData.length / 2);
    const cpiDataFirstHalf = cpiData.slice(0, half);
    const cpiDataSecondHalf = cpiData.slice(half);


    return (
        <div className="master">
            <TickerBar favorites={favorites} />

            <div className="title">
                <h3>US Consumer Price Index YoY </h3>
                <h4>4.05% for May 2023</h4>
            </div>
            <div className="wrapper">
                <div className="body">
                    <div className="table-section">
                        <div className="table-title">
                            <p className="Historical-Data">Historical Data</p>
                        </div>
                        <div className="tables-wrapper">
                            <table className="cpi-table">
                                <thead className="theads">
                                    <tr className="tablerows">
                                        <th className="column-header">Date</th>
                                        <th className="column-header2">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cpiDataFirstHalf.map((data, index) => (
                                        <tr key={index}>
                                            <td className="column">{new Date(data.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</td>
                                            <td className="column2">{data.value}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <table className="cpi-table">
                                <thead>
                                    <tr>
                                        <th className="column-header">Date</th>
                                        <th className="column-header2">Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cpiDataSecondHalf.map((data, index) => (
                                        <tr key={index}>
                                            <td className="column">{new Date(data.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</td>
                                            <td className="column2">{data.value}%</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="stats-table">
                        <div className="table-title2">
                            <p className="table-header">Stats</p>
                        </div>
                        <div className="stats-data">
                            <div className="latest-report">
                                <p className="left-value">Last Value</p>
                                <p className="right-value">{latestReport ? `${latestReport.value}%` : 'Loading...'}</p>
                            </div>
                            <div className="latest-report">
                                <p className="left-value">Last Period</p>
                                <p className="right-value">{latestReport ? new Date(latestReport.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : 'Loading...'}</p>
                            </div>
                            <div className="latest-report">
                                <p className="left-value">Last Updated</p>
                                <p className="right-value">{latestReport ? new Date(latestReport.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Loading...'}</p>
                            </div>
                            <div className="latest-report">
                                <p className="left-value">Next Release</p>
                                <p className="right-value">{new Date(nextRelease).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>

                            <div className="latest-report">
                                <p className="left-value">Long Term Average</p>
                                <p className="right-value">{avgCPI}%</p>
                            </div>
                            <div className="latest-report">
                                <p className="left-value">Annual Growth Rate</p>
                                <p className="right-value">{cagr}%</p>
                            </div>
                            <div className="latest-report">
                                <p className="left-value">Value from Last Month</p>
                                <p className="right-value">{secondLatestReport ? `${secondLatestReport.value}%` : 'Loading...'}</p>
                            </div>
                            <div className="latest-report">
                                <p className="left-value">Change from Last Month</p>
                                <p className="right-value">{percentChange}%</p>
                            </div>
                            <div className="latest-report">
                                <p className="left-value">Value from 1 Year Ago</p>
                                <p className="right-value">{valueOneYearAgo}%</p>
                            </div>

                            <div className="latest-report">
                                <p className="left-value">Change from 1 Year Ago</p>
                                <p className="right-value">{annualPercentChange}%</p>
                            </div>
                            <div className="latest-report">
                                <p className="left-value">Frequency</p>
                                <p className="right-value">Monthly</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <MoneyInput />
        </div>
    );
}

export default CpiPage;