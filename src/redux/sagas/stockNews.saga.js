import { put, takeEvery } from 'redux-saga/effects';
function* stockNews({ payload: symbol }) {
    try {
        const response = yield fetch(`/api/earnings/stockNews/${symbol}`);
        const data = yield response.json();
        yield put({ type: 'SET_SELECTED_NEWS', payload: data });
    } catch (error) {
        console.log('Error fetching stock news', error);
    }
}

function* watchStockNews() {
    yield takeEvery('FETCH_STOCK_NEWS', stockNews);
}

export default watchStockNews;


