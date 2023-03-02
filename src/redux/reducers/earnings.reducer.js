const soloReducer = (
    state = {
        earnings: [],
        selectedSymbol: '',
        favorites: [],
        selectedEarnings: [],
        selectedPrice: null,
        selectedStockData: [],
        watchlistsTickers: [],
        watchlistName: 'Watchlist',
        marketNews: [],
        newData: {}

    },
    action
) => {
    switch (action.type) {
        case 'SET_EARNINGS':
            return { ...state, earnings: action.payload };
        case 'SET_SELECTED_STOCK_NEWS':
            return { ...state, selectedStocksNews: action.payload };
        case 'SET_MARKET_NEWS':
            return { ...state, marketNews: action.payload }
        case 'SET_STOCK_PRICE':
            return { ...state, selectedPrice: action.payload };
        case 'SET_SELECTED_STOCK_DATA':
            return { ...state, selectedStockData: action.payload };
        case 'SET_WATCHLIST_STOCKS':
            return { ...state, watchlistsTickers: action.payload };
        case 'SET_SELECTED_NEWS':
            return { ...state, selectedStocksNews: action.payload };
        case 'SET_SELECTED_SYMBOL':
            return { ...state, selectedSymbol: action.payload };
        case 'SUBMIT_SYMBOL':
            console.log('Setting selectedSymbol state to', action.payload);
            return { ...state, selectedSymbol: action.payload };
        case 'SET_FAVORITES':
            return { ...state, favorites: action.payload };
        case 'DELETE_FAVORITE_SUCCESS':
            const newSelectedEarnings = state.selectedEarnings.filter(
                (earning) => earning.symbol !== action.payload
            );
            return {
                ...state,
                favorites: state.favorites.filter(
                    (favorite) => favorite.ticker !== action.payload
                ),
                selectedEarnings: newSelectedEarnings,
            };
        case 'SET_SELECTED_EARNINGS':
            const selectedEarnings = state.earnings.filter(
                (earning) => earning.symbol === state.selectedSymbol
            );
            return { ...state, selectedEarnings };
        case 'FILTER_EARNINGS':
            return {
                ...state,
                selectedYear: action.payload,
            };
        case 'SET_SELECTED_PRICE':
            return { ...state, selectedPrice: action.payload };
        case 'SET_WATCHLIST_NAME_SUCCESS':
            return { ...state, watchlistName: action.payload };
        case 'FETCH_WATCHLIST_NAME_SUCCESS':
            return { ...state, watchlistName: action.payload };
        case 'SET_NEW_DATA': 
            return { ...state, newData: action.payload };
        default:
            return state;
    }
};

export default soloReducer;