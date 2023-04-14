import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* handleSubmit(action) {
  const searchTerm = action.payload;
  let symbol = null;
  try {
    // Fetch company details using the search term
    const response = yield axios.get(`api/earnings/stockData/${searchTerm}`);
    
    if (response.data.length === 0) {
      throw new Error("No results found");
    }

    // Find the first matching company with the same symbol or name as the search term
    const foundCompany = response.data.find(
      (company) =>
        company.symbol === searchTerm.toUpperCase() ||
        company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (foundCompany) {
      symbol = foundCompany.symbol;
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.log("Error fetching company details:", error);
    yield put({ type: "FETCH_EARNINGS_ERROR", payload: { error: error.message } });
    yield put({ type: "RESET_DATA" });
    return;
  }

  yield put({ type: "SET_SELECTED_SYMBOL", payload: symbol });
  yield put({ type: "FETCH_EARNINGS" });
}

function* watchSubmitSymbol() {
  yield takeEvery("SUBMIT_SYMBOL", handleSubmit);
}

export default watchSubmitSymbol;
