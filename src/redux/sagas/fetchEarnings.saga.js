import { put, takeEvery } from 'redux-saga/effects';

function* fetchEarnings() {
    try {
        const response = yield fetch(
            'https://financialmodelingprep.com/api/v3/earning_calendar?from=2022-12-12&to=2023-02-11&apikey=19198710f19b50ecd5513c63a590ad31'
        );
        const data = yield response.json();
        const earnings = [...data];

        const response2 = yield fetch(
            'https://financialmodelingprep.com/api/v3/earning_calendar?from=2022-10-11&to=2022-12-11&apikey=19198710f19b50ecd5513c63a590ad31'
        );
        const data2 = yield response2.json();
        const tempEarnings = [...earnings, ...data2];

        const response3 = yield fetch(
            'https://financialmodelingprep.com/api/v3/earning_calendar?from=2022-08-11&to=2022-10-10&apikey=19198710f19b50ecd5513c63a590ad31'
        );
        const data3 = yield response3.json();
        tempEarnings.push(...data3);

        const response4 = yield fetch(
            'https://financialmodelingprep.com/api/v3/earning_calendar?from=2022-06-11&to=2022-08-10&apikey=19198710f19b50ecd5513c63a590ad31'
        );
        const data4 = yield response4.json();
        tempEarnings.push(...data4);

        const response5 = yield fetch(
            'https://financialmodelingprep.com/api/v3/earning_calendar?from=2022-04-11&to=2022-06-10&apikey=19198710f19b50ecd5513c63a590ad31'
        );
        const data5 = yield response5.json();
        tempEarnings.push(...data5);

        const response6 = yield fetch(
            'https://financialmodelingprep.com/api/v3/earning_calendar?from=2022-02-11&to=2022-04-10&apikey=19198710f19b50ecd5513c63a590ad31'
        );
        const data6 = yield response6.json();
        tempEarnings.push(...data6);

        const response7 = yield fetch(
            'https://financialmodelingprep.com/api/v3/earning_calendar?from=2021-12-11&to=2022-02-10&apikey=19198710f19b50ecd5513c63a590ad31'
        );
        const data7 = yield response7.json();
        tempEarnings.push(...data7);

        const response8 = yield fetch(
            'https://financialmodelingprep.com/api/v3/earning_calendar?from=2021-10-11&to=2021-12-10&apikey=19198710f19b50ecd5513c63a590ad31'
        );
        const data8 = yield response8.json();
        tempEarnings.push(...data8);
        yield put({ type: 'SET_EARNINGS', payload: tempEarnings });
    } catch (error) {
        console.log('Error fetching earnings', error);
    }
}


function* watchFetchEarnings() {
    yield takeEvery('FETCH_EARNINGS', fetchEarnings);
}

export default watchFetchEarnings;