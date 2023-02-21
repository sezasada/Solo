import { put, takeEvery } from 'redux-saga/effects';

function* handleSubmit(action) {
    const symbolInput = action.payload;
    yield put({ type: 'SET_SELECTED_SYMBOL', payload: symbolInput });
    yield put({ type: "FETCH_EARNINGS" });
}

// watcher saga to trigger the handleSubmit saga when the SUBMIT_SYMBOL action is dispatched
function* watchSubmitSymbol() {
    yield takeEvery('SUBMIT_SYMBOL', handleSubmit);
}

export default watchSubmitSymbol;