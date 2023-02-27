import { takeEvery, put } from "redux-saga/effects";
function* fetchMoreStockNews({ payload: { symbol, numArticles } }) {
    try {
        const response = yield fetch(`/api/earnings/stockNews/${encodeURIComponent(symbol)}?numArticles=${numArticles}`);
        const data = yield response.json();
        yield put({ type: 'SET_SELECTED_STOCK_NEWS', payload: data });
    } catch (error) {
        console.log('Error fetching stock news', error);
    }
}

function* watchFetchStockNews() {
    yield takeEvery('FETCH_MORE_STOCK_NEWS', fetchMoreStockNews);
}

export default watchFetchStockNews;