const soloReducer = (state = { earnings: [], selectedSymbol: '', favorites: [], selectedEarnings: [] }, action) => {
    switch (action.type) {
        case 'SET_EARNINGS':
            return { ...state, earnings: action.payload };
        case 'SET_SELECTED_SYMBOL':
            return { ...state, selectedSymbol: action.payload };
        case 'SUBMIT_SYMBOL':
            return { ...state, selectedSymbol: action.payload };
        case 'SET_TICKERS':
            return { ...state, tickers: action.payload };
        case 'ADD_FAVORITE':
            const newFavorite = {
                userId: 1,
                ticker: action.payload,
            };
            if (state.favorites.some((favorite) => favorite.ticker === action.payload)) {
                return state;
            } else {
                return { ...state, favorites: [...state.favorites, newFavorite] };
            }
        case 'SET_SELECTED_EARNINGS':
            const selectedEarnings = state.earnings.filter((earning) => earning.symbol === state.selectedSymbol);
            return { ...state, selectedEarnings };
        default:
            return state;
    }
};

export default soloReducer;