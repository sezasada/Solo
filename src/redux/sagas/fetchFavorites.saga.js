import { put, takeEvery } from 'redux-saga/effects';
import { call } from 'redux-saga/effects';

export function* fetchTickers(action) {
    try {
        const response = yield fetch(`/favorites?userId=${action.payload}`);
        const text = yield call([response, 'text']);
        const data = JSON.parse(text);
        yield put({ type: 'SET_TICKERS', payload: data });
    } catch (error) {
        console.error('Error fetching tickers', error);
    }
}

function* watchFetchTickers() {
    yield takeEvery('FETCH_TICKERS', fetchTickers);
}
export default watchFetchTickers;