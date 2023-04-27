import { put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* fetchEarnings() {
  try {
    const response = yield axios.get('/api/earnings/earnings');
    const data = response.data;
    yield put({ type: 'SET_EARNINGS', payload: data });
  } catch (error) {
    console.log('Error fetching earnings', error);
  }
}

function* watchFetchEarnings() {
  yield takeEvery('FETCH_EARNINGS', fetchEarnings);
}

export default watchFetchEarnings;
