import { all } from 'redux-saga/effects';
import watchAddFavorite from './addFavorite.saga';
import watchDeleteFavorite from './deleteFavorite.saga';
import watchFetchEarnings from './fetchEarnings.saga';
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
import watchWatchlistSaga from './fetchWatchlistStocks.saga';
import watchFetchOpenAi from './openai.saga';
import cpiSaga from './cpi.saga';

export default function* rootSaga() {
  yield all([
    loginSaga(), 
    registrationSaga(),
    userSaga(),
    watchFetchEarnings(),
    watchSubmitSymbol(),
    watchAddFavorite(),
    watchDeleteFavorite(),
    watchStockPrice(),
    watchSetWatchlistName(),
    watchFetchWatchlistName(),
    watchStockNews(),
    watchStockData(),
    watchFetchMarketNews(),
    watchFetchStockNews(),
    watchWatchlistSaga(),
    watchFetchOpenAi(),
    cpiSaga(),
  ]);
}
