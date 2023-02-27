import { all } from 'redux-saga/effects';
import watchAddFavorite from './addFavorite.saga';
import watchDeleteFavorite from './deleteFavorite.saga';
import watchFetchEarnings from './fetchEarnings.saga';
import watchFetchTickers from './fetchFavorites.saga';
import loginSaga from './login.saga';
import registrationSaga from './registration.saga';
import watchStockNews from './stockNews.saga';
import watchStockPrice from './stockPrice.saga';
import watchSubmitSymbol from './symbolSubmit.saga';
import watchStockData from './stockData.saga';
import userSaga from './user.saga';
import watchFetchMarketNews from './marketNews.saga';
import { watchFetchWatchlistName, watchSetWatchlistName } from './watchlistName.saga';
import watchFetchStockNews from './fetchMoreStockNews.saga';

// rootSaga is the primary saga.
// It bundles up all of the other sagas so our project can use them.
// This is imported in index.js as rootSaga

// some sagas trigger other sagas, as an example
// the registration triggers a login
// and login triggers setting the user
export default function* rootSaga() {
  yield all([
    loginSaga(), // login saga is now registered
    registrationSaga(),
    userSaga(),
    watchFetchEarnings(),
    watchSubmitSymbol(),
    watchAddFavorite(),
    watchDeleteFavorite(),
    watchFetchTickers(),
    watchStockPrice(),
    watchSetWatchlistName(),
    watchFetchWatchlistName(),
    watchStockNews(),
    watchStockData(),
    watchFetchMarketNews(),
    watchFetchStockNews(),
  ]);
}
