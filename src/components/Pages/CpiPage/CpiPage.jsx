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

    // Split the data into two halves
    const half = Math.ceil(cpiData.length / 2);
    const cpiDataFirstHalf = cpiData.slice(0, half);
    const cpiDataSecondHalf = cpiData.slice(half);

    const stats = {
        lastValue: '4.05%',
        latestPeriod: 'May 2023',
        lastUpdated: 'Jun 13 2023, 08:33 EDT',
        nextRelease: 'Jul 12 2023, 08:30 EDT',
        longTermAverage: '3.28%',
        averageGrowthRate: '-9.78%',
        valueFromLastMonth: '4.93%',
        changeFromLastMonth: '-17.90%',
        valueFromOneYearAgo: '8.58%',
        changeFromOneYearAgo: '-52.83%',
        frequency: 'Monthly',
        unit: 'Percent Index 1982-84=100',
        adjustment: 'Seasonally Adjusted',
        downloadSourceFile: 'Upgrade',
        notes: 'All urban consumers, all items.'
    }

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

                        {Object.entries(stats).map(([key, value], index) => (
                            <div className="row" key={index}>
                                <div className="columnss">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                                <div className="columnss">{value}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CpiPage;