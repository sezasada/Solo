import { put, takeEvery } from 'redux-saga/effects';

function* stockPrice({ payload: symbol }) {
    try {
        const response = yield fetch(`/api/earnings/selectedPrice/${symbol}`);
        const data = yield response.json();
        yield put({ type: 'SET_SELECTED_PRICE', payload: data });
    } catch (error) {
        console.log('Error fetching stock price', error);
    }
}

function* watchStockPrice() {
    yield takeEvery('FETCH_STOCK_PRICE', stockPrice);
}

export default watchStockPrice;