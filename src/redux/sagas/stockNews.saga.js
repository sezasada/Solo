import { put, takeEvery } from 'redux-saga/effects';

function* stockNews({ payload: symbol }) {
    try {
        console.log('this is data', symbol);
        const response = yield fetch(`/api/earnings/stockNews/${symbol}`);
        const data = yield response.json();
        console.log('this is data', data);
        console.log('this is response', response);
        yield put({ type: 'SET_SELECTED_NEWS', payload: data });
    } catch (error) {
        console.log('Error fetching stock news', error);
    }
}

function* watchStockNews() {
    yield takeEvery('FETCH_STOCK_NEWS', stockNews);
}

export default watchStockNews;

