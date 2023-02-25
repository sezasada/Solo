import { put, takeEvery } from 'redux-saga/effects';

function* stockData({ payload: symbol }) {
    try {
        console.log('stock data:', symbol);
        const response = yield fetch(`/api/earnings/stockData/${symbol}`);
        const data = yield response.json();
        console.log('stock data', response);
        console.log('stock data:', data);
        yield put({ type: 'SET_SELECTED_STOCK_DATA', payload: data });
        console.log('stock data', data);
    } catch (error) {
        console.log('Error fetching stock news', error);
    }
}

function* watchStockData() {
    yield takeEvery('FETCH_STOCK_DATA', stockData);
}

export default watchStockData;

