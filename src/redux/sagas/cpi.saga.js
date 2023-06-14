import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchCpiData() {
    try {
        const response = yield axios.get("/api/cpiData/CpiData");
        yield put({ type: "SET_ALL_DATA", payload: response.data });
    } catch (error) {
        console.log("Error with fetching the data:", error);
    }
}


function* cpiSaga() {
    yield takeLatest("FETCH_CPI_DATA", fetchCpiData);
}

export default cpiSaga;