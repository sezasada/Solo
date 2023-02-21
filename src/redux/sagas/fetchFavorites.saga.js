import { put, takeEvery } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';

export function* fetchFavorites(action) {
    try {
        const response = yield fetch(`api/favorites?userId=${action.payload}`);
        const text = yield call([response, 'text']);
        const data = JSON.parse(text);
        yield put({ type: 'SET_FAVORITES', payload: data });
    } catch (error) {
        console.error('Error fetching tickers', error);
    }
}

function* watchFetchTickers() {
    yield takeEvery('FETCH_FAVORITES', fetchFavorites);
}
export default watchFetchTickers;