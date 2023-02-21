import { put, takeEvery } from 'redux-saga/effects';

function* deleteFavorite(action) {
    const { userId, ticker } = action.payload;
    try {
        const response = yield fetch(`/api//favorites/${userId}/${ticker}`, {
            method: 'DELETE',
        });
        if (response.ok) {
            yield put({ type: 'DELETE_FAVORITE_SUCCESS', payload: ticker });
        } else {
            yield put({ type: 'DELETE_FAVORITE_ERROR', payload: 'Error deleting favorite.' });
        }
        console.log('Deleted', ticker, 'from watchlist');
    } catch (error) {
        yield put({ type: 'DELETE_FAVORITE_ERROR', payload: error.message });
    }
}

function* watchDeleteFavorite() {
    yield takeEvery('DELETE_FAVORITE', deleteFavorite);
}

export default watchDeleteFavorite;