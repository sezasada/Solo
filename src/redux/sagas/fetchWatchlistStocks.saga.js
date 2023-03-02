import { put, takeEvery, all } from 'redux-saga/effects';
import axios from "axios"

function* watchlistData() {
    try {
        const response = yield axios.get(`/api/favorites/stockData`);
        console.log("this is stock data",response.data)
    
            yield put({ type: 'SET_WATCHLIST_STOCKS', payload: response.data });
    } catch (error) {
        console.log('Error fetching stock news', error);
    }
}

function* watchWatchlistSaga() {
    yield takeEvery('FETCH_WATCHLIST_STOCKS', watchlistData);
}

export default function* rootSaga() {
    yield all([watchWatchlistSaga()]);
}



