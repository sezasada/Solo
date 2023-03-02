import { put, takeEvery } from 'redux-saga/effects';

function* watchlistData({ payload: symbol }) {
    try {
        console.log('stock data:', symbol);
        const response = yield fetch(`/api/favorites/stockData/${symbol}`);
        const data = yield response.json();
        console.log('stock data', response);
        console.log('stock data:', data);
        yield put({ type: 'SET_WATCHLIST_STOCKS', payload: data });
        console.log('stock data', data);
    } catch (error) {
        console.log('Error fetching stock news', error);
    }
}

function* watchWatchlistSaga() {
    yield takeEvery('FETCH_WATCHLIST_STOCKS', watchlistData);
}

export default watchWatchlistSaga;

