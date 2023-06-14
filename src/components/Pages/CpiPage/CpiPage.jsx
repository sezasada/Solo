import React from 'react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './CpiPage.css';

function CpiPage() {
    const dispatch = useDispatch();
    const cpiData = useSelector((store) => store.cpiReducer);

    useEffect(() => {
        dispatch({ type: "FETCH_CPI_DATA" });
    }, []);

    function findLatestReport(data) {
        if (!data || data.length === 0) {
            return null;
        }

        let sortedData = [...data].sort((a, b) => new Date(b.date) - new Date(a.date));
        return sortedData[0];
    }

    const latestReport = findLatestReport(cpiData);

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


    const avgCPI = longTermAverage(cpiData);

    // Split the data into two halves
    const half = Math.ceil(cpiData.length / 2);
    const cpiDataFirstHalf = cpiData.slice(0, half);
    const cpiDataSecondHalf = cpiData.slice(half);


    return (
        <div>
            <div className="title">
                <h3>US Consumer Price Index YoY </h3>
                <h4>4.05% for May 2023</h4>
            </div>
            <div className="wrapper">
                <div className="body">
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
                                    <td className="column">{data.value}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <table className="cpi-table">
                        <thead>
                            <tr>
                                <th className="column-header">Date</th>
                                <th className="column-header">Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cpiDataSecondHalf.map((data, index) => (
                                <tr key={index}>
                                    <td className="column">{new Date(data.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</td>
                                    <td className="column">{data.value}%</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="stats-table">
                        <div className="table-header">Stats</div>
                        <div className="latest-report">
                            <p className="left-value">Last Value</p>
                            <p className="right-value">{latestReport.value}%</p>
                        </div>
                        <div className="latest-report">
                            <p className="left-value">Last Period</p>
                            <p className="right-value">{new Date(latestReport.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                        </div>
                        <div className="latest-report">
                            <p className="left-value">Last Updated</p>
                            <p className="right-value">{new Date(latestReport.date).toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                        </div>
                        <div className="latest-report">
                            <p className="left-value">Next Release</p>
                            <p className="right-value">TBD</p>
                        </div>
                        <div className="latest-report">
                            <p className="left-value">Long Term Average</p>
                            <p className="right-value">{avgCPI}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CpiPage;