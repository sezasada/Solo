import { put, takeEvery } from 'redux-saga/effects';

function* addFavorite(action) {
    const favorite = {
        userId: 1,
        ticker: action.payload,
    };
    try {
        const response = yield fetch('/favorites', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(favorite),
        });
        if (response.ok) {
            yield put({ type: 'ADD_FAVORITE_SUCCESS', payload: favorite });
        } else {
            yield put({ type: 'ADD_FAVORITE_ERROR', payload: 'Error adding favorite.' });
        }
        console.log('Added', favorite.ticker, 'to watchlist');
    } catch (error) {
        yield put({ type: 'ADD_FAVORITE_ERROR', payload: error.message });
    }
}
function* watchAddFavorite() {
    yield takeEvery('ADD_FAVORITE', addFavorite);
}

export default watchAddFavorite;