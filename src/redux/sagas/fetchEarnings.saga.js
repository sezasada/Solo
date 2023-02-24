import { put, takeEvery } from 'redux-saga/effects';

function* fetchEarnings() {
    try {
        const response = yield fetch('/api/earnings/earnings');
        const data = yield response.json();
        yield put({ type: 'SET_EARNINGS', payload: data });
    } catch (error) {
        console.log('Error fetching earnings', error);
    }
}


function* watchFetchEarnings() {
    yield takeEvery('FETCH_EARNINGS', fetchEarnings);
}

export default watchFetchEarnings;