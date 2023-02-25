import { put, takeEvery } from 'redux-saga/effects';

function* fetchMarketNews() {
    try {
        const response = yield fetch('/api/marketNews/marketNews');
        const data = yield response.json();
        yield put({ type: 'SET_MARKET_NEWS', payload: data });
    } catch (error) {
        console.log('Error fetching earnings', error);
    }
}


function* watchFetchMarketNews() {
    yield takeEvery('FETCH_MARKET_NEWS', fetchMarketNews);
}

export default watchFetchMarketNews;