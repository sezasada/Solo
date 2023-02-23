import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';

function* setWatchlistName(action) {
    const { payload } = action;

    try {
        yield call(axios.put, `/api/watchlist/${payload.userId}`, { name: payload.name });

        yield put({ type: 'SET_WATCHLIST_NAME_SUCCESS', payload: payload.name });
    } catch (error) {
        yield put({ type: 'SET_WATCHLIST_NAME_ERROR', payload: error.message });
    }
}

function* fetchWatchlistName(action) {
    const { payload } = action;

    try {
        const response = yield call(axios.get, `/api/watchlist/${payload}`);

        yield put({ type: 'SET_WATCHLIST_NAME_SUCCESS', payload: response.data.name });
    } catch (error) {
        yield put({ type: 'SET_WATCHLIST_NAME_ERROR', payload: error.message });
    }
}

export function* watchSetWatchlistName() {
    yield takeLatest('SET_WATCHLIST_NAME', setWatchlistName);
}

export function* watchFetchWatchlistName() {
    yield takeLatest('FETCH_WATCHLIST_NAME', fetchWatchlistName);
}


