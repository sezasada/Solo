import { put, takeEvery } from 'redux-saga/effects';
function* stockPrice({ payload: symbol }) {
    try {
        const response = yield fetch(
            `https://financialmodelingprep.com/api/v3/quote/${symbol}?apikey=19198710f19b50ecd5513c63a590ad31`
        );
        const data = yield response.json();
        yield put({ type: 'SET_SELECTED_PRICE', payload: data[0].price });
    } catch (error) {
        console.log('Error fetching stock price', error);
    }
}

function* watchStockPrice() {
    yield takeEvery('FETCH_STOCK_PRICE', stockPrice);
}
export default watchStockPrice;