import React, { useState } from "react";
import { useSelector } from "react-redux";
import "./MoneyInput.css";

const calculateInflationAdjustedValue = (value, cpiPast, cpiPresent) => {
    if (!cpiPast || !cpiPresent) {
        return "Data not available";
    }

    // Calculate the inflation-adjusted value
    const adjustedValue = value * (parseFloat(cpiPresent) / parseFloat(cpiPast));
    return adjustedValue.toFixed(2);
};

const findCpiForYear = (data, year) => {
    const foundCpiData = data.find(data => new Date(data.date).getFullYear() === year);
    return foundCpiData ? foundCpiData.value : null;
};

function MoneyInput() {
    const [amount, setAmount] = useState(0);
    const startYear = 2019; // We no longer need this to be a state variable since it is not going to change.
    const cpiData = useSelector((store) => store.cpiReducer);
    const currentYear = new Date().getFullYear();

    if (!cpiData) {
        return <div>Loading...</div>
    }

    const cpiStart = findCpiForYear(cpiData, startYear);

    let dollarValues = {};

    for (let year = startYear; year <= currentYear; year++) {
        const cpiEnd = findCpiForYear(cpiData, year);
        const adjustedValue = calculateInflationAdjustedValue(amount, cpiStart, cpiEnd);
        dollarValues[year] = adjustedValue;
    }

    return (
        <div className="cpi-calc">
            <div className="title">
                <h2>Value of US Dollar Accounting for Inflation</h2>
            </div>
            <div className="input-body">
                <input type="number" placeholder="Enter $ Amount" onChange={(e) => setAmount(e.target.value)} />
            </div>
            <div className="statistic-body">
                <div><span className="amount">${amount}</span> in {startYear} has the same buying power as</div>
                <div><span className="dollarValues">${dollarValues[currentYear]}</span> in {currentYear}</div>
            </div>
        </div>
    );
}

export default MoneyInput;
