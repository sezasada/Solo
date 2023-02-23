import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* setWatchlistName(action) {
    const { payload } = action;

    try {
        yield call(axios.put, `/api/earnings`, payload);

        yield put ({ type: 'FETCH_WATCHLIST_NAME', payload: payload.userId });
    } catch (error) {
        console.log('Error in setting the watchlist name', error);
    }
}
function* fetchWatchlistName(action) {
    try {
        
        const response = yield call(axios.get, `/api/earnings/${action.payload}`);
        yield console.log(response);
        yield put({ type: 'FETCH_WATCHLIST_NAME_SUCCESS', payload: response.data });
    } catch (error) {
        console.log('Error in fetching watchlist name', error);
    }
}

export function* watchSetWatchlistName() {
    yield takeLatest('SET_WATCHLIST_NAME', setWatchlistName);
}

export function* watchFetchWatchlistName() {
    yield takeLatest('FETCH_WATCHLIST_NAME', fetchWatchlistName);
}


